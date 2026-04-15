"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Cart() {
  
  const [cart, setCart] = useState([]);
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    
  },[]);

  const handleQuantity = (id, value) => {
    const newCart =[...cart];
    const index = newCart.findIndex((p) => p._id == id);
    newCart[index].quantity = Number(value);
    setCart(newCart); // update state
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const handleRemove = (id) => {
    const newCart = [...cart];
    const index = newCart.findIndex((p) => p._id == id);
    newCart.splice(index, 1);
    setCart(newCart); // update state
    localStorage.setItem("cart", JSON.stringify(newCart));
  }
  const total = cart.reduce((sum, product)=> sum + (product.price * product.quantity), 0);
  const handleRemoveAll = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }
 
  

  const router = useRouter();

 const handleOrder = async () => {
  if (cart.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }

  const order = {
    name: "Ten khach",
    order_items: cart,
    total: total + 30000,
  };

  const res = await fetch('http://localhost:3000/api/orders', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  const result = await res.json();

  if (result.status === 'success') {
    alert(result.message || "Đặt hàng thành công!");
    handleRemoveAll();
    router.push('/success');
  } else {
    alert('Có lỗi xảy ra');
  }
};
    return (
        <main id="user-cart" className="page-section">
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="section-title m-0">Giỏ Hàng Của Bạn</h3>
               
                <button className="btn btn-red px-4 py-2 text-uppercase fw-bold"onClick={handleRemoveAll}><i className="fas fa-trash-alt me-2"></i>Xóa tất cả khỏi giỏ</button>
            </div>
            
            <div className="row">
                <div className="col-md-8">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product)=>(
                                <tr key={product._id}>
                                <td>
                                    <div className="cart-img-placeholder"><img src={`/img/${product.image}`} alt="" /></div>
                                    <span className="fw-bold text-uppercase">{product.name}</span>
                                </td>
                                
                                <td>{product.price.toLocaleString('vi-VN')}đ</td>
                                <td>
                                    <input type="number" className="form-control" value={product.quantity} min="1" 
                                    onChange={(e)=>handleQuantity(product._id, e.target.value)} />
                                </td>
                                <td>{(product.price * product.quantity).toLocaleString('vi-VN')}đ</td>
                                <td>
                                    <button className="btn btn-danger btn-sm "
                                    onClick={(e) => handleRemove(product._id)}>Xóa</button>
                                </td>
                                
                            </tr>
                                )
                            )}
                            
                            
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <div className="border p-4 bg-light">
                        <h4 className="text-uppercase fw-bold mb-4 border-bottom pb-2">Tổng Đơn Hàng</h4>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Tạm tính:</span>
                            <span className="fw-bold">{total.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <span>Phí giao hàng:</span>
                            <span className="fw-bold">30.000đ</span>
                        </div>
                        <div className="d-flex justify-content-between border-top pt-3 mb-4">
                            <span className="fw-bold text-uppercase">Tổng cộng:</span>
                            <span className="fw-bold text-red fs-5">{(total + 30000).toLocaleString('vi-VN')}đ</span>
                        </div>
                        <button className="btn btn-black w-100 py-3 text-uppercase fw-bold" onClick={handleOrder}>Tiến hành thanh toán</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}