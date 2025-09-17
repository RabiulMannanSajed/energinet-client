import { useQuery } from "@tanstack/react-query";
import React from "react";

const useDeletedCourses = () => {
  const {
    isPending,
    data: deletedCourses = [],
    refetch,
  } = useQuery({
    queryKey: ["deletedCourses"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/energinet/courses/get-all-deleted-courses"
      );
      return res.json();
    },
  });
  return [deletedCourses, refetch, isPending];
};

export default useDeletedCourses;
