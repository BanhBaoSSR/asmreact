/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-css-tags */
 "use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Bạn chưa đăng nhập!");
      router.push("/login");
      return;
    }

    if (user.role !== "admin") {
      alert("Bạn không có quyền truy cập trang admin!");
      router.push("/");
      return;
    }
  }, []);

  return (
        <html lang="vi">
<head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-commerce UI Template - Angular/React Ready</title>
   
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
     <link rel="stylesheet" href="/css/admin.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</head>

<body>
        <div id="admin-dashboard" className="page-section pb-0" >
        <div className="admin-wrapper">
            
            <aside className="admin-sidebar">
                <div className="brand">ADMIN PANEL</div>
                <ul>
                    <li><a href="/admin"><i className="fas fa-home me-2"></i> Dashboard</a></li>
                    <li><a href="/admin/product"><i className="fas fa-box me-2"></i> Quản lý Sản Phẩm</a></li>
                    <li><a href="/admin/category"><i className="fas fa-tags me-2"></i> Quản lý Danh Mục</a></li>
                    <li><a href="/admin/account"><i className="fas fa-users me-2"></i> Quản lý Tài Khoản</a></li>
                    <li><a href="/admin/order"><i className="fas fa-truck me-2"></i> Quản lý Đơn Hàng</a></li>
                </ul>
            </aside>
           
            {children}
        </div>
    </div>

    
  </body>
</html>

    
    )
}