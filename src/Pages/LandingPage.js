export default function LandingPage() {
    // Returns landing page of the app
    return (
        <div className="flexBoxColumnGrow landing-page background column-center">
            <div className="flexBowColumnGrow column-center">
                <h1 className="greeting column-center">Welcome.</h1>
            </div>
            <p style={{maxWidth:"600px", fontSize:"18px"}}><center>This application will transcode video files!</center></p>
        </div>
    )
}