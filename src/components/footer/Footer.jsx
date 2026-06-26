import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>O.Elbouqi Store</h3>
          <p>
            Modern electronics store with saved carts, favorites, and order
            tracking.
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/elboukioussama36" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/oussama.elbouqi/" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://github.com/oussamaelbouqi" aria-label="github">
           <FaGithub />

            </a>
            <a href="https://www.linkedin.com/in/oussama-el-bouqi-4b578120a/" aria-label="linkedin">
          <FaLinkedin />

            </a>
          </div>
        </div>

        <div>
          <h4>Shop</h4>
          <Link to="/category/smartphones">Smartphones</Link>
          <Link to="/category/laptops">Laptops</Link>
          <Link to="/category/mobile-accessories">Accessories</Link>
        </div>

        <div>
          <h4>Account</h4>
          <Link to="/profile">Profile</Link>
          <Link to="/orders">Order History</Link>
          <Link to="/favorites">Wishlist</Link>
        </div>

        <div>
          <h4>Support</h4>
          <p>Tiflet, Morocco</p>
          <p>support@oussamatech.store</p>
          <p>+212 711 726 768</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} O.Elbouqi Store.</span>
      </div>
    </footer>
  );
}

export default Footer;
