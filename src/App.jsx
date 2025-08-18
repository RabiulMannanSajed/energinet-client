import { Route, Routes } from "react-router";
import Navbar from "./Shared/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Signup from "./Auth/SignUp/Signup";
import Login from "./Auth/Login/Login";
import AdminDashboard from "./Pages/AdminPages/AdminDashboard/AdminDashboard/AdminDashboard";
import AdminNavbar from "./Shared/AdminNavbar/AdminNavbar";
import CourseHome from "./Pages/AdminPages/Courses/Coursehome/CourseHome";

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
        </Route>
        {/*  this is for admin  */}
        <Route path="/adminNavbar" element={<AdminNavbar />}>
          <Route index element={<AdminDashboard />} />
          <Route path="course" element={<CourseHome />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
