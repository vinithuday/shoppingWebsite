import {mount} from "enzyme";
import App from "./App";
import {MemoryRouter, NavLink} from "react-router-dom";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Products from "./components/Products/Products";
import About from "./components/About/About";

describe("App Component", () =>{
  let wrapper = null;

  const component= (path)=>{
    return mount(
    <MemoryRouter initialEntries={[`${path}`]}>
    <App />
    </MemoryRouter>
    );
  };

  beforeEach(() =>{
    wrapper = component();
  });
    it("is Rendered", () =>{
      const app = wrapper.find({"data-testid": "App" });
      expect(app.length).toBe(1);
    });

    it("renders Navbar", () =>{
      const navbar = wrapper.find({"data-testid": "main_nav" });
      expect(navbar.length).toBe(1);
    });

    it("displays Navbar with brand name", () =>{
      const h1 = wrapper.find({"data-testid": "brand_name" });
      expect(h1.length).toBe(1);
      expect(h1.text()).toBe("The Clothing Company");
    });

    it("displays navLink with correct display name", () =>{
      const navLink = wrapper.find("NavLink");
      expect(navLink.at(0).text()).toBe("Home");
      expect(navLink.at(1).text()).toBe("About");
      expect(navLink.at(2).text()).toBe("Products");
    });


    it("displays navLink with correct path name", () =>{
      const navLink = wrapper.find("NavLink");
      expect(navLink.at(0).prop("to")).toBe("/");
      expect(navLink.at(1).prop("to")).toBe("/about");
      expect(navLink.at(2).prop("to")).toBe("/products");
    });


    
    it("displays navLink with correct button props", () => {
      const button = wrapper.find("Button");
      expect(button.prop("isUserLoggedIn")).toBe(false);

      expect(button.prop("ifUserLoggedIn")).toBe("Logout");

      expect(button.prop("ifUserNotLoggenIn")).toBe("Login");

      expect(button.prop("isLoading")).toBe(false);

      expect(typeof button.prop("handleLogin")).toBe("function");
    });


    it(" renders home correctly", () => {
      wrapper = component("/");
      expect(wrapper.find(Home)).toHaveLength(1);
      expect(wrapper.find(About)).toHaveLength(0);
      expect(wrapper.find(Products)).toHaveLength(0);
      expect(wrapper.find(ProductDetails)).toHaveLength(0);
    });

    it(" renders about correctly", () => {
      wrapper = component("/About");
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(About)).toHaveLength(1);
      expect(wrapper.find(Products)).toHaveLength(0);
      expect(wrapper.find(ProductDetails)).toHaveLength(0);
    });

    it(" renders products correctly", () => {
      wrapper = component("/Products");
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(About)).toHaveLength(0);
      expect(wrapper.find(Products)).toHaveLength(1);
      expect(wrapper.find(ProductDetails)).toHaveLength(0);
    });

    it(" renders productdetails correctly", () => {
      wrapper = component("/Products/1/tees");
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(About)).toHaveLength(0);
      expect(wrapper.find(Products)).toHaveLength(0);
      expect(wrapper.find(ProductDetails)).toHaveLength(1);
    });

    it(" renders product with correct properties", () => {
      wrapper = component("/Products");
      expect(wrapper.find(Products)).toHaveLength(1);
      expect(wrapper.find(Products).prop("isLoading")).toBe(false);
      expect(wrapper.find(Products).prop("isUserLoggedIn")).toBe(false);


    });


});