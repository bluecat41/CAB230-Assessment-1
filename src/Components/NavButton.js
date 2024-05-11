import { Link } from "react-router-dom"

export default function NavButton(props) {
    // Button for navbar
    return (
        <div>
            <Link className="lexend nav-button text-button-no-underline" to={props.to}>
                {props.name}
            </Link>
        </div>
    )
}