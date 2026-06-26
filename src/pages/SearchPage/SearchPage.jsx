import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Product from "../../components/slideProducts/Product";
import "../CategoryPage/CategoryPage.css";

const normalizeText = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.trim() || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    const fetchSearchProducts = async () => {
      if (!query) {
        setProducts([]);
        return;
      }

      setLoading(true);

      try {
        const searchRes = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
        );
        const searchData = await searchRes.json();
        let results = searchData.products || [];

        if (results.length === 0) {
          const allProductsRes = await fetch(
            "https://dummyjson.com/products?limit=0"
          );
          const allProductsData = await allProductsRes.json();
          const normalizedQuery = normalizeText(query);

          results = (allProductsData.products || []).filter((product) => {
            const searchableText = normalizeText(
              `${product.title} ${product.brand} ${product.category}`
            );

            return searchableText.includes(normalizedQuery);
          });
        }

        setProducts(results);
      } catch (error) {
        console.error("Search Products Error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchProducts();
  }, [query]);

  const filteredProducts = [...products]
    .filter((product) => {
      if (priceFilter === "under-100") return product.price < 100;
      if (priceFilter === "100-500") {
        return product.price >= 100 && product.price <= 500;
      }
      if (priceFilter === "over-500") return product.price > 500;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="category-products">
      <div className="container">
        <div className="top-category">
          <h2>
            Search Results for "{query}" : {filteredProducts.length}
          </h2>
          <p>
            {loading
              ? "Loading products..."
              : products.length > 0
              ? "Products matching your search."
              : "No Results found."}
          </p>
        </div>

        <div className="product-toolbar">
          <input type="search" value={query} readOnly aria-label="Search query" />
          <select
            value={priceFilter}
            onChange={(event) => setPriceFilter(event.target.value)}
            aria-label="Filter by price"
          >
            <option value="all">All prices</option>
            <option value="under-100">Under $100</option>
            <option value="100-500">$100 to $500</option>
            <option value="over-500">Over $500</option>
          </select>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort search results"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>

        {!loading && filteredProducts.length === 0 ? (
          <p>No Results found.</p>
        ) : (
          <div className="products">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
              {filteredProducts.map((item) => (
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

export default SearchPage;
