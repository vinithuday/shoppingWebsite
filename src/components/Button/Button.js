import Loader from "../Loader/Loader";
import "./Button.css"

const Button=({isUserLoggedIn, 
    handleLogin, 
    isLoading, 
    ifUserLoggedIn, 
    ifUserNotLoggenIn,
 }) =>{
    if(isLoading) {

    return(
        <> {/*This is a React fragemnt which acts as a parent element*/}
        
        <button className="login">
            <Loader component={"Login"}/>
        </button>
        </>
    );
} else {
    return(
        <>
        <button className="login" onClick={handleLogin}>
        {isUserLoggedIn ? ifUserLoggedIn : ifUserNotLoggenIn}
            
            </button>
            </>
            );
    }
}


export default Button;