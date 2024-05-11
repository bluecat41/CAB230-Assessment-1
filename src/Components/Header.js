import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useMatch } from "react";

export default function Header(props) {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        if (localStorage.getItem("token")) {
        setLoggedIn(true);

        } else {
        setLoggedIn(false)
        }
    }, [])

    return(
        <div className="header">
        <header>
            <div>
                <img className="logo-icon" alt="small-volcano-logo" />
            </div>
            <div>
                <h2 className="header-title">
                    Volcanoes of the World
                </h2>
            </div>
            {loggedIn ? (
            <div className="logoutButton">
                <Link className="logout-button text-button-no-underline" onClick={logout} to='/login'>{props.logoutButton}</Link>
               
            </div>
            ) : (
            <div className="logoutButton">
                <Link className="logout-button text-button-no-underline" to='/login'>{props.loginButton}</Link>
                <Link className="logout-button text-button-no-underline" to='/register'>{props.registerButton}</Link>
            </div>)}
        </header>
    </div>
    )
}

async function logout(){
    localStorage.clear();
    window.location.reload(false);
}
