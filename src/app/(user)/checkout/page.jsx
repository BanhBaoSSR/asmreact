/* eslint-disable @next/next/no-html-link-for-pages */
export default function Checkout() {
    return (
        <main id="user-checkout" className="page-section">
        <div className="container mt-4">
            <h3 className="section-title">Thanh Toán</h3>
            <div className="row">
                <div className="col-md-7">
                    <div className="border p-4">
                        <h5 className="fw-bold text-uppercase mb-3">Thông tin giao hàng</h5>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Họ và tên</label>
                                <input type="text" className="form-control" placeholder="Nhập họ tên" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Số điện thoại</label>
                                <input type="text" className="form-control" placeholder="Nhập số điện thoại" />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label className="form-label">Địa chỉ</label>
                                <input type="text" className="form-control" placeholder="Nhập địa chỉ chi tiết" />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label className="form-label">Ghi chú đơn hàng</label>
                                <textarea className="form-control" rows="3" placeholder="Ghi chú thêm..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="border p-4 bg-light">
                        <h5 className="fw-bold text-uppercase mb-3 border-bottom pb-2">Đơn hàng của bạn</h5>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Áo Thun Trắng x 1</span>
                            <span>250.000đ</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                            <span>Quần Jeans Đen x 2</span>
                            <span>900.000đ</span>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <span className="fw-bold">Tổng thanh toán:</span>
                            <span className="fw-bold text-red fs-5">1.180.000đ</span>
                        </div>
                        <a href="/success" className="btn btn-red w-100 py-3 text-uppercase fw-bold">Đặt hàng ngay</a>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}