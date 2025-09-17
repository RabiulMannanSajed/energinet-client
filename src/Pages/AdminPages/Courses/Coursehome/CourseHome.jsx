import Courses from "../Courses/Courses";
import CoursesUpload from "../CoursesUpload/CoursesUpload";

const CourseHome = () => {
  return (
    <div className="text-white">
      <h1>this Course Home </h1>
      <Courses />
      <CoursesUpload></CoursesUpload>
    </div>
  );
};

export default CourseHome;
