export default function UserPage() {
    // Returns landing page of the app
    return (
        <div className="flexBoxColumnGrow landing-page background column-center">
            <div className="flexBowColumnGrow column-center">
                <h1 className="greeting column-center">User Page.</h1>
            </div>
            <p style={{maxWidth:"600px", fontSize:"18px"}}><center>This page will show your video files!</center></p>
        </div>
    )
}