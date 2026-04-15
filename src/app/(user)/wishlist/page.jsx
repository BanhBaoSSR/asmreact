/* eslint-disable @next/next/no-img-element */
export default function Wishlist() {
    return(
         <main id="user-wishlist" className="page-section">
        <div className="container mt-4">
            <h3 className="section-title">Danh Sách Yêu Thích</h3>
            <div className="row">
                <div className="col-md-4"><div className="product-card"><div className="img-wrap"><img src="" alt="" /><div className="info-overlay" ><p className="name">Áo Thun Basic</p><p className="price">250.000đ</p></div><div className="hover-actions"><a href="#user-detail" className="icon-btn"><i className="fas fa-eye"></i></a><a href="#" className="icon-btn text-red"><i className="fas fa-trash"></i></a></div></div><button className="add-to-cart-btn">Thêm vào giỏ</button></div></div>
            </div>
        </div>
    </main>
    )
}