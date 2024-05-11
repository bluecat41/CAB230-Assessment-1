export default function DropDownSelect({ selected, setSelected, selectedRadius, setSelectedRadius, country }) {
    // Function for selection options
    const Item = function (value) {
        return (
            <>
                <option className="select-menu">{value}</option>
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
    // Returns drop down select component
    return (
        <div className="flexBoxRow">
            <p>Country: </p>
            {country.length ? (
                <select className="select-menu" onChange={(e) => {
                    selected = e.target.value;
                    setSelected(selected);
                    setSelectedRadius("");
                }}
                > 
                    <option></option>
                    {country.map(Item)}
                </select>) : <p className="error-message" style={{ marginLeft: "10px", marginRight: "10px" }}>Something went wrong. Please try again later.</p>}
            <p>Populated within:</p>
            <select className="select-menu" onChange={(e) => {
                selectedRadius = e.target.value;
                setSelectedRadius(selectedRadius);
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