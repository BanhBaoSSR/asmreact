/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-css-tags */
import ChatBox from "@/components/ChatBox";
export default function Layout({ children }) {
    return (
<html lang="vi">
<head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-commerce UI Template - Angular/React Ready</title>
   
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
     <link rel="stylesheet" href="/css/user.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</head>

<body>
    
    <header className="user-header fixed-top" > 
        <div className="container">
            <div className="row align-items-center">
                <div className="col-3">
                    <h1 className="m-0 fs-5 fw-bold text-uppercase">MY<span className="text-red">SHOP</span></h1>
                </div>
                <div className="col-6 text-center">
                    <nav>
                        <a href="/" className="nav-link d-inline-block">Trang chủ</a>
                        <a href="/category" className="nav-link d-inline-block">Sản phẩm</a>
                        <a href="/contact" className="nav-link d-inline-block">Liên hệ</a>
                    </nav>
                </div>
                <div className="col-3 text-end header-icons">
                    <a href="/login"><i className="fas fa-user"></i></a>
                    <a href="/wishlist"><i className="fas fa-heart"></i></a>
                    <a href="/cart">
                        <i className="fas fa-shopping-bag"></i>
                        <span className="badge-red">0</span>
                    </a>
                </div>
            </div>
        </div>
    </header>

    {children}
        <ChatBox />
    <footer className="user-footer">
        <div className="container">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <h2 className="fs-5 fw-bold text-uppercase mb-3">MY<span className="text-red">SHOP</span></h2>
                    <p className="text-secondary">Thương hiệu thời trang tối giản. Mang đến trải nghiệm mua sắm tuyệt vời nhất với thiết kế đơn giản, thanh lịch.</p>
                </div>
                <div className="col-md-4 mb-4">
                    <h5>Liên kết nhanh</h5>
                    <ul>
                        <li><a href="/">Trang chủ</a></li>
                        <li><a href="/product">Danh mục</a></li>
                        <li><a href="/contact">Liên hệ</a></li>
                    </ul>
                </div>
                <div className="col-md-4 mb-4">
                    <h5>Chính sách</h5>
                    <ul>
                        <li><a href="#">Chính sách đổi trả</a></li>
                        <li><a href="#">Bảo mật thông tin</a></li>
                        <li><a href="#">Điều khoản dịch vụ</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-top border-secondary mt-3 pt-3 text-center text-secondary">
                <p className="m-0">&copy; 2026 MYSHOP. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>
)
}