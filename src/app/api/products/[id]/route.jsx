import clientPromise from "@/libs/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(request, context) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // ✅ LẤY params đúng cách
    const { id } = await context.params;

    console.log("ID nhận được:", id);

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(id),
    });

    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return Response.json(
        { error: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return Response.json({ status: "success" });
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
    return Response.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function PATCH(request, context) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const { id } = await context.params;
    const body = await request.json();

    const updateData = {};

    // chỉ update field có gửi lên
    if (body.name) updateData.name = body.name;
    if (body.price) updateData.price = body.price;
    if (body.category) updateData.category = body.category;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.image !== undefined) updateData.image = body.image;

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return Response.json(
        { error: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return Response.json({ status: "success" });
  } catch (error) {
    console.error("Lỗi khi update:", error);
    return Response.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function GET(request, context) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const { id } = await context.params;

    const product = await db.collection("products").findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      return Response.json(
        { error: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    return Response.json({ error: "Lỗi server" }, { status: 500 });
  }
}