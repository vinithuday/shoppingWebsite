import "./Products.css";
import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddProducts from "../AddProducts/AddProducts";


const Products = (props) => {
  const [products, setProducts] = useState({
    Clothing: []
  });

  useEffect(() => {
    const fetchClothingProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3010/getAll/products"
        );
        const data = response.data;
        console.log(data);
        setProducts((prevProducts) => ({
          ...prevProducts,
          Clothing: data,
        }));
      } catch (error) {
        console.error("Error fetching clothing products:", error);
      }
    };

    fetchClothingProducts();
  }, [props.isLoading]);

  if (props.isLoading) {
    return <Loader component={"Products"} />;
  }

  if (props.isUserLoggedIn) {
    return (
      <div className="content">
      <h3>Products</h3>
     <AddProducts/>
      <div className="products">
        {products.Clothing.map((p) => (
          <div key={p._id} className="product">
            <Link to={`/products/${p._id}/${p.product_name}/${p.product_price}/${p.product_description}`}>
              <img src="https://via.placeholder.com/250x150" alt="product" className="product-image" />
           
            <div className="product-details">
              <p className="product-name">{p.product_name}</p>
              <p className="product-price">{p.product_price}</p>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    );
  } else {
    return (
      <div className="content" style={{ textAlign: "center" }}>
        Please Login to See Products
      </div>
    );
  }
};

export default Products;
