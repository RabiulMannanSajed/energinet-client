import Courses from "../Courses/Courses";
import CoursesUpload from "../CoursesUpload/CoursesUpload";

const CourseHome = () => {
  return (
    <div className="text-white">
      <Courses />
      <CoursesUpload></CoursesUpload>
    </div>
  );
};

export default CourseHome;
