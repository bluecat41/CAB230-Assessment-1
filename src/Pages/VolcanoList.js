import { useLoaderData, Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import { useState, useEffect } from "react";

export default function VolcanoList() {

    // State to set the table with volcano data
    const [rowData, setRowData ] = useState([]);

    // Columns of the table
    const columns = [
        { headerName: "Name", field: "name" },
        { headerName: "Region", field: "region" },
        { headerName: "Subregion", field: "subregion" },
      ];

    // Load countries data into the drop down select menu using loader function
    const countries = useLoaderData();

    // Set state for country selected from drop down menu
    const [selected, setSelected] = useState(false);

    // Get volcano data based on selected country and load into the table
    useEffect(() => {
        fetch("http://4.237.58.241:3000/volcanoes?country=" + selected)
        .then(res => res.json())
        .then(data => (data = Array.from(data)))
        .then(data =>
            data.map(volcano => {
                return {
                    name: volcano.name,
                     region: volcano.region,
                     subregion: volcano.subregion
                 };
            })
        )
        .then(volcanos => setRowData(volcanos));
    }, [selected]);

      // Set state for radius selected from drop down menu
      const [selectedRadius, setSelectedRadius] = useState("");

    // Get volcano data based on selected country and load into the table
    useEffect(() => {
        fetch("http://4.237.58.241:3000/volcanoes?country=" + selected + "&populatedWithin=" + selectedRadius)
        .then(res => res.json())
        .then(data => (data = Array.from(data)))
        .then(data => 
            data.map(volcano => {
                return {
                    name: volcano.name,
                     region: volcano.region,
                     subregion: volcano.subregion
                 };
            })
        )
        .then(volcanos => setRowData(volcanos));
    }, [selectedRadius]);



    return(
        <div className="flexBoxColumnGrow column-center background volcano-list">
            <h1>Volcano List</h1>
            <DropDownSelect 
                country={countries} 
                selected={selected} 
                setSelected={setSelected} 
                selectedRadius={selectedRadius} 
                setSelectedRadius={setSelectedRadius}
            />
            {selectedRadius}
            <div className="ag-theme-balham" style={{ height: "300px", width: "600px" }}>
            <AgGridReact
                columnDefs={columns}
                rowData={rowData}
                pagination={true}
                paginationPageSize={10}
            />
            </div>
        </div>
    )
}

// Loader function
export const countriesLoader = async () => {
    const res = await fetch('http://4.237.58.241:3000/countries')

    return res.json()
}



function DropDownSelect({ selected, setSelected, selectedRadius, setSelectedRadius, country }){
    const Item = function(x) {
        return (<>
            <option>{x}</option>
            </>
        )
    };

    const radius = [
        "5km",
        "10km",
        "30km",
        "100km"
    ]

    return(
        <div className="flexBoxRow">
        <p>Country:</p>
        <select className="select-menu" onChange={(e) => {
            selected=e.target.value;
            setSelected(selected);
            setSelectedRadius("");
            }}
        >
            <option></option>
            {country.map(Item)}
        </select>
        <p>Populated within:</p>
        <select className="select-menu" onChange={(e) => {
            selectedRadius=e.target.value;
            setSelectedRadius(selectedRadius)
            }}
        >
            <option></option>
            {radius.map(Item)}
        </select>
        </div>
    )
}