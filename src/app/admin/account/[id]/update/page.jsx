/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateUser() {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const fetchUser = async () => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`);
    const data = await res.json();

    setName(data.name || "");
    setEmail(data.email || "");
    setRole(data.role || "user");
  };

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role }),
    });

    const result = await res.json();

    if (result.status === "success") {
      alert("Cập nhật thành công!");
      router.push("/admin/account");
    }
  };

  return (
    <main className="admin-main">
      <div className="admin-title">Sửa User</div>

      <input
        className="form-control mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        className="form-select mb-2"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button className="btn btn-black" onClick={handleUpdate}>
        Lưu
      </button>
    </main>
  );
}