/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (result.status === "success") {
      alert(result.message);

      // 🔥 lưu user
      localStorage.setItem("user", JSON.stringify(result.user));

      // 🔥 check role
      if (result.user.role === "admin") {
        const confirmAdmin = confirm("Bạn có muốn vào trang admin không?");
        router.push(confirmAdmin ? "/admin" : "/");
      } else {
        router.push("/");
      }

    } else {
      alert(result.error || "Đăng nhập thất bại");
    }

  } catch (error) {
    console.error("Lỗi login:", error);
    alert("Lỗi kết nối server");
  }
};

    return (
        <main id="user-login" className="page-section">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-5 border p-5 bg-light">
                        <h2 className="text-center fw-bold text-uppercase mb-4">Đăng Nhập</h2>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Mật khẩu</label>
                            <input type="password" className="form-control" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                           
                        </div>
                        <button 
                            className="btn btn-black w-100 py-2 text-uppercase fw-bold mb-3" disabled={!email || !password} onClick={handleLogin}>
                            Đăng nhập
                        </button>
                        <div className="text-center">
                            <a href="/register" className="text-black">Chưa có tài khoản? Đăng ký ngay</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}