import TopHeader from "./components/header/TopHeader";
import BtmHeader from "./components/header/BtmHeader";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import { AnimatePresence } from "motion/react";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Favorites from "./pages/favorites/Favorites";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/auth/Profile";
import Orders from "./pages/orders/Orders";
import Checkout from "./pages/checkout/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <header>
        <TopHeader />
        <BtmHeader />
      </header>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#e9e9e9",
            borderRadius: "5px",
            padding: "15px",
          },
        }}
      />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
