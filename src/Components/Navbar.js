import NavButton from "./NavButton";

export default function Navbar() {
    // Displays navbar on left side of page
    return (
        <div className="navbar flexBoxRow">
            <div className="flexBoxColumnGrow">
                <NavButton name="Home" to="/" />
                <NavButton name="Volcanoes" to="/VolcanoList" />
            </div>
        </div>
    )
}