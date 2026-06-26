import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import "../auth/Auth.css";

function Checkout() {
  const { currentUser } = useContext(AuthContext);
  const { cartItems, cartTotal, placeOrder } = useContext(CartContext);
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({
    name: currentUser.name,
    phone: "",
    address: "",
    city: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const order = placeOrder({ user: currentUser, shipping });

    if (!order) {
      toast.error("Your cart is empty.");
      return;
    }

    toast.success("Order placed successfully.");
    navigate("/orders");
  };

  return (
    <div className="account-page">
      <div className="container">
        <div className="top-category">
          <h2>Checkout</h2>
          <p>Confirm shipping details and place your order.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="alert alert-info">
            Your cart is empty. <Link to="/">Continue shopping</Link>
          </div>
        ) : (
          <div className="checkout-layout">
            <form className="checkout-card" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="checkout-name">
                    Full name
                  </label>
                  <input
                    id="checkout-name"
                    className="form-control"
                    value={shipping.name}
                    onChange={(event) =>
                      setShipping((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="checkout-phone">
                    Phone
                  </label>
                  <input
                    id="checkout-phone"
                    className="form-control"
                    value={shipping.phone}
                    onChange={(event) =>
                      setShipping((prev) => ({
                        ...prev,
                        phone: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="checkout-address">
                    Address
                  </label>
                  <input
                    id="checkout-address"
                    className="form-control"
                    value={shipping.address}
                    onChange={(event) =>
                      setShipping((prev) => ({
                        ...prev,
                        address: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="checkout-city">
                    City
                  </label>
                  <input
                    id="checkout-city"
                    className="form-control"
                    value={shipping.city}
                    onChange={(event) =>
                      setShipping((prev) => ({
                        ...prev,
                        city: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <button className="auth-submit mt-4" type="submit">
                Place order
              </button>
            </form>

            <aside className="checkout-card">
              <h3>Summary</h3>
              {cartItems.map((item) => (
                <div className="order-line" key={item.id}>
                  <img src={item.images?.[0]} alt={item.title} />
                  <div>
                    <strong>{item.title}</strong>
                    <p className="mb-0">Qty: {item.quantity}</p>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
