// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import * as tf from "@tensorflow/tfjs";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function EnergyForecast() {
//   const [chartData, setChartData] = useState(null);
//   const WEATHER_API_KEY = "802503a066b3ee16122a59e19158b3c3";
//   const LAT = 23.8285;
//   const LON = 90.3826;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 1️⃣ Fetch trades
//         const tradesRes = await axios.get(
//           "http://localhost:5000/api/v1/energinet/treadEnergy/get-all-treads"
//         );
//         const trades = tradesRes.data;

//         const soldTrades = trades.filter((t) => t.status === "sold");
//         const allProduced = trades;

//         const soldEnergy = soldTrades.map((t) => t.sellEnergyAmount);
//         const producedEnergy = allProduced.map((t) => t.sellEnergyAmount);
//         const dates = allProduced.map((t) =>
//           new Date(t.createdAt).toLocaleDateString()
//         );

//         const weatherRes = await axios.get(
//           `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&cnt=20&units=metric&appid=${WEATHER_API_KEY}`
//         );

//         const weatherData = weatherRes.data.list.map((w) => ({
//           temp: w.main.temp,
//           humidity: w.main.humidity,
//           dt: w.dt_txt,
//         }));

//         // Helper to train + forecast
//         const trainAndForecast = async (energyArray) => {
//           if (energyArray.length < 3) return [];

//           const X = energyArray.map((e, i) => [
//             e,
//             weatherData[i % weatherData.length].temp,
//             weatherData[i % weatherData.length].humidity,
//           ]);

//           const y = energyArray
//             .slice(1)
//             .concat(energyArray[energyArray.length - 1]);
//           const xs = tf.tensor2d(X.slice(0, -1), [X.length - 1, 3]);
//           const ys = tf.tensor2d(y.slice(0, -1), [y.length - 1, 1]);

//           // Build simple model
//           const model = tf.sequential();
//           model.add(
//             tf.layers.dense({ units: 16, activation: "relu", inputShape: [3] })
//           );
//           model.add(tf.layers.dense({ units: 8, activation: "relu" }));
//           model.add(tf.layers.dense({ units: 1 }));
//           model.compile({ optimizer: "adam", loss: "meanSquaredError" });

//           await model.fit(xs, ys, { epochs: 150, verbose: 0 });

//           // Predict 7 days
//           const futureX = weatherData.map((w) => [
//             energyArray[energyArray.length - 1],
//             w.temp,
//             w.humidity,
//           ]);

//           const preds = model.predict(
//             tf.tensor2d(futureX, [futureX.length, 3])
//           );
//           return Array.from(preds.dataSync());
//         };

//         // 4️⃣ Train and predict for both
//         const forecastSold = await trainAndForecast(soldEnergy);
//         const forecastProduced = await trainAndForecast(producedEnergy);

//         const forecastLabels = weatherData.map((w) =>
//           new Date(w.dt).toLocaleDateString("en-US", { weekday: "short" })
//         );

//         // 5️⃣ Chart data setup
//         setChartData({
//           labels: [...dates, ...forecastLabels],
//           datasets: [
//             {
//               label: "Historical Produced Energy",
//               data: producedEnergy,
//               borderColor: "#22c55e", // Bright green
//               backgroundColor: "rgba(34, 197, 94, 0.2)",
//               tension: 0.4,
//             },
//             {
//               label: "Produced Energy Forecast",
//               data: [
//                 ...Array(producedEnergy.length).fill(null),
//                 ...forecastProduced,
//               ],
//               borderColor: "#4ade80", // Soft lime green
//               backgroundColor: "rgba(74, 222, 128, 0.15)",
//               borderDash: [6, 6],
//               tension: 0.4,
//             },
//             {
//               label: "Historical Sold Energy",
//               data: soldEnergy,
//               borderColor: "#3b82f6", // Blue
//               backgroundColor: "rgba(59, 130, 246, 0.2)",
//               tension: 0.4,
//             },
//             {
//               label: "Sold Energy Forecast",
//               data: [...Array(soldEnergy.length).fill(null), ...forecastSold],
//               borderColor: "#60a5fa", // Light blue
//               backgroundColor: "rgba(96, 165, 250, 0.15)",
//               borderDash: [6, 6],
//               tension: 0.4,
//             },
//           ],
//         });
//       } catch (err) {
//         console.error("Error fetching or predicting energy:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!chartData)
//     return (
//       <div className="p-6 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-xl shadow-lg text-center">
//         <p className="text-lg font-medium animate-pulse">
//           ⏳ Training AI model, please wait...
//         </p>
//       </div>
//     );

