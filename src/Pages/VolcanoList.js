import { useLoaderData, useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useState, useEffect } from "react";
import { BASE_URL } from "../Functions/loaderFunctions.js";
import DropDownSelect from "../Components/DropDownSelect.js";

export default function VolcanoList() {
     // Setting the state to show errors
    const [errorResponse, setErrorResponse] = useState("");

    // Router function
    const navigate = useNavigate();

    // State to set the table with volcano data
    const [rowData, setRowData] = useState([]);

    // Columns of the table
    const columns = [
        { headerName: "ID", field: "id", hide: true },
        { headerName: "Name", field: "name", filter: true },
        { headerName: "Region", field: "region", filter: true },
        { headerName: "Subregion", field: "subregion", filter: true, flex: 2 },
    ];

    // Load countries data into the drop down select menu using loader function
    const countries = useLoaderData();

    // Set state for country selected from drop down menu
    const [selected, setSelected] = useState(false);

    // Fetch volcano data based on selected country and load into the table
    useEffect(() => {
        fetch(BASE_URL + "/volcanoes?country=" + selected)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong.")
                } else {
                    setErrorResponse("")
                    return res.json()
                }
            })
            .then(data => (data = Array.from(data)))
            .then(data =>
                data.map(volcano => {
                    return {
                        id: volcano.id,
                        name: volcano.name,
                        region: volcano.region,
                        subregion: volcano.subregion
                    };
                })
            )
            .then(volcanos => setRowData(volcanos))
            .catch(error => {
                setErrorResponse("Something went wrong. Please try again later.")
                return error;
            });;
    }, [selected]);

    // Set state for radius selected from drop down menu
    const [selectedRadius, setSelectedRadius] = useState("");

    // Fetch volcano data based on selected country and selected radius and load into the table
    useEffect(() => {
        fetch(BASE_URL + "/volcanoes?country=" + selected + "&populatedWithin=" + selectedRadius)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong.")
                } else {
                    setErrorResponse("")
                    return res.json()
                }
            })
            .then(data => (data = Array.from(data)))
            .then(data =>
                data.map(volcano => {
                    return {
                        id: volcano.id,
                        name: volcano.name,
                        region: volcano.region,
                        subregion: volcano.subregion
                    };
                })
            )
            .then(volcanos => setRowData(volcanos))
            .catch(error => {
                setErrorResponse("Something went wrong. Data is not accurate. Please try again later.")
                return error;
            });
    }, [selectedRadius]);
    // Returns discover volcanoes page with table 
    return (
        <div className="flexBoxColumnGrow column-center background volcano-list">
            <h1 className="greeting-colour">Discover Volcanoes</h1>
            <p>Select a country and populated within option to view volcanoes.</p>
            <DropDownSelect
                country={countries}
                selected={selected}
                setSelected={setSelected}
                selectedRadius={selectedRadius}
                setSelectedRadius={setSelectedRadius}
            />
            <div>
                {(rowData.length === 1) ? <p>1 volcano matched your search.</p> : <p>{rowData.length} volcanoes matched your search.</p>}
            </div>
            {errorResponse
                && (
                    <div className="error-message" style={{ paddingBottom: "10px" }}>
                        {errorResponse}
                    </div>
                )}
            <div className="ag-theme-material" style={{ height: "495px", width: "800px", fontSize: "18px" }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={8}
                    paginationPageSizeSelector={[8, 20, 50]}
                    onRowClicked={(row) => navigate(`/volcano?id=${row.data.id}`)}
                />
            </div>
            <p>Want to know more? Click on a row to view more information about that volcano.</p>
        </div>
    )
}