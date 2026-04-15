import clientPromise from "@/libs/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const orders = await db.collection("orders").find({}).toArray();
  return Response.json(orders);
}

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db();

  const body = await request.json();

  const newOrder = {
    name: body.name,
    order_items: body.order_items || [],
    total: body.total || 0,
    create_at: new Date(),
    status: "don-moi",
  };

  await db.collection("orders").insertOne(newOrder);

  return Response.json({ status: "success" });
}