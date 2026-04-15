/* eslint-disable @next/next/no-img-element */
export default function Category() {
    return (
        <main id="user-category" className="page-section">
        <div className="container mt-4">
            <h3 className="section-title">Danh Mục Sản Phẩm</h3>
            <div className="row">
              
                <div className="col-md-3">
                    <div className="filter-sidebar">
                        <div className="filter-title">Lọc theo giá</div>
                        <div className="filter-item"><input type="checkbox" /> Dưới 200.000đ</div>
                        <div className="filter-item"><input type="checkbox" /> 200.000đ - 500.000đ</div>
                        <div className="filter-item"><input type="checkbox" /> Trên 500.000đ</div>

                        <div className="filter-title mt-4">Kích thước</div>
                        <div className="filter-item"><input type="checkbox" /> S</div>
                        <div className="filter-item"><input type="checkbox" /> M</div>
                        <div className="filter-item"><input type="checkbox" /> L</div>

                        <button className="btn btn-black w-100 mt-3 py-2">ÁP DỤNG LỌC</button>
                    </div>
                </div>
                
                
                <div className="col-md-9">
                    <div className="row">
                        
                        <div className="col-md-4"><div className="product-card"><div className="img-wrap"><img src="" alt="" /><div className="info-overlay"><p className="name">Sản Phẩm 1</p><p className="price">100.000đ</p></div><div className="hover-actions"><a href="#user-detail" className="icon-btn"><i className="fas fa-eye"></i></a><a href="#user-wishlist" className="icon-btn"><i className="fas fa-heart"></i></a></div></div><button className="add-to-cart-btn">Thêm vào giỏ</button></div></div>
                        <div className="col-md-4"><div className="product-card"><div className="img-wrap"><img src="" alt="" /><div className="info-overlay"><p className="name">Sản Phẩm 2</p><p className="price">200.000đ</p></div><div className="hover-actions"><a href="#user-detail" className="icon-btn"><i className="fas fa-eye"></i></a><a href="#user-wishlist" className="icon-btn"><i className="fas fa-heart"></i></a></div></div><button className="add-to-cart-btn">Thêm vào giỏ</button></div></div>
                        <div className="col-md-4"><div className="product-card"><div className="img-wrap"><img src="" alt="" /><div className="info-overlay"><p className="name">Sản Phẩm 3</p><p className="price">300.000đ</p></div><div className="hover-actions"><a href="#user-detail" className="icon-btn"><i className="fas fa-eye"></i></a><a href="#user-wishlist" className="icon-btn"><i className="fas fa-heart"></i></a></div></div><button className="add-to-cart-btn">Thêm vào giỏ</button></div></div>
                        <div className="col-md-4"><div className="product-card"><div className="img-wrap"><img src="" alt="" /><div className="info-overlay"><p className="name">Sản Phẩm 4</p><p className="price">400.000đ</p></div><div className="hover-actions"><a href="#user-detail" className="icon-btn"><i className="fas fa-eye"></i></a><a href="#user-wishlist" className="icon-btn"><i className="fas fa-heart"></i></a></div></div><button className="add-to-cart-btn">Thêm vào giỏ</button></div></div>
                        <div className="col-md-4"><div className="product-card"><div className="img-wrap"><img src="" alt="" /><div className="info-overlay"><p className="name">Sản Phẩm 5</p><p className="price">500.000đ</p></div><div className="hover-actions"><a href="#user-detail" className="icon-btn"><i className="fas fa-eye"></i></a><a href="#user-wishlist" className="icon-btn"><i className="fas fa-heart"></i></a></div></div><button className="add-to-cart-btn">Thêm vào giỏ</button></div></div>
                        <div className="col-md-4"><div className="product-card"><div className="img-wrap"><img src="" alt="" /><div className="info-overlay"><p className="name">Sản Phẩm 6</p><p className="price">600.000đ</p></div><div className="hover-actions"><a href="#user-detail" className="icon-btn"><i className="fas fa-eye"></i></a><a href="#user-wishlist" className="icon-btn"><i className="fas fa-heart"></i></a></div></div><button className="add-to-cart-btn">Thêm vào giỏ</button></div></div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}