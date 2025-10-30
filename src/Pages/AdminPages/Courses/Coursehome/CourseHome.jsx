import Courses from "../Courses/Courses";
import CoursesUpload from "../CoursesUpload/CoursesUpload";
import DeletedCourses from "../DeletedCourses/DeletedCourses";

const CourseHome = () => {
  return (
    <div className="text-white">
      <Courses />
      <DeletedCourses />
    </div>
  );
};

export default CourseHome;
