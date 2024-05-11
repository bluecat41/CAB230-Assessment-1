import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header(props) {
     // Button text for header
     const loginButton = "Login";
     const registerButton = "Register";
     const logoutButton = "Logout";

    //State to see if a user is logged in
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

    // To set state of logged in user
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false)
        }
    }, [])

    // Returns the header, includes ternary operator to swap out logout/login buttons depending on login status of user
    return (
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
                        <Link className="logout-button lexend text-button-no-underline" onClick={logout}>{logoutButton}</Link>

                    </div>
                ) : (
                    <div className="logoutButton">
                        <Link className="logout-button lexend text-button-no-underline" to='/login'>{loginButton}</Link>
                        <Link className="logout-button lexend text-button-no-underline" to='/register'>{registerButton}</Link>
                    </div>)}
            </header>
        </div>
    )
}

// Function to log user out of app
async function logout() {
    localStorage.clear();
    window.location.reload(false);
}
