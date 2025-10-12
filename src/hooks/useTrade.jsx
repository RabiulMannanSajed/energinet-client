import { useQuery } from "@tanstack/react-query";

const useTrade = () => {
  const {
    isPending,
    data: treads = [],
    refetch,
  } = useQuery({
    queryKey: ["treads"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/energinet/treadEnergy/get-all-treads"
      );
      return res.json();
    },
  });
  return [treads, refetch, isPending];
};

export default useTrade;
