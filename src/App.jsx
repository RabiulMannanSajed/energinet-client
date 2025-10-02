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
import TradeMarketPlace from "./Pages/Home/TradeMarketPlace/TradeMarketPlace";
import MakeTradeOffer from "./Pages/Home/MakeTradeOffer/MakeTradeOffer";
import Payment from "./Pages/Home/Payment/Payment";
import ForecastChart from "./Pages/Home/Forcast/ForecastChart";

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
          <Route path="trades" element={<TradeMarketPlace />} />
          <Route path="tradeEnergy" element={<MakeTradeOffer />} />
          <Route path="payment" element={<Payment />} />
          <Route path="forecast" element={<ForecastChart />} />
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
