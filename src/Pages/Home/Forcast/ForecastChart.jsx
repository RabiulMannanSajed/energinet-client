import React, { useEffect, useState } from "react";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import { Line } from "react-chartjs-2";
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

        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&cnt=20&units=metric&appid=${WEATHER_API_KEY}`
        );

        const weatherData = weatherRes.data.list.map((w) => ({
          temp: w.main.temp,
          humidity: w.main.humidity,
          dt: w.dt_txt,
        }));

        // Helper to train + forecast
        const trainAndForecast = async (energyArray) => {
          if (energyArray.length < 3) return [];

          const X = energyArray.map((e, i) => [
            e,
            weatherData[i % weatherData.length].temp,
            weatherData[i % weatherData.length].humidity,
          ]);

          const y = energyArray
            .slice(1)
            .concat(energyArray[energyArray.length - 1]);
          const xs = tf.tensor2d(X.slice(0, -1), [X.length - 1, 3]);
          const ys = tf.tensor2d(y.slice(0, -1), [y.length - 1, 1]);

          // Build simple model
          const model = tf.sequential();
          model.add(
            tf.layers.dense({ units: 16, activation: "relu", inputShape: [3] })
          );
          model.add(tf.layers.dense({ units: 8, activation: "relu" }));
          model.add(tf.layers.dense({ units: 1 }));
          model.compile({ optimizer: "adam", loss: "meanSquaredError" });

          await model.fit(xs, ys, { epochs: 150, verbose: 0 });

          // Predict 7 days
          const futureX = weatherData.map((w) => [
            energyArray[energyArray.length - 1],
            w.temp,
            w.humidity,
          ]);

          const preds = model.predict(
            tf.tensor2d(futureX, [futureX.length, 3])
          );
          return Array.from(preds.dataSync());
        };

        // 4️⃣ Train and predict for both
        const forecastSold = await trainAndForecast(soldEnergy);
        const forecastProduced = await trainAndForecast(producedEnergy);

        const forecastLabels = weatherData.map((w) =>
          new Date(w.dt).toLocaleDateString("en-US", { weekday: "short" })
        );

        // 5️⃣ Chart data setup
        setChartData({
          labels: [...dates, ...forecastLabels],
          datasets: [
            {
              label: "Historical Produced Energy",
              data: producedEnergy,
              borderColor: "#22c55e", // Bright green
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              tension: 0.4,
            },
            {
              label: "Produced Energy Forecast",
              data: [
                ...Array(producedEnergy.length).fill(null),
                ...forecastProduced,
              ],
              borderColor: "#4ade80", // Soft lime green
              backgroundColor: "rgba(74, 222, 128, 0.15)",
              borderDash: [6, 6],
              tension: 0.4,
            },
            {
              label: "Historical Sold Energy",
              data: soldEnergy,
              borderColor: "#3b82f6", // Blue
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              tension: 0.4,
            },
            {
              label: "Sold Energy Forecast",
              data: [...Array(soldEnergy.length).fill(null), ...forecastSold],
              borderColor: "#60a5fa", // Light blue
              backgroundColor: "rgba(96, 165, 250, 0.15)",
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
        }}
      />
    </div>
  );
}
