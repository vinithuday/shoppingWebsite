import "./Loader.css";


const Loader=(props) =>{
    return(
        <div
        className={`loader ${
        props.component === "Products" ? "loader_Products" : "loader_Login"
        }`}
        ></div>
    );
};

export default Loader;

