/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

export default function Order() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Xóa đơn này?")) return;

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`, {
      method: "DELETE",
    });

    fetchOrders();
  };

  const handleNextStatus = async (order) => {
    const current = order.status;

    // 🔥 logic chuyển trạng thái
    let nextStatus = null;

    if (current === "don-moi") nextStatus = "cho-giao";
    else if (current === "cho-giao") nextStatus = "hoan-thanh";
    else if (current === "hoan-thanh" || current === "huy") {
      // ❌ xóa luôn
      return handleDelete(order._id);
    }

    if (!nextStatus) return;

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${order._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });

    fetchOrders();
  };

  return (
    <main className="admin-main">
      <div className="admin-title">Danh Sách Đơn Hàng</div>

      <table className="table table-bordered admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Khách</th>
            <th>Tổng</th>
            <th>Trạng thái</th>
            <th width="180">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.name}</td>
              <td>{order.total?.toLocaleString()}đ</td>
              <td>{order.status}</td>

              <td>
                <button
                  className="btn btn-sm btn-primary me-1"
                  onClick={() => handleNextStatus(order)}
                >
                  ➡️
                </button>

                <button
                  className="btn btn-sm btn-red"
                  onClick={() => handleDelete(order._id)}
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