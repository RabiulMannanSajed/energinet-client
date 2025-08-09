import { Route, Routes } from "react-router";
import Navbar from "./Shared/Navbar/Navbar";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          {/* <Route path="students" element={<Studetns />} />
          <Route path="addStudent" element={<AddStudents />} />
          <Route path="attendance" element={<Attenndance />} />
          <Route path="updateAttendance" element={<UpdatedAttendance />} />
          <Route path="payment" element={<Payment />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;

// ! use this conditional Rendering  to render the components based on the login state

//* if the user is logged in, render the sidebar and its routes

// <Routes>
//     {isLoggedIn ? (
//       <Route path="/" element={<Sidebar />}>
//         <Route index element={<HomeDashBoard />} />
//         <Route path="students" element={<Studetns />} />
//         <Route path="addStudent" element={<AddStudents />} />
//         <Route path="attendance" element={<Attenndance />} />
//         <Route path="updateAttendance" element={<UpdatedAttendance />} />
//         <Route path="payment" element={<Payment />} />
//       </Route>
//     ) : (
//       <Route path="/" element={<Login />} />
//     )}
//   </Routes>
