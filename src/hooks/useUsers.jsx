import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const {
    isPending,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/users/get-all-users`
      );
      return res.json();
    },
  });
  return [users, refetch, isPending];
};

export default useUsers;
