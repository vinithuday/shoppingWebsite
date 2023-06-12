import "./AddProducts.css";
import { useState } from "react";
import { apiCall } from "../../util/util";
import { useNavigate} from "react-router-dom";

const  AddProducts= (props) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        product_name: "",
        product_description: "",
        product_price: 0,
        product_category: "",
        product_location: "",
        product_quantity:0,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
          ...prevProduct,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        apiCall.add(product,navigate)
        // addProductToDatabase(product);
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input
              type="text"
              name="product_name"
              value={product.product_name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Product Description:
            <textarea
              name="product_description"
              value={product.product_description}
              onChange={handleChange}
            ></textarea>
          </label>
          <br />
          <label>
            Product Price:
            <input
              type="number"
              name="product_price"
              value={product.product_price}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Product Category:
            <input
              type="text"
              name="product_category"
              value={product.product_category}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Product Location:
            <input
              type="text"
              name="product_location"
              value={product.product_location}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Product Quantity:
            <input
              type="number"
              name="product_quantity"
              value={product.product_quantity}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Add Product</button>
        </form>
      );
    

};

export default AddProducts;
