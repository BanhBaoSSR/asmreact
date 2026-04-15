/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function User() {
  const [userList, setUserList] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/api/users");
    const data = await res.json();
    setUserList(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Xóa user này?")) return;

    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();
    if (result.status === "success") {
      fetchUsers();
    }
  };

  return (
    <main className="admin-main">
      <div className="admin-title">
        <span>Danh Sách User</span>
        <Link href="/admin/account/create" className="btn btn-black btn-sm px-3">
          + Thêm Mới
        </Link>
      </div>

      <table className="table table-bordered admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Role</th>
            <th width="120">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {userList.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>
                <Link
                  href={`/admin/account/${user._id}/update`}
                  className="btn btn-sm btn-dark"
                >
                  ✏️
                </Link>

                <button
                  className="btn btn-sm btn-red"
                  onClick={() => handleDelete(user._id)}
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