import { useQuery } from "@tanstack/react-query";

const useDeletedCourses = () => {
  const {
    isPending,
    data: deletedCourses = [],
    refetch,
  } = useQuery({
    queryKey: ["deletedCourses"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/courses/get-all-deleted-courses`
      );
      return res.json();
    },
  });
  return [deletedCourses, refetch, isPending];
};

export default useDeletedCourses;
