/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Áo");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
const fetchCategories = async () => {
  const res = await fetch("http://localhost:3000/api/categories");
  const data = await res.json();
  setCategories(data);
};
useEffect(() => {
  fetchCategories();
}, []);
  const handleSubmit = async () => {
    const product = {
      name,
      price: Number(price),
      category,
      description,
      image,
    };

    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const result = await res.json();

    if (result.status === "success") {
      alert("Thêm sản phẩm thành công!");
      router.push("/admin/product");
    }
  };

  return (
    <main className="admin-main">
      <div className="admin-title">Thêm Sản Phẩm</div>

      <div className="row">
        {/* LEFT */}
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
              <label className="form-label">Giá (VNĐ)</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Danh mục</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                <option value="">-- Chọn danh mục --</option>

                {categories.map((cate) => (
                    <option key={cate._id} value={cate.name}>
                    {cate.name}
                    </option>
                ))}
                </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Mô tả chi tiết</label>
            <textarea
              className="form-control"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            className="btn btn-black px-4 text-uppercase fw-bold mt-2"
            onClick={handleSubmit}
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

        {/* RIGHT */}
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
            placeholder="Nhập URL ảnh..."
            className="form-control mt-2"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
      </div>
    </main>
  );
}