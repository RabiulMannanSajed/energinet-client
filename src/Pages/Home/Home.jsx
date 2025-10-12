import Overview from "./Overview/Overview";
import EnergyForecast from "./EnergyForecast/EnergyForecast";
import GridConnection from "./GridConnection/GridConnection";
import ForecastChart from "./Forcast/ForecastChart";
import WalletBalance from "./WalletBalance/WalletBalance";

const Home = () => {
  return (
    <div className="bg-gray-900">
      <h2 className="text-white text-2xl mb-5">Dashboard</h2>
      <div className="flex  gap-6 p-6">
        <div className="flex-1 space-y-6">
          <Overview />
          <EnergyForecast />
          <ForecastChart></ForecastChart>
        </div>
        <div className="w-[30%]">
          <GridConnection />
          <WalletBalance />
        </div>
      </div>
    </div>
  );
};

export default Home;
