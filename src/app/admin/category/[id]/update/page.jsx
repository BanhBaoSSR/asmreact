/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateCategory() {
  const router = useRouter();
  const { id } = useParams();

  const [cateId, setCateId] = useState("");
  const [name, setName] = useState("");

  const fetchCategory = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`);
    const data = await res.json();

    setCateId(data.id || "");
    setName(data.name || "");
  };

  useEffect(() => {
    if (id) fetchCategory();
  }, [id]);

  const handleUpdate = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(cateId), name }),
    });

    const result = await res.json();

    if (result.status === "success") {
      alert("Cập nhật thành công!");
      router.push("/admin/category");
    }
  };

  return (
    <main className="admin-main">
      <div className="admin-title">Sửa Danh Mục</div>

      <input
        className="form-control mb-2"
        value={cateId}
        onChange={(e) => setCateId(e.target.value)}
      />

      <input
        className="form-control mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="btn btn-black" onClick={handleUpdate}>
        Lưu
      </button>
    </main>
  );
}