import { useState } from "react";
import "./offers.css"

export const products = [
    { title: "Clothing", price: 17.99 },
{ title: "Electronics", price: 74.99 },
{ title: "Sports", price: 11.99 },


];

const Offers =() => {
    // useState returns 2 things -state and setter of the state

    const [items] = useState(products);

    return(

        <div className="offers">
            <h3>Latest Offers </h3>
            <div className="offer">
                {
                    items.map((item) => (
                        <div key={item.title}>
                            <img src="https://via.placeholder.com/358x200" alt="product"/>
                            <h4>{item.title}</h4>
                            <p>${item.price}</p>
                        </div>
                    ))
                }

            </div>


        </div>
    )

};

export default Offers;