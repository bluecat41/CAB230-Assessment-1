import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

// Registering the Chart.JS elements
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart(props) {
    const options = {};
    // The data and styling used for the bar chart
    const data = {
        labels: ["5km", "10km", "30km", "100km"],
        datasets: [
            {
                label: "Population Within",
                data: [props.data1, props.data2, props.data3, props.data4],
                backgroundColor: ["#F7E7D7"],
                borderColor: ["#D27D2D"],
                borderWidth: 2
            },
        ],
    };

    return (
        <div className="flexBoxColumnGrow background bar-chart column-center">
            <h3 className="greeting-colour">Population Density</h3>
            <div style={{ height: "495px", width: "800px" }}>
                <Bar options={options} data={data} />
            </div>
        </div>
    )
}