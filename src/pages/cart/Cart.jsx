import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import "./Cart.css";
import PageTransition from "../../components/PageTransition";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    cartTotal,
    decreaseQuantity,
    increaseQuantity,
    updateQuantity,
    removeFromCart,
  } = useContext(CartContext);

  return (
    <PageTransition>
      <div className="Checkout">
        <div className="order-summary">
          <h1 className="text-primary w-100 border-bottom pb-2 mb-4">Order Summary</h1>

          <div className="items">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div className="item-cart" key={index}>
                  <div className="image-name">
                    <div className="img-item">
                      <img src={item.images[0]} alt={item.title} />
                    </div>
                    <div className="content">
                      <h4 className="item-title">{item.title}</h4>
                      <p className="item-price">${item.price}</p>
                      <div className="quantity-control">
                        <button onClick={() => decreaseQuantity(item.id)}>
                          -
                        </button>
                        <input
                          className="quantity"
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(event) =>
                            updateQuantity(item.id, event.target.value)
                          }
                          aria-label={`Quantity for ${item.title}`}
                        />
                        <button onClick={() => increaseQuantity(item.id)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="delete-item"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="bottom-summary">
            <div className="shop-table">
              <p>Total:</p>
              <span className="total-ckeckout">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="button-div">
              <Link
                className={`place-order-link ${
                  cartItems.length === 0 ? "disabled" : ""
                }`}
                to={cartItems.length === 0 ? "/cart" : "/checkout"}
              >
                Place order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Cart;
