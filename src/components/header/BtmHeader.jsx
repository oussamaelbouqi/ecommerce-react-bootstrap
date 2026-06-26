import { useContext, useEffect, useState } from "react";
import { IoIosLogOut, IoMdMenu } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";
import { FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { RiLogoutCircleRFill } from "react-icons/ri";


const NavLinks = [
  {title: "Home" , link : "/"},
  { title: "About", link: "/about" },
  { title: "Accessories", link: "/accessories" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
]

function BtmHeader() {
  const location = useLocation();
  const { currentUser, isAuthenticated, logout } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        const normalized = Array.isArray(data)
          ? data.map((item) =>
              typeof item === "string"
                ? { slug: item, name: item.replace(/-/g, " ") }
                : {
                    slug: item.slug || item.name || String(item),
                    name: item.name || item.slug || String(item),
                  }
            )
          : [];

        setCategories(normalized);
      })
      .catch(() => setCategories([]));
  }, []);

  const handleCategoryButtonClick = () => {
    setIsCategoryOpen((current) => !current);
  };

  return (
    <div className="btm_header">
      <Container>
        <Row className="align-items-center gy-2">
          <Col xs={3} md={6} lg={3}>
            <div className="btm_header_left">
              <button
                type="button"
                className="mobile_menu_btn"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <IoMdMenu />
              </button>

              <div className={`category_nav ${isCategoryOpen ? "open" : ""}`}>
              <div
                className="category_btn"
                onClick={handleCategoryButtonClick}
              >
                <IoMdMenu />
                <p>All Categories</p>
                <MdOutlineArrowDropDown />
              </div>

              <div className={`category_nav_list ${isCategoryOpen ? "active" : ""}`}>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    onClick={() => setIsCategoryOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            </div>
          </Col>

          <Col lg={6} className="d-none d-lg-block">
            <nav className="nav">
              <div className="nav_links">
                {NavLinks.map((item) => (
                  <li
                    key={item.link}
                    className={location.pathname === item.link ? "active" : ""}
                  >
                    <Link to={item.link}>{item.title}</Link>
                  </li>
                ))}
              </div>
            </nav>
          </Col>

          <Col xs={9} md={6} lg={3} >
            <div className="sign_regs_icon ">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="auth_btn text text-decoration-none !important">
                    <FaUserCircle />
                    <span>{currentUser.name.split(" ")[0]}</span>
                  </Link>
                  <Link to="/orders" className="auth_btn text-decoration-none !important">
                    <FaBoxOpen />
                  </Link>
                  <button type="button" className="auth_btn logout_btn" onClick={logout}>
              <RiLogoutCircleRFill />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="auth_btn text text-decoration-none !important">
                    <PiSignInBold />
                    <span >Login</span>
                  </Link>
                  <Link to="/register" className="auth_btn text-decoration-none !important">
                    <FaUserPlus />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      <Offcanvas
        show={isMenuOpen}
        onHide={() => setIsMenuOpen(false)}
        placement="start"
        className="mobile_nav_offcanvas"
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <div className="mobile_nav_links">
            {NavLinks.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                className={location.pathname === item.link ? "active" : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  Profile
                </Link>
                <Link to="/orders" onClick={() => setIsMenuOpen(false)}>
                  Orders
                </Link>
                <button type="button" className="logout_btn btn bg-transparent border-0 text-danger fw-bold" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default BtmHeader
