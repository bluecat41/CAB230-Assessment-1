import NavButton from "./NavButton";

export default function Navbar() {
    // Displays navbar on left side of page
    return (
        <div className="navbar flexBoxRow">
            <div className="flexBoxColumnGrow">
                <NavButton name="Home" to="/" />
                <NavButton name="Upload" to="/Upload" />
                <NavButton name="User" to="/User" />
            </div>
        </div>
    )
}