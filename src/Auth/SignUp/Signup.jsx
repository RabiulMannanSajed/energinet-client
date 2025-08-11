import { useForm } from "react-hook-form";
import logo from "../../assets/Energinetlogo.png"; // Adjust the path as necessary
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Using useNavigate for navigation after signup to thw login page
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/enerdinet/users/create-user",
        data
      );
      console.log("User created:", response.data);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed!");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "url('https://rpginterfacelab.org/wp-content/uploads/2025/06/Renewable-Energy-rotated.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)", // Darkens the image (like reducing opacity)
          zIndex: -1,
        }}
      ></div>
      <div
        className="
          bg-white/5
          backdrop-blur-md
          border
          border-white/20
          rounded-2xl
          shadow-lg
          p-8
          text-white
          space-y-6
          z-10
          flex
          justify-between items-center"
      >
        <div className="w-[50%]">
          <img src={logo} alt="" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
            numquam odit beatae ea omnis ex eum minus, consequatur est maiores?
          </p>
        </div>
        <div
          className="
          bg-white/10
          backdrop-blur-md
          border
          border-white/30
          rounded-2xl
          shadow-lg
          p-8
          text-white
          space-y-6
          z-10
        "
        >
          <h2 className="text-center text-xl">SIGNUP</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div style={{ marginBottom: "15px" }}>
              <label>Username</label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                placeholder="Enter your username"
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
              {errors.username && (
                <p style={{ color: "red" }}>{errors.username.message}</p>
              )}
            </div>
            {/* Email */}
            <div style={{ marginBottom: "15px" }}>
              <label>Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
              )}
            </div>
            {/* Password */}
            <div style={{ marginBottom: "15px" }}>
              <label>Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter your password"
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full uppercase px-4 py-2 bg-green-600 text-white text-xl rounded hover:bg-green-700 transition duration-200"
            >
              Signup
            </button>
            <NavLink
              to="/login"
              className="text-center block mt-4 text-gray-400 hover:underline"
            >
              <p className="mt-2"> ALREADY HAVE AN ACCOUNT? </p>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
