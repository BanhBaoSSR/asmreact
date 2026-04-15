import clientPromise from "@/libs/mongodb";

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return Response.json({ reply: "Bạn hãy nhập câu hỏi" });
    }

    const client = await clientPromise;
    const db = client.db();

    const products = await db.collection("products").find({}).toArray();
    const categories = await db.collection("categories").find({}).toArray();

    const text = message.toLowerCase();

    let filtered = [...products];

    // =========================
    // 💰 1. HIỂU GIÁ THÔNG MINH
    // =========================
    const priceMatch = text.match(/\d+/);
let hasPriceFilter = false;

if (priceMatch) {
  const maxPrice =
    Number(priceMatch[0]) * (text.includes("k") ? 1000 : 1);

  if (
    text.includes("dưới") ||
    text.includes("nhỏ hơn") ||
    text.includes("<=")
  ) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
    hasPriceFilter = true;
  } else if (
    text.includes("trên") ||
    text.includes(">=")
  ) {
    filtered = filtered.filter((p) => p.price >= maxPrice);
    hasPriceFilter = true;
  }
}

// 🔥 CHECK KHÔNG CÓ SẢN PHẨM
if (hasPriceFilter && filtered.length === 0) {
  return Response.json({
    reply: `<p>❌ Không có sản phẩm nào trong tầm giá bạn yêu cầu.</p>
            <p>👉 Bạn thử tăng ngân sách hoặc chọn mức giá khác nhé!</p>`,
  });
}

    // fallback theo keyword giá
    if (text.includes("rẻ")) {
      filtered = filtered.filter(p => p.price < 500000);
    }
    if (text.includes("cao cấp")) {
      filtered = filtered.filter(p => p.price > 1500000);
    }

    // =========================
    // 🎯 2. LỌC CATEGORY
    // =========================
    let hasCategory = false;

    categories.forEach(c => {
      if (text.includes(c.name.toLowerCase())) {
        filtered = filtered.filter(p =>
          p.category.toLowerCase().includes(c.name.toLowerCase())
        );
        hasCategory = true;
      }
    });

    // =========================
    // 🔍 3. SEARCH THEO NAME
    // =========================
    const keywordFiltered = filtered.filter(p =>
      p.name.toLowerCase().includes(text)
    );

    if (keywordFiltered.length > 0) {
      filtered = keywordFiltered;
    }

    // =========================
    // 🎲 4. RANDOM (GIỐNG AI)
    // =========================
    filtered = filtered.sort(() => 0.5 - Math.random());

    // =========================
    // 📦 5. FALLBACK
    // =========================
    if (filtered.length === 0) {
      filtered = products.sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    const topProducts = filtered.slice(0, 3);

    // =========================
    // 🚫 6. CHẶN CÂU HỎI NGOÀI LUỒNG
    // =========================
    const validKeywords = ["bàn", "chuột", "sản phẩm", "giá", "mua"];

    const isValid = validKeywords.some(k => text.includes(k));

    if (!isValid) {
      return Response.json({
        reply: "Xin lỗi, tôi chỉ hỗ trợ tư vấn sản phẩm",
      });
    }

    // =========================
    // 🧠 7. RESPONSE GIỐNG AI
    // =========================
    const randomIntro = [
      "Mình gợi ý cho bạn một số sản phẩm phù hợp:",
      "Dựa trên nhu cầu của bạn, đây là các sản phẩm nên xem:",
      "Bạn có thể tham khảo các sản phẩm sau:",
    ];

    let reply = `<p>${randomIntro[Math.floor(Math.random() * randomIntro.length)]}</p>`;

    topProducts.forEach(p => {
      reply += `
        <div style="border:1px solid #ddd;padding:10px;margin-bottom:10px;border-radius:8px">
          <b>${p.name}</b><br/>
          💰 Giá: <span style="color:red">${p.price.toLocaleString("vi-VN")}đ</span><br/>
          📦 Danh mục: ${p.category}<br/>
          <button onclick="window.location.href='/product/${p._id}'" 
            style="margin-top:5px;padding:5px 10px;background:black;color:white;border:none;border-radius:5px">
            Xem chi tiết
          </button>
        </div>
      `;
    });

    reply += `<p>👉 Bạn muốn mình lọc kỹ hơn theo giá hoặc loại không?</p>`;

    return Response.json({ reply });

  } catch (error) {
    console.error(error);
    return Response.json({ reply: "Lỗi server AI" });
  }
}