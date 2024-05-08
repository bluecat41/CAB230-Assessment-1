import { Link } from "react-router-dom";

export default function ErrorPage() {
    return(
        <div className="flexBoxColumnGrow">
            <h1>404</h1>
            <p>Go to the <Link to="/">Homepage</Link></p>
        </div>
    )
}