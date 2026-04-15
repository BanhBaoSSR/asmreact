import clientPromise from "@/libs/mongodb";
export async function GET() {//getall, trả về ds sp
    try {
        const client = await clientPromise;
        const db = client.db();
        const productList = await db.collection("products").find({}).toArray();
        return Response.json(productList);
    }catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        return Response.json({ error: 'Lỗi khi lấy sản phẩm' }, { status: 500 });
    }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const body = await request.json();
    const { name, price, category, description, image } = body;

    if (!name || !price || !category) {
      return Response.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const newProduct = {
      name,
      price,
      category,
      description: description || "",
      image: image || "",
      createdAt: new Date(),
    };

    await db.collection("products").insertOne(newProduct);

    return Response.json({ status: "success" });
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    return Response.json({ error: "Lỗi server" }, { status: 500 });
  }
}