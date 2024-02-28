import { useEffect,useState } from "react";
import SearchBar from "./SearchBar";
import "./allproducts.css"

function AllProducts() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15;
  
    useEffect(() => {
      fetch("/get_all_products")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.products);
          console.log(data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }, []);
  
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm.trim() !== "") {
          const filteredProducts = products.filter((product) =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(product.user_id).includes(searchTerm.toLowerCase())
          );
          setFilteredProducts(filteredProducts);
        } else {
          setFilteredProducts([]);
        }
        setCurrentPage(1); // Reset to the first page when searching
      };
  
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = (searchTerm.trim() === "" ? products : filteredProducts).slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
  
    const totalPages = Math.ceil(
      (searchTerm.trim() === "" ? products.length : filteredProducts.length) / productsPerPage
    );
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  return (
    <div>
        <div className="top">
        <div className="search  ">
          <SearchBar onSearch={handleSearch} products={products} />
        </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4">
            {currentProducts.map((product) => (
              <div to={`/products/${product.product_id}`} key={product.product_id}>
                <div className="allbox">
                  <img
                    src={product.image_link}
                    alt={product.product_name}
                    className="object-cover rounded-md border border-gray-300 h-48 w-full"
                  />
                  <div className="des">Description: {product.description}</div>
                  Name:{product.product_name}
                  <br />
                  Category: {product.category_name}
                  <br />
                  Quantity: {product.quantity}
                  <br />
                  Price: <b>Ksh {product.price }</b>
                  <br />
                  User Id: <b>{product.user_id}</b>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}className="btn-9">
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn-9">
              Next
            </button>
          </div>
    </div>
  )
}
export default AllProducts