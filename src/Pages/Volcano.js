
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps"



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

     // Converting latitude and longitude values into Numbers for Map component
     const lat = volcano.latitude;
     const latNum = Number(lat);
     const lng = volcano.longitude;
     const lngNum = Number(lng);

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
                    {volcano.latitude} {volcano.longitude}
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
                <Map height={400} width={510} defaultCenter={[0, 0]} defaultZoom={1}>
                    <Marker width={50} anchor={[latNum, lngNum]} />
                </Map>
            </div>
        </div>
    )
}

