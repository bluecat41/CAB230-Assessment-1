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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart() {
    const options = {};
    const data = {
        labels: ["5km", "10km", "30km", "100km"],
        datasets: [
            {
                label: "Population Within",
                data: [400, 300, 400, 800]
            }
        ]
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