import { Link } from "react-router-dom";

export default function Header(props) {
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
            <div className="logoutButton">
                <Link className="logoutButton text-button-no-underline" to='/login'>{props.loginButton}</Link>|&nbsp;&nbsp;
                <Link className="logoutButton text-button-no-underline" to='/register'>{props.registerButton}</Link>
            </div>
        </header>
    </div>
    )
}

/*
                <nav>
                    <ul>
                        <li><Link to="/home/account" onClick={() => props.setLanding(true)}>{props.accountButton}</Link></li>
                        <li><Link to='/login' onClick={logout}>{props.logoutButton}</Link></li>
                    </ul>
                </nav>
*/
