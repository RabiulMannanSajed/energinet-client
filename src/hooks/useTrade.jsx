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
        `${import.meta.env.VITE_URL}/treadEnergy/get-all-treads`
      );
      return res.json();
    },
  });
  return [treads, refetch, isPending];
};

export default useTrade;
