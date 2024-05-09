
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Volcano() {
    // Router functions
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Setting the state to store the volcano data
    const [volcano, setVolcano] = useState([]);

    // Getting ID number from URL
    const id = searchParams.get("id");

     // Fetch volcano data from API based on ID
     async function getVolcano(){
        return fetch("http://4.237.58.241:3000/volcano/" + id)
        .then(res => res.json())
        .then(res =>{
            return res;
        })
     }

     // Load the volcano data on render and put data into state
     useEffect(() => {
        getVolcano().then(res =>{
            setVolcano(res);
        })
     }, []);

    return(
        <div className="flexBoxRowGrow volcano background">
            <div className="flexBoxColumnGrow column-center volcano-left">
                <h3 className="greeting-colour volcano-name">{volcano.name}</h3>
                <ul className="volcano-details">
                    <li><b>Country:</b> {volcano.country}</li>
                    <li><b>Region:</b> {volcano.region}</li>
                    <li><b>Subregion:</b> {volcano.subregion}</li>
                    <li><b>Last Eruption:</b> {volcano.last_eruption}</li>
                    <li><b>Summit:</b> {volcano.summit}m</li>
                    <li><b>Elevation:</b> {volcano.elevation}ft</li>
                </ul>
                <button
                    className="back-button"
                    onClick={() => navigate("/volcanolist")}
                >
                    Back
                </button>
            </div>
            <div className="flexBoxColumnGrow column-center">
                <h3 className="greeting-colour">Map</h3>
            </div>
        </div>
    )
}