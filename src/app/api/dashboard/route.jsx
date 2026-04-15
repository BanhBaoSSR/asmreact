import clientPromise from "@/libs/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  // 📅 lấy tháng hiện tại
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // 📦 tổng sản phẩm
  const totalProducts = await db.collection("products").countDocuments();

  // 👤 tổng user (role user)
  const totalUsers = await db.collection("users").countDocuments({
    role: "user",
  });

  // 🧾 đơn trong tháng
  const orders = await db.collection("orders").find({
    create_at: { $gte: startOfMonth },
  }).toArray();

  const totalOrders = orders.length;

  // 💰 doanh thu
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  // 📊 thống kê category
  const products = await db.collection("products").find({}).toArray();

  const categoryStats = {};
  products.forEach((p) => {
    const cate = p.category || "Khác";
    categoryStats[cate] = (categoryStats[cate] || 0) + 1;
  });
// 🔥 TOP SẢN PHẨM BÁN CHẠY
const productSales = {};

// duyệt tất cả orders
orders.forEach((order) => {
  (order.order_items || []).forEach((item) => {
    const key = item._id;

    if (!productSales[key]) {
      productSales[key] = {
        name: item.name,
        totalSold: 0,
      };
    }

    productSales[key].totalSold += item.quantity || 0;
  });
});

// convert sang array + sort
const topProducts = Object.values(productSales)
  .sort((a, b) => b.totalSold - a.totalSold)
  .slice(0, 5); // top 5
  
  return Response.json({
    totalProducts,
    totalUsers,
    totalOrders,
    totalRevenue,
    categoryStats,
    topProducts,
  });
  
}
