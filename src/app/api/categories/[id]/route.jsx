import clientPromise from "@/libs/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, context) {
  const client = await clientPromise;
  const db = client.db();

  const { id } = await context.params;

  if (!ObjectId.isValid(id)) {
    return Response.json({ error: "ID không hợp lệ" }, { status: 400 });
  }

  const category = await db.collection("categories").findOne({
    _id: new ObjectId(id),
  });

  return Response.json(category);
}

export async function PATCH(request, context) {
  const client = await clientPromise;
  const db = client.db();

  const { id } = await context.params;
  const body = await request.json();

  if (!ObjectId.isValid(id)) {
    return Response.json({ error: "ID không hợp lệ" }, { status: 400 });
  }

  await db.collection("categories").updateOne(
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

  await db.collection("categories").deleteOne({
    _id: new ObjectId(id),
  });

  return Response.json({ status: "success" });
}