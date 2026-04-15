/* eslint-disable @next/next/no-html-link-for-pages */
export default function Success() {
    return (
        <main id="user-success" className="page-section">
        <div className="container">
            <div className="success-box">
                <i className="fas fa-check-circle"></i>
                <h2>Đặt hàng thành công!</h2>
                <p className="text-muted mt-3 mb-4">Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn.</p>
                <a href="/" className="btn btn-black px-4 py-2 text-uppercase">Tiếp tục mua sắm</a>
            </div>
        </div>
    </main>
    )
}