import { useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSlider";
import "./Home.css";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import SlideProductsLoading from "../../components/slideProducts/SlideProductsLoading";
import PageTransition from "../../components/PageTransition";

const categories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
];

function Home() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`,
            );
            const data = await res.json();
            return { [category]: data.products };
          }),
        );
        const productsData = Object.assign({}, ...res);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <PageTransition>
      <div>
        <HeroSlider />

        {loading
          ? categories.map((category) => (
              <SlideProductsLoading key={category} />
            ))
          : categories.map((category) => (
              <SlideProduct
                key={category}
                title={category.replace("-", " ")}
                data={products[category] || []}
              />
            ))}
      </div>
    </PageTransition>
  );
}

export default Home;
