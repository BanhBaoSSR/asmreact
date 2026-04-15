"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCategory() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: Number(id), name }),
    });

    const result = await res.json();

    if (result.status === "success") {
      alert("Thêm danh mục thành công!");
      router.push("/admin/category");
    }
  };

  return (
    <main className="admin-main">
      <div className="admin-title">Thêm Danh Mục</div>

      <input
        className="form-control mb-2"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Tên danh mục"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="btn btn-black" onClick={handleSubmit}>
        Lưu
      </button>
    </main>
  );
}