import { useContext } from 'react'
import { FaCartArrowDown, FaRegHeart, FaShare, FaStar } from 'react-icons/fa'
import { FaRegStarHalfStroke } from 'react-icons/fa6'
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function ProductInfo( {product , addToCart , addToFavorites} ) {

  const { cartItems } = useContext(CartContext);
  const isInCart = cartItems.some((i) => i.id === product.id);

   const handleAddToCart = () => {
    if (isInCart) return;

    addToCart(product)

    toast.success(
     
    <div className="toast-wrapper">
        <img src={product.images[0]} alt=""  className="toast-img"/>

        <div className="toast-content">
            <strong className="toast-title">{product.title}</strong>
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


  return (
     <div className="col-lg-6 col-md-6 col-12">
              <div className="details-item">
                <h1 className="name text text-primary">{product.title}</h1>

                <div className="stars text-warning">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStarHalfStroke />
                </div>

                <p className="price">$ {product.price}</p>

                <h5>
                  Availability:
                  <span>
                    {product.stock > 0 ? " In Stock" : " Out Of Stock"}
                  </span>
                </h5>

                <h5>
                  Brand: <span>{product.brand}</span>
                </h5>

                <p className="desc">{product.description}</p>

                <h5 className=" stock text-primary ">
                  Hurry Up! Only <span>{product.stock}</span> products left in
                  stock.
                </h5>
                <button
                  className= {`btn d-flex align-items-center justify-content-center ${isInCart ? "inCart" : ""} `} 
                  
                  onClick={() => handleAddToCart(product)}
                >
                  {isInCart ? "item in Cart" : "Add to Cart"} <FaCartArrowDown />
                </button>

                <div className="icons">
                  <button
                    className="Heart"
                    onClick={() => addToFavorites(product)}
                  >
                    <FaRegHeart />
                  </button>
                  <button className="share">
                    <FaShare />
                  </button>
                </div>
              </div>
            </div>

  )
}

export default ProductInfo
