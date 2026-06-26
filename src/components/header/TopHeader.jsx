import { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../../img/logo.png";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import "./header.css";
import { CartContext } from "../../context/CartContext";
import SerachBox from "./SerachBox";

function TopHeader() {
  const { cartItems, favorites } = useContext(CartContext);

  return (
    <div className="top_header">
      <Container>
        <Row className="align-items-center gy-2 gy-md-0">
          <Col xs={6} lg={3}>
            <Link className="logo" to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </Col>
          <Col xs={6} lg={3} className="order-2 order-lg-3 d-flex justify-content-end">
            <div className="header_icons">
              <div className="icon">
                <Link to="/favorites">
                  <FaRegHeart />
                  <span className="count">{favorites.length}</span>
                </Link>
              </div>

              <div className="icon">
                <Link to="/cart">
                  <TiShoppingCart />
                  <span className="count">{cartItems.length}</span>
                </Link>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6} className="order-3 order-lg-2">
            <SerachBox />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TopHeader;
