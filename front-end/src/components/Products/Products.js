// import "./Products.css";
// import Loader from "../Loader/Loader";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Products = (props) => {
//   let [products] = useState({
//     Clothing: [0, 1, 2, 3],
//     Electronics: [4, 5, 6, 7],
//     Sports: [8, 9, 10, 11],
//   });
//   if (props.isLoading) {
//     return <Loader component={"Products"} />;
//   }
//   if (props.isUserLoggedIn) {
//     return (
//       <div className="content">
//         <h3>Clothing</h3>
//         <div className="products">
//         {products.Clothing.map((p) => (
//           <div key={p}>
//             <Link to={`/products/${p}/Clothing`}>
//               <img src="https://via.placeholder.com/250x150" alt="product" />
//             </Link>
//             <p style={{ textAlign: "center" }}>Clothing - {p}</p>

//           </div>

//         ))}
//         </div>

//           <h3>Electronics</h3>
//           <div className="products">
//         {products.Electronics.map((p) => (
//           <div key={p}>
//             <Link to={`/products/${p}/Electronics`}>
//               <img src="https://via.placeholder.com/250x150" alt="product" />
//             </Link>
//             <p style={{ textAlign: "center" }}>Electronics - {p}</p>
//           </div>
//         ))}
//         </div>

//           <h3>Sports</h3>
//           <div className="products">
//         {products.Sports.map((p) => (
//           <div key={p}>
//             <Link to={`/products/${p}/Sports`}>
//               <img src="https://via.placeholder.com/250x150" alt="product" />
//             </Link>
//             <p style={{ textAlign: "center" }}>Sports - {p}</p>
//           </div>
//         ))}
//         </div>
//       </div>

//     );
//   }else {
//     return(
//     <div className="content" style={{textAlign:"center" }}>
//       Please Login to See Products
// </div>
//     );
//   }
// };

// export default Products;

// import "./Products.css";
// import Loader from "../Loader/Loader";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Products = (props) => {
//   let [products, setProducts] = useState(null);

//   useEffect(() => {
//     axios.get("https://example.com/api/products").then((response) => {
//       setProducts(response.data);
//     });
//   }, []);

//   if (props.isLoading) {
//     return <Loader component={"Products"} />;
//   }

//   if (props.isUserLoggedIn) {
//     return (
//       <div className="content">
//         {products &&
//           Object.keys(products).map((category) => (
//             <div key={category}>
//               <h3>{category}</h3>
//               <div className="products">
//                 {products[category].map((product) => (
//                   <div key={product.id}>
//                     <Link to={`/products/${product.id}/${category}`}>
//                       <img
//                         src={product.image_url}
//                         alt={product.name}
//                         width="250"
//                         height="150"
//                       />
//                     </Link>
//                     <p style={{ textAlign: "center" }}>
//                       {product.name} - {product.id}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//       </div>
//     );
//   } else {
//     return (
//       <div className="content" style={{ textAlign: "center" }}>
//         Please Login to See Products
//       </div>
//     );
//   }
// };

// export default Products;

import "./Products.css";
import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = (props) => {
  let [products, setProducts] = useState({
    Clothing: [],
    Beauty: [],
    HomeGoods: [],
    Electronics: [],
    Sports: [],
  });
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3010/getAll").then((response) => {
      console.log(response.data);
      setProducts(response.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loader component={"Products"} />;
  }
  if (props.isUserLoggedIn) {
    return (
      <div className="content">
        <h3>Clothing</h3>
        <div className="products">
          {products.Clothing && products.Clothing.map((p) => (
            <div key={p}>
              <Link to={`/products/${p}/Clothing`}>
                <img src="https://via.placeholder.com/250x150" alt="product" />
              </Link>
              <p style={{ textAlign: "center" }}>Clothing - {p}</p>
            </div>
          ))}
        </div>




        <h3>Beauty</h3>
        <div className="products">
          {products.Beauty && products.Beauty.map((p) => (
            <div key={p}>
              <Link to={`/products/${p}/Beauty`}>
                <img src="https://via.placeholder.com/250x150" alt="product" />
              </Link>
              <p style={{ textAlign: "center" }}>Beauty - {p}</p>
            </div>
          ))}
        </div>

        <h3>HomeGoods</h3>
        <div className="products">
          {products.HomeGoods && products.HomeGoods.map((p) => (
            <div key={p}>
              <Link to={`/products/${p}/HomeGoods`}>
                <img src="https://via.placeholder.com/250x150" alt="product" />
              </Link>
              <p style={{ textAlign: "center" }}>HomeGoods - {p}</p>
            </div>
          ))}
        </div>

        <h3>Electronics</h3>
        <div className="products">
          {products.Electronics && products.Electronics.map((p) => (
            <div key={p}>
              <Link to={`/products/${p}/Electronics`}>
                <img src="https://via.placeholder.com/250x150" alt="product" />
              </Link>
              <p style={{ textAlign: "center" }}>Electronics - {p}</p>
            </div>
          ))}
        </div>

        <h3>Sports</h3>
        <div className="products">
          {products.Sports && products.Sports.map((p) => (
            <div key={p}>
              <Link to={`/products/${p}/Sports`}>
                <img src="https://via.placeholder.com/250x150" alt="product" />
              </Link>
              <p style={{ textAlign: "center" }}>Sports - {p}</p>
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
