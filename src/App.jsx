import { Route, Routes } from "react-router";
import Navbar from "./Shared/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Signup from "./Auth/SignUp/Signup";
import Login from "./Auth/Login/Login";
import AdminDashboard from "./Pages/AdminPages/AdminDashboard/AdminDashboard/AdminDashboard";
import AdminNavbar from "./Shared/AdminNavbar/AdminNavbar";
import CourseHome from "./Pages/AdminPages/Courses/Coursehome/CourseHome";
import CoursesUpload from "./Pages/AdminPages/Courses/CoursesUpload/CoursesUpload";
import LearnHome from "./Pages/Home/Learn/LearnHome/LearnHome";
import UserActiveits from "./Pages/AdminPages/AdminDashboard/userActiveits/UserActiveits";
import DeletedCourses from "./Pages/AdminPages/Courses/DeletedCourses/DeletedCourses";
import Profile from "./Pages/Home/Profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} /> {/* default landing page */}
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        {/*  this is for the user  */}
        <Route path="/navbar" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<LearnHome />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        {/*  this is for admin  */}
        <Route path="/adminNavbar" element={<AdminNavbar />}>
          <Route index element={<AdminDashboard />} />
          <Route path="course" element={<CourseHome />} />
          <Route path="courseUpload" element={<CoursesUpload />} />
          <Route path="deletedCourses" element={<DeletedCourses />} />
          <Route path="userActivity" element={<UserActiveits />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
