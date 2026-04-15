/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const fetchProduct = async () => {
    if (!id) return;

    const res = await fetch(`http://localhost:3000/api/products/${id}`);
    const data = await res.json();

    setName(data.name || "");
    setPrice(data.price || "");
    setCategory(data.category || "");
    setDescription(data.description || "");
    setImage(data.image || "");
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // 🔥 update
  const handleUpdate = async () => {
    const product = {
      name,
      price: Number(price),
      category,
      description,
      image,
    };

    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const result = await res.json();

    if (result.status === "success") {
      alert("Cập nhật thành công!");
      router.push("/admin/product");
    }
  };

  return (
    <main className="admin-main">
      <div className="admin-title">Sửa Sản Phẩm</div>

      <div className="row">
        <div className="col-md-8">
          <div className="mb-3">
            <label className="form-label">Tên sản phẩm</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Giá</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Danh mục</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <textarea
              className="form-control"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            className="btn btn-black px-4 mt-2"
            onClick={handleUpdate}
          >
            Lưu Sản Phẩm
          </button>

          <button
            className="btn btn-outline-dark px-4 mt-2 ms-2"
            onClick={() => router.push("/admin/product")}
          >
            Hủy
          </button>
        </div>

        <div className="col-md-4">
          <label className="form-label">Hình ảnh (URL)</label>

          <div
            className="border p-3 text-center bg-light"
            style={{ aspectRatio: "1 / 1" }}
          >
            {image ? (
              <img
                src={image}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <>
                <i className="fas fa-image text-muted fs-1 mt-5"></i>
                <p className="text-muted mt-2">Chưa có hình ảnh</p>
              </>
            )}
          </div>

          <input
            type="text"
            className="form-control mt-2"
            placeholder="Nhập URL ảnh..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
      </div>
    </main>
  );
}