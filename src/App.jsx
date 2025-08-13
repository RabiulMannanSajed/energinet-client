import { Route, Routes } from "react-router";
import Navbar from "./Shared/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Signup from "./Auth/SignUp/Signup";
import Login from "./Auth/Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
