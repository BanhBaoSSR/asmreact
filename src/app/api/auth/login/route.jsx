import clientPromise from "@/libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const { email, password } = await request.json();

    // tìm user theo email
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return Response.json(
        { error: "Email không tồn tại" },
        { status: 400 }
      );
    }

    // 🔥 so sánh password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return Response.json(
        { error: "Sai mật khẩu" },
        { status: 400 }
      );
    }

    // ✅ trả user (KHÔNG trả password)
    return Response.json({
      status: "success",
      message: "Đăng nhập thành công",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Lỗi server" }, { status: 500 });
  }
}