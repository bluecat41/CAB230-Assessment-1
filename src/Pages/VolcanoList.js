import { useLoaderData, useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import { useState, useEffect } from "react";

export default function VolcanoList() {
    const [ errorResponse, setErrorResponse ] = useState("");

    // Router function
    const navigate = useNavigate();

    // State to set the table with volcano data
    const [rowData, setRowData ] = useState([]);    

    // Columns of the table
    const columns = [
        { headerName: "ID", field: "id", hide: true },
        { headerName: "Name", field: "name", filter: true },
        { headerName: "Region", field: "region", filter: true },
        { headerName: "Subregion", field: "subregion", filter: true },
      ];

    // Load countries data into the drop down select menu using loader function
    const countries = useLoaderData();

    // Set state for country selected from drop down menu
    const [selected, setSelected] = useState(false);

    // Fetch volcano data based on selected country and load into the table
    useEffect(() => {
        fetch("http://4.237.58.241:3000/volcanoes?country=" + selected)
        .then(res => res.json())
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
            return error;
        });;
    }, [selected]);

    // Set state for radius selected from drop down menu
    const [selectedRadius, setSelectedRadius] = useState("");

    // Fetch volcano data based on selected country and selected radius and load into the table
    useEffect(() => {
        fetch("http://4.237.58.241:3000/volcanoes?country=" + selected + "&populatedWithin=" + selectedRadius)
        .then(res =>  {
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

    return(
        <div className="flexBoxColumnGrow column-center background volcano-list">
            <h1 className="greeting-colour">Volcano List</h1>
            <DropDownSelect 
                country={countries} 
                selected={selected} 
                setSelected={setSelected} 
                selectedRadius={selectedRadius} 
                setSelectedRadius={setSelectedRadius}
            />
            <div>
                {(rowData.length === 1) ? <p>1 volcano matched your search.</p>: <p>{rowData.length} volcanoes matched your search.</p>}
            </div>
            {errorResponse
                            && (
                                <div className="error-message" style={{paddingBottom:"10px"}}>
                                    {errorResponse}
                                </div>
                            )}
            <div className="ag-theme-balham" style={{ height: "335px", width: "800px" }}>
            <AgGridReact
                columnDefs={columns}
                rowData={rowData}
                pagination={true}
                paginationPageSize={10}
                onRowClicked={(row) => navigate(`/volcano?id=${row.data.id}`)}
            />
            </div>
        </div>
    )
}

// Loader function
export async function countriesLoader(){
    return fetch('http://4.237.58.241:3000/countries')
        .then(res => {
            if (!res.ok) {
                throw new Error("Something went wrong.")
            } else {
            return res.json()
            }
        })
        .then(res => {
            return res;
        }).catch(error => {
            console.log(error)
            return error;
        })
}

// Drop down component
function DropDownSelect({ selected, setSelected, selectedRadius, setSelectedRadius, country }){
    // Function for selection options
    const Item = function(x) {
        return (<>
            <option className="select-menu">{x}</option>
            </>
        )
    };

    // Array of radius options
    const radius = [
        "5km",
        "10km",
        "30km",
        "100km"
    ]

    return(
        <div className="flexBoxRow">
        <p>Country: </p>
        {country.length ? (
        <select className="select-menu" onChange={(e) => {
            selected=e.target.value;
            setSelected(selected);
            }}
        >
            <option></option>
                {country.map(Item)}
        </select>) : <p className="error-message" style={{marginLeft: "10px", marginRight: "10px"}}>Something went wrong. Please try again later.</p>}
        <p>Populated within:</p>
        <select className="select-menu" onChange={(e) => {
            selectedRadius=e.target.value;
            setSelectedRadius(selectedRadius)
            }}
        >
            <option></option>
            {radius.length && 
            radius.map(Item)
            }
        </select>
        </div>
    )
}