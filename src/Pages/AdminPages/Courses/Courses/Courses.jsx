import React from "react";
import useCourses from "../../../../hooks/useCourses";

const Courses = () => {
  const [courses] = useCourses();

  return <div>{/* here show all courses */}</div>;
};

export default Courses;