//   return (
//     <div className="p-6 bg-gradient-to-br from-green-900 via-green-800 to-blue-900 rounded-2xl shadow-2xl text-white">
//       <h2 className="text-2xl font-bold mb-4">
//         ⚡ AI Forecast of Energy Production & Sales
//       </h2>
//       <Line
//         data={chartData}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: {
//               position: "top",
//               labels: { color: "#e0e0e0", font: { size: 13 } },
//             },
//           },
//           scales: {
//             x: {
//               grid: { color: "rgba(255,255,255,0.1)" },
//               ticks: { color: "#ccc" },
//             },
//             y: {
//               grid: { color: "rgba(255,255,255,0.1)" },
//               ticks: { color: "#ccc" },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import { Line } from "react-chartjs-2";
import Swal from "sweetalert2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function EnergyForecast() {
  const [chartData, setChartData] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const WEATHER_API_KEY = "802503a066b3ee16122a59e19158b3c3";
  const LAT = 23.8285;
  const LON = 90.3826;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch trades
        const tradesRes = await axios.get(
          "http://localhost:5000/api/v1/energinet/treadEnergy/get-all-treads"
        );
        const trades = tradesRes.data;

        const soldTrades = trades.filter((t) => t.status === "sold");
        const allProduced = trades;

        const soldEnergy = soldTrades.map((t) => t.sellEnergyAmount);
        const producedEnergy = allProduced.map((t) => t.sellEnergyAmount);
        const dates = allProduced.map((t) =>
          new Date(t.createdAt).toLocaleDateString()
        );

        // 2️⃣ Fetch weather data
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&cnt=20&units=metric&appid=${WEATHER_API_KEY}`
        );

        const weatherList = weatherRes.data.list.map((w) => ({
          temp: w.main.temp,
          feels_like: w.main.feels_like,
          humidity: w.main.humidity,
          pressure: w.main.pressure,
          wind_speed: w.wind.speed,
          weather: w.weather[0].main,
          description: w.weather[0].description,
          icon: w.weather[0].icon,
          date: w.dt_txt,
        }));
        setWeatherData(weatherList);

        // 3️⃣ Train + Forecast (your original code unchanged)
        const trainAndForecast = async (energyArray) => {
          if (energyArray.length < 3) return [];

          const X = energyArray.map((e, i) => [
            e,
            weatherList[i % weatherList.length].temp,
            weatherList[i % weatherList.length].humidity,
          ]);
          const y = energyArray
            .slice(1)
            .concat(energyArray[energyArray.length - 1]);
          const xs = tf.tensor2d(X.slice(0, -1), [X.length - 1, 3]);
          const ys = tf.tensor2d(y.slice(0, -1), [y.length - 1, 1]);

          const model = tf.sequential();
          model.add(
            tf.layers.dense({ units: 16, activation: "relu", inputShape: [3] })
          );
          model.add(tf.layers.dense({ units: 8, activation: "relu" }));
          model.add(tf.layers.dense({ units: 1 }));
          model.compile({ optimizer: "adam", loss: "meanSquaredError" });
          await model.fit(xs, ys, { epochs: 150, verbose: 0 });

          const futureX = weatherList.map((w) => [
            energyArray[energyArray.length - 1],
            w.temp,
            w.humidity,
          ]);
          const preds = model.predict(
            tf.tensor2d(futureX, [futureX.length, 3])
          );
          return Array.from(preds.dataSync());
        };

        const forecastSold = await trainAndForecast(soldEnergy);
        const forecastProduced = await trainAndForecast(producedEnergy);
        const forecastLabels = weatherList.map((w) =>
          new Date(w.date).toLocaleDateString("en-US", { weekday: "short" })
        );

        setChartData({
          labels: [...dates, ...forecastLabels],
          datasets: [
            {
              label: "Historical Produced Energy",
              data: producedEnergy,
              borderColor: "#22c55e",
              backgroundColor: "rgba(34,197,94,0.2)",
              tension: 0.4,
            },
            {
              label: "Produced Energy Forecast",
              data: [
                ...Array(producedEnergy.length).fill(null),
                ...forecastProduced,
              ],
              borderColor: "#4ade80",
              backgroundColor: "rgba(74,222,128,0.15)",
              borderDash: [6, 6],
              tension: 0.4,
            },
            {
              label: "Historical Sold Energy",
              data: soldEnergy,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59,130,246,0.2)",
              tension: 0.4,
            },
            {
              label: "Sold Energy Forecast",
              data: [...Array(soldEnergy.length).fill(null), ...forecastSold],
              borderColor: "#60a5fa",
              backgroundColor: "rgba(96,165,250,0.15)",
              borderDash: [6, 6],
              tension: 0.4,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching or predicting energy:", err);
      }
    };

    fetchData();
  }, []);

  if (!chartData)
    return (
      <div className="p-6 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-xl shadow-lg text-center">
        <p className="text-lg font-medium animate-pulse">
          ⏳ Training AI model, please wait...
        </p>
      </div>
    );

  // 🌦️ Show detailed weather info when clicking a point
  const handleChartClick = (event, elements) => {
    if (!elements.length) return;
    const { datasetIndex, index } = elements[0];
    const dataset = chartData.datasets[datasetIndex];
    const label = chartData.labels[index];
    const value = dataset.data[index];
    const weather = weatherData[index % weatherData.length];

    if (!weather) return;

    Swal.fire({
      title: "🌤️ Forecast Details",
      html: `
        <div style="text-align:left; font-size:15px;">
          <strong>Date:</strong> ${label}<br/>
          <strong>Energy Type:</strong> ${dataset.label}<br/>
          <strong>Predicted Energy:</strong> ${value?.toFixed(2)} kWh<br/><br/>
          <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" 
            alt="Weather icon" style="width:70px;height:70px;float:right;margin-top:-50px;">
          <strong>Weather:</strong> ${weather.weather} (${
        weather.description
      })<br/>
          🌡️ <strong>Temp:</strong> ${weather.temp}°C (Feels like ${
        weather.feels_like
      }°C)<br/>
          💧 <strong>Humidity:</strong> ${weather.humidity}%<br/>
          🧭 <strong>Pressure:</strong> ${weather.pressure} hPa<br/>
          🌬️ <strong>Wind:</strong> ${weather.wind_speed} m/s<br/>
        </div>
      `,
      confirmButtonText: "Close",
      confirmButtonColor: "#22c55e",
      background: "#0f172a",
      color: "#f1f5f9",
      width: 450,
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-900 via-green-800 to-blue-900 rounded-2xl shadow-2xl text-white">
      <h2 className="text-2xl font-bold mb-4">
        ⚡ AI Forecast of Energy Production & Sales
      </h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: { color: "#e0e0e0", font: { size: 13 } },
            },
          },
          scales: {
            x: {
              grid: { color: "rgba(255,255,255,0.1)" },
              ticks: { color: "#ccc" },
            },
            y: {
              grid: { color: "rgba(255,255,255,0.1)" },
              ticks: { color: "#ccc" },
            },
          },
          onClick: (event, elements) => handleChartClick(event, elements),
        }}
      />
    </div>
  );
}
