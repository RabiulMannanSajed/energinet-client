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

// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// // Example data (replace this with your API data)
// const rawData = [
//   {
//     status: "pending",
//     sellEnergyAmount: 10,
//     createdAt: "2025-09-20T10:51:33.215Z",
//   },
//   {
//     status: "sold",
//     sellEnergyAmount: 15,
//     createdAt: "2025-09-24T12:19:24.627Z",
//   },
//   {
//     status: "pending",
//     sellEnergyAmount: 12,
//     createdAt: "2025-09-24T12:20:23.531Z",
//   },
//   {
//     status: "pending",
//     sellEnergyAmount: 12,
//     createdAt: "2025-09-24T12:21:05.085Z",
//   },
//   {
//     status: "pending",
//     sellEnergyAmount: 25,
//     createdAt: "2025-09-28T05:20:51.150Z",
//   },
//   {
//     status: "pending",
//     sellEnergyAmount: 10,
//     createdAt: "2025-09-28T05:21:18.170Z",
//   },
//   {
//     status: "pending",
//     sellEnergyAmount: 20,
//     createdAt: "2025-09-28T05:21:56.760Z",
//   },
//   {
//     status: "sold",
//     sellEnergyAmount: 15,
//     createdAt: "2025-10-14T06:27:51.582Z",
//   },
// ];

// const ForecastChart = () => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     // Sort data by date
//     const sorted = rawData
//       .map((item) => ({
//         date: new Date(item.createdAt).toISOString().split("T")[0],
//         energy: item.sellEnergyAmount,
//       }))
//       .sort((a, b) => new Date(a.date) - new Date(b.date));

//     // --- Simple Trend Forecast (Linear Projection) ---
//     const n = sorted.length;
//     const avgEnergy = sorted.reduce((sum, d) => sum + d.energy, 0) / n;
//     const avgIndex = (n - 1) / 2;

//     // linear slope
//     const slope =
//       sorted.reduce(
//         (sum, d, i) => sum + (i - avgIndex) * (d.energy - avgEnergy),
//         0
//       ) / sorted.reduce((sum, _, i) => sum + (i - avgIndex) ** 2, 0);

//     // Predict next 5 days
//     const lastDate = new Date(sorted[sorted.length - 1].date);
//     const forecast = [];
//     for (let i = 1; i <= 5; i++) {
//       const nextDate = new Date(lastDate);
//       nextDate.setDate(lastDate.getDate() + i);
//       const nextEnergy = avgEnergy + slope * (n - 1 + i - avgIndex);
//       forecast.push({
//         date: nextDate.toISOString().split("T")[0],
//         forecast: parseFloat(nextEnergy.toFixed(2)),
//       });
//     }

//     // Combine actual + forecast
//     const combined = sorted.map((d) => ({
//       ...d,
//       forecast: null,
//     }));

//     setChartData([...combined, ...forecast]);
//   }, []);

//   return (
//     <div className="p-4 bg-white shadow-md rounded-2xl">
//       <h2 className="text-xl font-semibold mb-4 text-center text-black">
//         ⚡ Sell Energy Forecast (AI Trend)
//       </h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="energy"
//             stroke="#8884d8"
//             name="Actual"
//             strokeWidth={2}
//           />
//           <Line
//             type="monotone"
//             dataKey="forecast"
//             stroke="#82ca9d"
//             name="Forecast"
//             strokeDasharray="5 5"
//             strokeWidth={2}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ForecastChart;
