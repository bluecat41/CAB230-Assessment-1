import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="flexBoxColumnGrow error-page">
            <h1 className="error-title">Sorry, 404 Error</h1>
            <h2>The page you are looking for cannot be found.</h2>
            <p>Go back or please try our <Link className="text-button-underline error-home-button" to="/">home</Link> page instead.</p>
        </div>
    )
}