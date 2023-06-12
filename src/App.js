import "./App.css";
import { NavLink, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Button from "./components/Button/Button";

//PAGES
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Info from "./components/About/info/info";
import Offers from "./components/About/offers/offers";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";


const App = () => {
  const [loggedIn, setLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleLogin =() =>{
    setLoading(true);
    setTimeout(()=>{
      setLogin(!loggedIn);
      setLoading(false);

    }, 1500);
  };

  return (
    <div className="App" data-testid="App">
      <nav data-testid="main_nav">
        <h1 data-testid="brand_name">The Inventory Management System</h1>{" "}
        {/*anchor tabs refreshes the page, so we dont use that*/}
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/products">Products</NavLink>
        <Button
          isUserLoggedIn={loggedIn}
          handleLogin={handleLogin}
          isLoading={isLoading}
          ifUserLoggedIn={"Logout"}
          ifUserNotLoggenIn={"Login"}
        />
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          {/* Nested Route*/}
          <Route path="info" element={<Info />} />
          <Route path="offers" element={<Offers />} />
        </Route>

        <Route
          path="/products"
          element={<Products isUserLoggedIn={loggedIn} isLoading={isLoading} />}
        />

        <Route path="/products/:id/:name/:price/:description" element={<ProductDetails />} />

        {/* Wild Card */}
        <Route path="*" element={<h4 className="error">Route Not Found</h4>} />
      </Routes>
    </div>
  );
};

export default App;
