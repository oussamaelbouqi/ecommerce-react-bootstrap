import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import "./Auth.css";

function Profile() {
  const { currentUser, logout, updateProfile } = useContext(AuthContext);
  const { cartItems, favorites, getOrdersByUser } = useContext(CartContext);
  const [name, setName] = useState(currentUser?.name || "");
  const orders = getOrdersByUser(currentUser.email);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile({ name });
    toast.success("Profile updated.");
  };

  return (
    <div className="account-page">
      <div className="container account-layout">
        <div className="account-card">
          <h2>Profile</h2>
          <p>{currentUser.email}</p>

          <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="profile-name">
              Full name
            </label>
            <input
              id="profile-name"
              className="form-control mb-3"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <button className="auth-submit" type="submit">
              Save profile
            </button>
          </form>

          <button className="btn btn-danger mt-3" type="button" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="account-card">
          <h2>Account Overview</h2>
          <div className="profile-stat-grid">
            <div className="profile-stat">
              <strong>{cartItems.length}</strong>
              <span>Cart items</span>
            </div>
            <div className="profile-stat">
              <strong>{favorites.length}</strong>
              <span>Wishlist</span>
            </div>
            <div className="profile-stat">
              <strong>{orders.length}</strong>
              <span>Orders</span>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <Link className="auth-submit d-inline-flex align-items-center justify-content-center text-decoration-none" to="/orders">
              View orders
            </Link>
            <Link className="auth-submit d-inline-flex align-items-center justify-content-center text-decoration-none" to="/checkout">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
