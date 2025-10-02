import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ForecastChart() {
  const [historical, setHistorical] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Get historical tread data
      const histRes = await axios.get(
        "http://localhost:5000/api/v1/energinet/treadEnergy/get-all-treads"
      );
      const histData = histRes.data;
      setHistorical(histData);

      // 2. Forecast in frontend (next 7 days)
      const values = histData.map((item) => item.sellEnergyAmount);

      if (values.length > 1) {
        const diffs = values.slice(1).map((v, i) => v - values[i]); // differences between consecutive points
        const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;

        let lastValue = values[values.length - 1];
        const forecastData = [];

        for (let i = 1; i <= 7; i++) {
          lastValue += avgDiff;
          forecastData.push({
            day: i,
            forecastSellEnergyAmount: Math.max(lastValue, 0),
          });
        }

        setForecast(forecastData);
      }
    };

    fetchData();
  }, []);

  // Prepare labels (historical dates + forecast days)
  const labels = [
    ...historical.map((item) => new Date(item.createdAt).toLocaleDateString()),
    ...forecast.map((f) => `Day +${f.day}`),
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Historical Sell Energy Amount",
        data: historical.map((item) => item.sellEnergyAmount),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
      {
        label: "Forecasted Sell Energy Amount",
        data: [
          ...new Array(historical.length).fill(null), // keep space for history
          ...forecast.map((f) => f.forecastSellEnergyAmount),
        ],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderDash: [5, 5],
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sell Energy Amount Forecast (Next 7 Days)",
      },
    },
  };

  return (
    <div className="p-6 bg-white/5 rounded-xl shadow-lg">
      <Line data={data} options={options} />
    </div>
  );
}
