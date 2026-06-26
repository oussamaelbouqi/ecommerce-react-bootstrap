import { useContext } from "react";
import { FaCartArrowDown, FaCheck, FaRegHeart, FaShare } from "react-icons/fa";
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

function Product({ item }) {
  const { cartItems, addToCart , addToFavorites,favorites, removeFromFavorites} = useContext(CartContext);
  const isInCart = cartItems.some((i) => i.id === item.id);
  const handleAddToCart = () => {
    addToCart(item)

    toast.success(
     
    <div className="toast-wrapper">
        <img src={item.images[0]} alt=""  className="toast-img"/>

        <div className="toast-content">
            <strong className="toast-title">{item.title}</strong>
            added to cart
            <div>
              <button className="btn text-white  ">
                <Link to="/cart" className=" text-white text-decoration-none">View Cart</Link>
              </button>
            </div>
         </div>
    </div>
    
    , {
      duration: 2500,
    }
    );
  };

  //Favorites
    const isInFav = favorites.some((i) => i.id === item.id);

   const handleAddToFav = () => {
    if (isInFav) {
        removeFromFavorites(item.id)
        toast.error(
          `${item.title} Removed From Favorites`)
    }
    else{
        addToFavorites(item)
    toast.success(
      `${item.title} Added To Favorites`)
    }
   
    };


  return (
    <div className={`product ${isInCart ? "inCart" : ""} `}>
      <Link to={`/products/${item.id}`}>
        <span className="status-cart  ">
          <FaCheck className="me-2 " />  in cart
        </span>

        <div className="img-product">
          <img src={item.images[0]} alt={item.title} />
        </div>
        <p className="name-product">{item.title}</p>
        <div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStarHalfStroke />
        </div>
        <p className="price">
          <span>$ {item.price}</span>
        </p>
      </Link>
      <div className="icons">
        <span className="btn-addtocart" onClick={handleAddToCart}>
          <FaCartArrowDown />
        </span>
        <span className={`${isInFav ? "in-Fav" : ""}`} onClick={ handleAddToFav}>
          <FaRegHeart />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
}

export default Product;
