import { SlEnergy } from "react-icons/sl";
import useTrade from "../../../../hooks/useTrade";

const TradeEng = () => {
  const [treads] = useTrade();
  const totalSoldEnergy =
    treads
      ?.filter((trade) => trade.status === "sold")
      ?.reduce((acc, trade) => acc + trade.price, 0) || 0;

  // ✅ Total Produced Energy (all trades)
  const totalProducedEnergy =
    treads?.reduce((acc, trade) => acc + trade.sellEnergyAmount, 0) || 0;
  return (
    <div className="flex  gap-4">
      <div
        className="
                bg-white/5
                backdrop-blur-md
                border
                border-white/20
                rounded-2xl
                shadow-lg
                p-8
                text-white
                z-10
           "
      >
        <h2 className="text-xl">Total Energy Produce</h2> <br />
        <div className="flex items-center gap-2">
          <p className="text-2xl">{totalProducedEnergy}</p>{" "}
          <SlEnergy className="text-yellow-300 text-2xl font-bold" />
        </div>
      </div>
      <div
        className="
                bg-white/5
                backdrop-blur-md
                border
                border-white/20
                rounded-2xl
                shadow-lg
                p-8
                text-white
                z-10
           "
      >
        <h2 className="text-xl">Total Energy Treaded </h2> <br />
        <p className="text-2xl">{totalSoldEnergy} ৳</p>
      </div>
    </div>
  );
};

export default TradeEng;
