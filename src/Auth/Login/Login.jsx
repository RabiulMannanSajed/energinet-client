import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/energinet/auth/login",
        data
      );
      console.log(response);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("role", response.data.user.role);

      alert("Login successful!");

      // ✅ Redirect to homepage
      navigate("/adminNavbar");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Login failed!");
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
          <h2 className="text-center text-xl">LOGIN</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              className="w-full px-4 py-2 bg-green-600 text-white text-xl rounded hover:bg-green-700 transition duration-200"
            >
              LOGIN
            </button>
            <NavLink
              to="/signup"
              className="text-center block mt-4 text-gray-400 hover:underline"
            >
              <p className="mt-2"> CREATE AN ACCOUNT? </p>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
