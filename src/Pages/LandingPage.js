export default function LandingPage() {
    // Returns landing page of the app
    return (
        <div className="flexBoxColumnGrow landing-page background column-center">
            <div>
                <img className="landing-image" alt="volcano-image" />
            </div>
            <div className="flexBowColumnGrow column-center">
                <h1 className="greeting column-center">Welcome.</h1>
            </div>
            <p style={{maxWidth:"600px", fontSize:"18px"}}><center>This application provides data of volcanoes from all around the world. 
            Click on the Volcanoes button in the navigation bar to get started!</center></p>
        </div>
    )
}