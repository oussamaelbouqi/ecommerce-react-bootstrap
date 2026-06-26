import { useContext } from "react";
import Product from "../../components/slideProducts/Product";
import { CartContext } from "../../context/CartContext";
import "../CategoryPage/CategoryPage.css";
import toast from "react-hot-toast";
import "./Favorites.css";

function Favorites() {
  const { favorites, moveFavoriteToCart, removeFromFavorites } =
    useContext(CartContext);

  const handleMoveToCart = (item) => {
    moveFavoriteToCart(item);
    toast.success(`${item.title} moved to cart.`);
  };

  return (
    <div className="category-products FavoritesPage">
      <div className="container">
        <div className="top-category">
          <h2>Your Favorites</h2>
        </div>

        {favorites.length === 0 ? (
          <div className="alert alert-info mb-0" role="alert">
            No favorite products yet.
          </div>
        ) : (
          <div className="products">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
              {favorites.map((item) => (
                <div className="col" key={item.id}>
                  <Product item={item} />
                  
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
