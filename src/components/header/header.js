import React from "react";
import Logo from "../../images/logo1.png";
import "./header.css"

const Header = () =>{
    return(
        <div id="header">
           <img src={Logo} alt ="logo"/>
           <h1>To-Do</h1>
        </div>
    )
}

export default Header;