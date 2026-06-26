import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function SerachBox() {
  const [serachTerm, setSerachTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const navigate = useNavigate();
  const handleSbumit = (e) => {
    e.preventDefault();
    const searchQuery = serachTerm.trim();

    if (searchQuery) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
    setSuggestions([]);
  };

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

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!serachTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(
            serachTerm.trim()
          )}`
        );
        const data = await res.json();
        setSuggestions(data.products.slice(0, 5) || []);
      } catch (error) {
        console.error("Search Error :", error);
        setSuggestions([]);
      }
    };

    const debonuce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debonuce);
  }, [serachTerm]);

  return (
    <div className="serachBox_Contaienr">
      <form onSubmit={handleSbumit} className="search_box">
        <button
          type="button"
          className="search_category"
          aria-label="All categories"
          onClick={() => setIsCategoryOpen((current) => !current)}
        >
          <span>All Categories</span>
          <MdOutlineArrowDropDown />
        </button>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search For Products"
          value={serachTerm}
          onChange={(e) => setSerachTerm(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      {isCategoryOpen && (
        <div className="search_category_list ">
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
      )}

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item) => (
            <li key={item.id}>
              <Link
                to={`/products/${item.id}`}
                onClick={() => setSuggestions([])}
              >
                <img src={item.images[0]} alt={item.title} />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SerachBox;
