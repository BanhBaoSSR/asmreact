/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useState } from "react";

export default function AddToCart({ product, children }) {
  const [quantity, setQuantity] = useState(0);

  // Lấy quantity từ localStorage khi mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productInCart = storedCart.find((p) => p._id === product._id);
    setQuantity(productInCart ? productInCart.quantity : 0);
  }, [product._id]);

  // Cập nhật localStorage mỗi khi quantity thay đổi
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    let newCart = [...storedCart];
    const index = newCart.findIndex((p) => p._id === product._id);

    if (quantity > 0) {
      if (index >= 0) {
        newCart[index].quantity = quantity;
      } else {
        newCart.push({ ...product, quantity });
      }
    } else {
      if (index >= 0) {
        newCart.splice(index, 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(newCart));
  }, [quantity, product]);

  if (quantity === 0) {
    return (
      <button className="btn btn-dark" onClick={() => setQuantity(1)}>
        {children}
      </button>
    );
  } else {
    return (
      <div className="input-group">
        <div className="btn btn-dark" onClick={() => setQuantity(quantity - 1)}>-</div>
        <input
          type="number"
          value={quantity}
          min="0"
          className="text-center"
          style={{ width: "60px" }}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
        />
        <div className="btn btn-dark" onClick={() => setQuantity(quantity + 1)}>+</div>
      </div>
    );
  }
}
