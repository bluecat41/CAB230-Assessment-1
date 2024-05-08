import Header from "./Header.js";
import { Outlet, Link } from "react-router-dom";

export default function RootLayout(){
    const logoutButton = "Login";

    return(
        <div className="root-layout">
            <Header logoutButton={logoutButton}/>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

