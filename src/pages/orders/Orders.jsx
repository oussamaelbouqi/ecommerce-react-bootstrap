import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import "../auth/Auth.css";

function Orders() {
  const { currentUser } = useContext(AuthContext);
  const { getOrdersByUser } = useContext(CartContext);
  const orders = getOrdersByUser(currentUser.email);

  return (
    <div className="account-page">
      <div className="container">
        <div className="top-category">
          <h2>Order History</h2>
          <p>Track status and review products from every order.</p>
        </div>

        {orders.length === 0 ? (
          <div className="alert alert-info">
            No orders yet. <Link to="/cart">Go to cart</Link>
          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-meta">
                <div>
                  <strong>{order.id}</strong>
                  <p className="mb-0">
                    {new Date(order.date).toLocaleDateString()} at{" "}
                    {new Date(order.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span className="order-status">{order.status}</span>
                <strong>${order.total.toFixed(2)}</strong>
              </div>

              {order.items.map((item) => (
                <div className="order-line" key={item.id}>
                  <img src={item.images?.[0]} alt={item.title} />
                  <div>
                    <strong>{item.title}</strong>
                    <p className="mb-0">Quantity: {item.quantity}</p>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
