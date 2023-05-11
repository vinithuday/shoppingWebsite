import { useParams } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () =>{
const {id, name} = useParams();
console.log(id);
console.log(name);
function handleClick() {
    console.log("Button clicked!");
  }


    return(
        <div className="content">
<div className="product">

    <div className="image">
        <img src="https://via.placeholder.com/520x460" alt="productDetails"/>
    </div>
    <div className="details">
        <h2>
            {name}-{id}
        </h2>

        <p>
        With the one-off energy price lump sum, the federal government relieves people in training. 
        The one-off payment can be applied for online shortly. There are a few steps you can take 
        in advance to speed up the application process. On this page you will find all important 
        information about this as well as
        </p>
        <p>
        price- 60$

        </p>

        <button onClick={handleClick}>Add!</button>
    </div>
</div>

        </div>
    );
};

export default ProductDetails;