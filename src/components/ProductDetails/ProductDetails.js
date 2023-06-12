import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./ProductDetails.css";
import { apiCall } from "../../util/util";

const ProductDetails = () => {
  const { id, name, price, description } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [productData, setProductData] = useState({
    product_name: name,
    product_description: description,
    product_price: price,
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setEditMode(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall.update(id,productData,navigate)
    setEditMode(false); 
  };

  const handleDelete = () => {
    const response = window.confirm(`Are you sure you want to delete ${name}?`);
    if (response) {
      apiCall.delete(id, navigate);
    }
  };
  return (
    <div className="content">
      <div className="product">
        <div className="image">
          <img src="https://via.placeholder.com/520x460" alt="productDetails" />
        </div>
        <div className="details">
          <h2 onClick={handleEdit} className={editMode ? "editable" : ""}>
            {editMode ? (
              <input
                type="text"
                name="product_name"
                value={productData.product_name}
                onChange={handleChange}
              />
            ) : (
              productData.product_name
            )}
          </h2>
          <p onClick={handleEdit} className={editMode ? "editable" : ""}>
            {editMode ? (
              <textarea
                name="product_description"
                value={productData.product_description}
                onChange={handleChange}
              ></textarea>
            ) : (
              productData.product_description
            )}
          </p>
          <p onClick={handleEdit} className={editMode ? "editable" : ""}>
            {editMode ? (
              <input
                type="number"
                name="product_price"
                value={productData.product_price}
                onChange={handleChange}
              />
            ) : (
              productData.product_price
            )}
          </p>
          {editMode ? (
            <button type="submit" onClick={handleSubmit}>
              Save
            </button>
          ) : (
            <button onClick={handleDelete}>Delete!</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;