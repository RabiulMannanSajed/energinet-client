import { useQuery } from "@tanstack/react-query";

const useCourses = () => {
  const {
    isPending,
    data: courses = [],
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/courses/get-all-courses`
      );
      return res.json();
    },
  });
  return [courses, refetch, isPending];
};

export default useCourses;
