/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Category() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3000/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Xóa danh mục này?")) return;

    const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();
    if (result.status === "success") {
      fetchCategories();
    }
  };

  return (
    <main className="admin-main">
      <div className="admin-title">
        <span>Danh Sách Danh Mục</span>
        <Link href="/admin/category/create" className="btn btn-black btn-sm px-3">
          + Thêm Mới
        </Link>
      </div>

      <table className="table table-bordered admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Tên</th>
            <th width="120">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cate, index) => (
            <tr key={cate._id}>
              <td>{index + 1}</td>
              <td>{cate.id}</td>
              <td>{cate.name}</td>

              <td>
                <Link
                  href={`/admin/category/${cate._id}/update`}
                  className="btn btn-sm btn-dark"
                >
                  ✏️
                </Link>

                <button
                  className="btn btn-sm btn-red"
                  onClick={() => handleDelete(cate._id)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}