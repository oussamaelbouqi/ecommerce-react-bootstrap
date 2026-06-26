import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/slideProducts/Product";
import "./CategoryPage.css";

const sortProducts = (items, sortBy) => {
  const nextItems = [...items];

  if (sortBy === "price-low") return nextItems.sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") return nextItems.sort((a, b) => b.price - a.price);
  if (sortBy === "rating") return nextItems.sort((a, b) => b.rating - a.rating);
  return nextItems;
};

function CategoryPage() {
  const { category } = useParams();
  const categoryTitle = category.replace(/-/g, " ");
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [stockFilter, setStockFilter] = useState("all");

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryProducts(data.products || []);
      })
      .catch(( ) => setCategoryProducts([]));
  }, [category]);

  const filteredProducts = sortProducts(
    categoryProducts.filter((product) => {
      const matchesSearch = `${product.title} ${product.brand || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in-stock" && product.stock > 0) ||
        (stockFilter === "low-stock" && product.stock > 0 && product.stock <= 20);

      return matchesSearch && matchesStock;
    }),
    sortBy
  );

  return (
    <div className="category-products">
      <div className="container">
        <div className="top-category">
          <h2>
            {categoryTitle} : {filteredProducts.length}
          </h2>
          <p>
            Search, filter, sort, and open any product for details.
          </p>
        </div>

        <div className="product-toolbar">
          <input
            type="search"
            placeholder="Search in this category"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <select
            value={stockFilter}
            onChange={(event) => setStockFilter(event.target.value)}
            aria-label="Filter products"
          >
            <option value="all">All stock</option>
            <option value="in-stock">In stock</option>
            <option value="low-stock">Low stock</option>
          </select>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>

        <div className="products">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            {filteredProducts.map((item) => (
              <div className="col" key={item.id}>
                <Product item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
