import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// const navigate = useNavigate();

export const apiCall = {
  delete: (id,navigate) => {
    axios
      .delete(`http://localhost:3010/delete/${id}`)
      .then((response) => {
        // Do any necessary actions after successful deletion
        navigate("/products");
        return response.data;
      })
      .catch((error) => {
        // Handle any errors that occur during deletion
        return error;
      });
  },
  add: (product,navigate) => {
    axios
      .post("http://localhost:3010/add", product)
      .then((response) => {
        console.log("Product added successfully:", response.data);
        navigate(window.location.pathname);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  },
  update:(id,productData,navigate)=>{
    axios
    .patch(`http://localhost:3010/update/${id}`, productData)
    .then((response) => {
      console.log("Product updated successfully:", response.data);
      navigate("/products");
      // Exit edit mode after successful update
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      // Handle any errors that occur during update
    });
  }
};