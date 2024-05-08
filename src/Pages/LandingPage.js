import{ Link } from "react-router-dom";

export default function LandingPage() {
    return(
        <div className="flexBoxColumnGrow landing-page column-center">
            <div>
                <img className="landing-image" alt="volcano-image" />
            </div>
            <div>
                <h1 className="greeting">Welcome.</h1>
            </div>
            <div className="login-button-div">
                <Link to="/login" className="login-button">
                    Login
                </Link>
            </div>
            <div className="register-here-text flexBoxColumnGrow">
                <p className="new-user"> New user? </p> 
                <p> Please register&nbsp;
                    <Link to="/register" className="here-button">
                        here 
                    </Link> 
                    &nbsp;to view Volcanoes of the World.
                </p>
            </div>
        </div>
    )
}