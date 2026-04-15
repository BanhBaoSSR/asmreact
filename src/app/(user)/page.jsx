/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import AddToCart from "@/components/AddToCart";
import { Children } from "react";
export default async function Home() {
    const res = await fetch('http://localhost:3000/api/products');
  const productList = await res.json();
    return (
        <main id="user-index" className="page-section">
        <section className="hero-banner">
            <div className="container">
                <h2 className="fw-bold fs-3 text-uppercase">Bộ Sưu Tập Mới Nhất</h2>
                <p className="text-muted mb-4">Khám phá phong cách thời trang tối giản.</p>
                <a href="#user-category" className="btn btn-black px-4 py-2">XEM NGAY</a>
            </div>
        </section>

        <section className="container mt-5">
            <h3 className="section-title">Sản Phẩm Nổi Bật</h3>
           
            <div className="row">
                {productList.map((p) => (
        <div key={p._id} className="col-md-4">
                    <div className="product-card">
                        <div className="img-wrap">
                            <img src={`/img/${p.image}`} alt="" className="img-placeholder" />
                            <div className="info-overlay">
                                <p className="name">{p.name}</p>
                                <p className="price">{p.price.toLocaleString("vi-VN")}VND</p>
                            </div>
                            <div className="hover-actions">
                                <a href={`/${p._id}`} className="icon-btn" title="Chi tiết"><i className="fas fa-eye"></i></a>
                                <a href="/wishlist" className="icon-btn" title="Yêu thích"><i className="fas fa-heart"></i></a>
                            </div>
                        </div>
                        <AddToCart product={p}>Thêm vào giỏ</AddToCart>
                    </div>
                </div>
       ))}
                
                
            </div>
        </section>
    </main>
    )
}