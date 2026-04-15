import clientPromise from "@/libs/mongodb";
import bcrypt from "bcryptjs";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const users = await db.collection("users").find({}).toArray();
  return Response.json(users);
}


export async function POST(request) {
  const client = await clientPromise;
  const db = client.db();

  const body = await request.json();
  const { name, email, password, role } = body;

  if (!name || !email || !password) {
    return Response.json(
      { error: "Thiếu dữ liệu" },
      { status: 400 }
    );
  }

  // 🔥 check email tồn tại
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return Response.json(
      { error: "Email đã tồn tại" },
      { status: 400 }
    );
  }

  // 🔐 hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.collection("users").insertOne({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  return Response.json({
    status: "success",
    message: "Đăng ký thành công",
  });
}