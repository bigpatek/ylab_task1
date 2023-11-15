import React, {useContext} from "react";
import { AuthContext } from "../../context";
import { Link } from "react-router-dom";
import MyButton from "../UI/MyButton/MyButton";
import '../../styles/App.css'
import { authAPI } from "../../API/api";

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);
    
    const logOut = async () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }
    
    return (
        <div className="navbar">
            <div className="navbar__links">
                <Link to='/about'>О сайте</Link>
                {isAuth && <span style={{marginLeft:'15px'}}><MyButton onClick={logOut} style={{color:'black', border: 'black 1px solid'}}>Выйти</MyButton></span>}
            </div>
        </div>
    )
}

export default Navbar;