import { Link } from "react-router-dom";

export default function Navbar(props) {

    return(
        <div className="navbar flexBoxRow">
            <div className="flexBoxColumnGrow">
                <NavButton name={"Home"} to={"/"}/>
                <NavButton name={"Volcano List"} to={"/VolcanoList"}/>
            </div>
        </div>
    )
}

function NavButton(props){
    return(
        <div>
            <Link className="lexend nav-button text-button-no-underline" to={props.to}>
                {props.name}
            </Link>
        </div>
    )
}

