import Header from "./Header.js";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function RootLayout() {
   /* Setting the root layout for the app. Header, Navbar and Footer 
    are always displayed. */
    return (
        <div className="root-layout">
            <Header />
            <div className="flexBoxRowGrow">
                <Navbar />
                <main className="flexBoxRowGrow main-container">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )
}

