import clientPromise from "@/libs/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(request, context) {
  const client = await clientPromise;
  const db = client.db();

  const { id } = await context.params;

  if (!ObjectId.isValid(id)) {
    return Response.json({ error: "ID không hợp lệ" }, { status: 400 });
  }

  const body = await request.json();

  await db.collection("orders").updateOne(
    { _id: new ObjectId(id) },
    { $set: body }
  );

  return Response.json({ status: "success" });
}

export async function DELETE(request, context) {
  const client = await clientPromise;
  const db = client.db();

  const { id } = await context.params;

  if (!ObjectId.isValid(id)) {
    return Response.json({ error: "ID không hợp lệ" }, { status: 400 });
  }

  await db.collection("orders").deleteOne({
    _id: new ObjectId(id),
  });

  return Response.json({ status: "success" });
}