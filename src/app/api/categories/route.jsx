import clientPromise from "@/libs/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const categories = await db.collection("categories").find({}).toArray();
  return Response.json(categories);
}

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db();

  const body = await request.json();
  const { id, name } = body;

  if (!id || !name) {
    return Response.json({ error: "Thiếu dữ liệu" }, { status: 400 });
  }

  await db.collection("categories").insertOne({
    id,
    name,
  });

  return Response.json({ status: "success" });
}