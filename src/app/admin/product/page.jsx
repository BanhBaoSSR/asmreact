/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Product() {
  const [productList, setProductList] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    setProductList(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
  console.log("ID cần xóa:", id);

  const confirmDelete = confirm("Bạn có chắc muốn xóa sản phẩm này?");
  if (!confirmDelete) return;

  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
  method: "DELETE",
});
  console.log("Response:", res);

  const result = await res.json();
  console.log("Result:", result);

  if (result.status === "success") {
    fetchProducts();
  }
};

  return (
    <main className="admin-main">
      <div className="admin-title">
        <span>Danh Sách Sản Phẩm</span>

        <Link href="/admin/product/create" className="btn btn-black btn-sm px-3">
          + Thêm Mới
        </Link>
      </div>

      <table className="table table-bordered admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hình ảnh</th>
            <th>Tên Sản Phẩm</th>
            <th>Giá</th>
            <th>Danh Mục</th>
            <th width="120">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {productList.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>

              <td>
                {product.image ? (
                    <img
                        src={product.image}
                        alt=""
                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    />
                    ) : (
                    <div style={{ width: "40px", height: "40px", background: "#eee" }}></div>
                    )}
              </td>

              <td className="fw-bold">{product.name}</td>

              <td>{product.price}</td>

              <td>{product.category}</td>

              <td>
                <Link
                  href={`/admin/product/${product._id}/update`}
                  className="btn btn-sm btn-dark"
                >
                  <i className="fas fa-edit"></i>
                </Link>

                <button
                  className="btn btn-sm btn-red"
                  onClick={() => handleDelete(product._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}