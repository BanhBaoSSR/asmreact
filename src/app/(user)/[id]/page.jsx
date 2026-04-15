/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
import AddToCart from "@/components/AddToCart";
export default async function Layout({params}) {
    // 1. Lấy đúng biến 'id' từ params (vì tên thư mục là [id])
    const { id } = await params; 

    // 2. Truyền biến 'id' vào URL (không dùng _id)
    const res = await fetch(`http://localhost:3000/api/products/${id}`);

    // 3. Code phòng thủ: Xử lý khi API không tìm thấy sản phẩm
    if (!res.ok) {
        return (
            <main id="user-detail" className="page-section">
                <div className="container mt-5 text-center">
                    <h2>Không tìm thấy sản phẩm!</h2>
                </div>
            </main>
        );
    }

    const product = await res.json();
    return (
        <main id="user-detail" className="page-section">
        <div className="container mt-5">
            
            <div className="detail-img-box">
                <img src={`/img/${product.image}`} alt="" className="img-placeholder" />
                <a href="#" className="detail-nav-btn prev"><i className="fas fa-chevron-left"></i></a>
                <a href="#" className="detail-nav-btn next"><i className="fas fa-chevron-right"></i></a>
            </div>
            
           
            <div className="detail-info">
                <h1>{product.name}</h1>
                <p className="price">{product.price.toLocaleString()}đ</p>
                <p className="desc">
                    {product.description}
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <AddToCart product={product}>Thêm vào giỏ</AddToCart>
                    <button className="btn btn-outline-dark px-3 py-3"><i className="fas fa-heart"></i></button>
                </div>
            </div>
        </div>
    </main>
    )
}