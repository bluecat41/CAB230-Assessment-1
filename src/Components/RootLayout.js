import Header from "./Header.js";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"

export default function RootLayout(){
    const loginButton = "Login";
    const registerButton = "Register";

    return(
        <div className="root-layout">
            <Header loginButton={loginButton} registerButton={registerButton}/>
            <div className="flexBoxRowGrow">
                <Navbar />
                <main className="main-container">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

