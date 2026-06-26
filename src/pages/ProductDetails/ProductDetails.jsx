import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import { CartContext } from "../../context/CartContext";
import "./ProductDetails.css";
import SlideProductsLoading from "../../components/slideProducts/SlideProductsLoading";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import PageTransition from "../../components/PageTransition";

function ProductDetails() {
  const { id } = useParams();
  

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelatedProducts, setLoadingRelatedProducts] = useState(true);
  const { addToCart, addToFavorites } = useContext(CartContext);
  const productCategory = product?.category;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!productCategory) return;
    fetch(`https://dummyjson.com/products/category/${productCategory}`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedProducts(data.products);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingRelatedProducts(false));
  }, [productCategory]);
 

  if (!product || !product.images) return <p>Product Not Found</p>;

  return (
    <PageTransition key={id} >
       <div>
      {loading ? (
        <SlideProductsLoading />
      ) : (
        <div className="item-details">
          <div className="container">
            <div className="row align-items-start">
              <ProductImages product={product} />

              <ProductInfo
                product={product}
                addToCart={addToCart}
                addToFavorites={addToFavorites}
              />
            </div>
          </div>
        </div>
      )}

      {loadingRelatedProducts ? (
        <SlideProductsLoading />
      ) : (
        <SlideProduct
          key={product.category}
          data={relatedProducts}
          title={product.category.replace("-", " ")}
        />
      )}
    </div>
    </PageTransition>
  );
  //    <div>{loading ? "Loading..." : product?.title}</div>;
}

export default ProductDetails;
