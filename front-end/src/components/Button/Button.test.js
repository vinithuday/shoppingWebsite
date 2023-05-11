
import {mount} from "enzyme"
import Button from "./Button";

const component = (prop) => {
    return mount(<Button {...prop} />);
};



describe('Button Component ', () =>{
let wrapper = null;

beforeEach(() => {
    wrapper = component();
});



it("is rendered", () => {
    const button = wrapper.find("button");
    expect(button.length).toBe(1);
});


it("is rendered", () => {
    const button = wrapper.find("button");
    expect(button.length).toBe(1);
});

it("is rendered correctly according to variation 1", () => {
    const prop_1 = {
        isUserLoggedIn: true, 
    handleLogin: jest.fn(), 
    isLoading: false, 
    ifUserLoggedIn:"Logout", 
    ifUserNotLoggenIn:"Login",
    };
    wrapper = component(prop_1);

    const button = wrapper.find("button");
    expect(button.text()).toEqual(prop_1.ifUserLoggedIn);
    expect(typeof button.prop("onClick")).toBe("function");

});




});