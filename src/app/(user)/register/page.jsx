/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter(); 

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
  const user = {
    name,
    email,
    password,
    role: "user",
  };

  try {
    const res = await fetch('http://localhost:3000/api/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await res.json();

    // ✅ FIX CHÍNH Ở ĐÂY
    if (result.status === 'success') {
      alert(result.message || "Đăng ký thành công!");
      router.push('/login');
    } else {
      alert(result.error || "Có lỗi xảy ra");
    }

  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    alert("Lỗi kết nối đến máy chủ.");
  }
};

    return (
        <main id="user-register" className="page-section">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-5 border p-5 bg-light">
                        <h2 className="text-center fw-bold text-uppercase mb-4">Đăng Ký</h2>
                        <div className="mb-3">
                            <label className="form-label">Họ tên</label>
                            <input type="text" className="form-control" placeholder="Nhập họ tên" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Mật khẩu</label>
                            <input type="password" className="form-control" placeholder="Tạo mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-black w-100 py-2 text-uppercase fw-bold mb-3" disabled={!name || !email || !password} onClick={handleRegister}>
                            Tạo tài khoản
                        </button>
                        <div className="text-center">
                            <a href="/login" className="text-black">Đã có tài khoản? Đăng nhập</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}