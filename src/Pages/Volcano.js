import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../Functions/loaderFunctions.js";
import BarChart from "../Components/BarChart.js";
import VolcanoMap from "../Components/VolcanoMap.js";


export default function Volcano() {
    // Router functions
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Setting the state to store the volcano and density data
    const [volcano, setVolcano] = useState([]);
    const [density, setDensity] = useState([]);

    // Setting the state to show errors
    const [errorResponse, setErrorResponse] = useState("");

    // Getting ID number from URL
    const id = searchParams.get("id");

    // Fetch volcano data based on ID - user not logged in
    async function getVolcanoUnauth() {
        return fetch(BASE_URL + "/volcano/" + id)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong.")
                } else {
                    setErrorResponse("");
                    return res.json()
                }
            })
            .then(res => {
                return res;
            })
            .catch(error => {
                setErrorResponse("Something went wrong, please try again later.");
                return error;
            })
    }

    // Load the volcano data on render and put data into state
    useEffect(() => {
        getVolcanoUnauth().then(res => {
            setVolcano(res);
        })
    }, []);

    // Get volcano data for logged in user (population density)
    async function getVolcanoAuth() {
        return fetch(BASE_URL + "/volcano/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then(res => {
            if (res.status === 401) {
                setErrorResponse("Please login to view population density data.")
            } else if (!res.ok) {
                throw new Error("Something went wrong.")
            } else {
                setErrorResponse("");
                return res.json()
            }
        })
            .then(res => {
                return res;
            })
            .catch(error => {
                setErrorResponse("Population density data is currently unavailable, please try again later.");
                return error;
            })
    }

    // Load the population density data on render and put data into state
    useEffect(() => {
        getVolcanoAuth().then(res => {
            setDensity(res);
        })
    }, []);

    // Check for token and set in state if authenticated
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false)
        }
    }, [])
    // Returns the queried volcano data, includes ternary operator to show population density if user is logged in
    return (
        <div className="flexBoxColumnGrow">
            <div className="flexBoxRowGrow volcano background">
                <div className="flexBoxColumnGrow column-center volcano-left">
                    <h3 className="greeting-colour volcano-name" style={{ "paddingLeft": "20px" }}>{volcano.name}</h3>
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
                    {errorResponse
                        ? (
                            <div className="error-message" style={{ paddingTop: "20px" }}>
                                {errorResponse}
                            </div>
                        ) : null}
                </div>
                <div className="flexBoxColumnGrow column-center">
                    <h3 className="greeting-colour">Location</h3>
                    <VolcanoMap latitude={volcano.latitude} longitude={volcano.longitude} />
                </div>
            </div>
            {loggedIn ?
                <BarChart data1={density.population_5km} data2={density.population_10km} data3={density.population_30km} data4={density.population_100km} />
                : null
            }
        </div>
    )
}