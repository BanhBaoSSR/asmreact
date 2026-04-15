export default function Contact() {
    return (
        <main id="user-contact" className="page-section">
        <div className="container mt-4">
            <h3 className="section-title">Liên Hệ Với Chúng Tôi</h3>
            <div className="row">
                <div className="col-md-6 border p-4 bg-light">
                    <div className="mb-3">
                        <label className="form-label">Tên của bạn</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Lời nhắn</label>
                        <textarea className="form-control" rows="5"></textarea>
                    </div>
                    <button className="btn btn-black px-4 py-2 text-uppercase fw-bold">Gửi tin nhắn</button>
                </div>
                <div className="col-md-6 p-4">
                    <h5 className="fw-bold text-uppercase mb-3">Thông tin liên hệ</h5>
                    <p><i className="fas fa-map-marker-alt text-red me-2"></i> 123 Đường Tối Giản, Quận 1, TP.HCM</p>
                    <p><i className="fas fa-phone text-red me-2"></i> 0123 456 789</p>
                    <p><i className="fas fa-envelope text-red me-2"></i> contact@myshop.com</p>
                </div>
            </div>
        </div>
    </main>
    )
}
