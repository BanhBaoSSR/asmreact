/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function Admin() {
  const [data, setData] = useState(null);

  const fetchDashboard = async () => {
    const res = await fetch("/api/dashboard");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!data) return <p>Loading...</p>;

  // 🎯 dữ liệu chart
  const chartData = {
    labels: Object.keys(data.categoryStats),
    datasets: [
      {
        data: Object.values(data.categoryStats),
      },
    ],
  };

  return (
    <main className="admin-main">
      <h2 className="admin-title">Dashboard</h2>

      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="admin-stat-card">
            <p>Tổng Sản Phẩm</p>
            <h3>{data.totalProducts}</h3>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="admin-stat-card">
            <p>Đơn trong tháng</p>
            <h3>{data.totalOrders}</h3>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="admin-stat-card">
            <p>Khách hàng</p>
            <h3>{data.totalUsers}</h3>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="admin-stat-card">
            <p>Doanh thu tháng</p>
            <h3>{data.totalRevenue.toLocaleString()}đ</h3>
          </div>
        </div>
      </div>

      {/* 🔥 BIỂU ĐỒ */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Phân loại sản phẩm theo Category</h5>
            <Pie data={chartData} />
          </div>
        </div>
      </div>
      <div className="row mt-4">
  <div className="col-md-6">
    <div className="card p-3">
      <h5>Top sản phẩm bán chạy</h5>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sản phẩm</th>
            <th>Đã bán</th>
          </tr>
        </thead>

        <tbody>
          {data.topProducts.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.totalSold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
    </main>
  );
}