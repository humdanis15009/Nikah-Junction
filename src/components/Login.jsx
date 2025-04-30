import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import {
  query,
  where,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

function Login({ onRegister }) {
  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState("");
  const [incPass, setIncPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fetchUserByEmail = async (email) => {
    const usersCollection = collection(db, "Biodata");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs[0].data();
  };

  const handleFirebaseError = (error) => {
    return error.message;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (!isAdminLogin) {
        // Handle regular user login
        const userData = await fetchUserByEmail(data.email);
        if (!userData) {
          setFormError("email", {
            type: "manual",
            message: "No user found with this email",
          });
          return;
        }

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password
          );
          const user = userCredential.user;

          if (user) {
            if (!userData.hasOwnProperty("firstName")) {
              navigate(`/Form1`);
            } else if (!userData.hasOwnProperty("country")) {
              navigate(`/Form2`);
            } else if (!userData.hasOwnProperty("familyStatus")) {
              navigate(`/Form3`);
            } else if (
              !userData.hasOwnProperty("imageUrls") ||
              userData.imageUrls.length === 0
            ) {
              navigate(`/Verify`);
            } else if (userData.hasOwnProperty("verifiedEmail")) {
              navigate(`/Verify`);
            }
            //  else if (
            //   userData.hasOwnProperty("imageUrls") &&
            //   !userData.hasOwnProperty("verifiedEmail")
            // ) {
            //   navigate(`/Verify`);
            // }
            else {
              navigate(`/UserCardList`);
            }
          }
        } catch (error) {
          setIncPass(true);
          setFormError("password", {
            type: "manual",
            message: "Incorrect password! Please try again",
          });
        }
      } else {
        // Handle admin login
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;

        const adminRef = doc(db, "admins", user.uid);
        const adminDoc = await getDoc(adminRef);

        if (adminDoc.exists() && adminDoc.data().role === "admin") {
          navigate("/AdminDashboard");
        } else {
          setLocalError("You do not have admin rights.");
        }
      }
    } catch (error) {
      const errorMessage = handleFirebaseError(error);
      setFormError("general", { type: "manual", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = await fetchUserByEmail(email);
      if (!userData) {
        setLocalError("No user found with this email.");
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent successfully.");
      setLocalError("");

      setTimeout(() => {
        setIsForgotPassword(false);
        setValue("email", email);
      }, 5000);
    } catch (error) {
      const errorMessage = handleFirebaseError(error);
      setLocalError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex absolute w-full h-screen text-white justify-center items-center lg:mt-24 mt-12">
      <div className="relative lg:w-[35vw] lg:h-[500px] h-[408px] w-[330px]">
        {/* Login Form */}
        <div
          className={`absolute w-full h-full bg-black bg-opacity-40 rounded-lg transition-all duration-700 ease-in-out transform ${
            isForgotPassword ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="text-center lg:text-5xl text-[28px] pt-4 lg:pb-2 font-extrabold"
          >
            {isAdminLogin ? "Admin Login" : "Welcome back! Please Login"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col m-3 px-4">
              <label
                className="lg:font-bold font-semibold lg:text-xl lg:mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="lg:h-10 h-8 text-gray-800 rounded-lg lg:text-[18px] text-[16px] px-2 border-gray-300 border-2 focus:border-pink-600 focus:ring-0"
                type="text"
                id="email1"
                {...register("email", { required: "Email is required" })}
                placeholder="abc@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="h-3">
                {errors.email && (
                  <p className="text-red-500 lg:text-sm text-[12px] lg:mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col m-3 px-4 relative">
              <label
                className="lg:font-bold font-semibold lg:text-xl lg:mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                className="lg:h-10 h-8 text-gray-800 rounded-lg lg:text-[18px] text-[16px] px-2 border-gray-300 border-2 focus:border-pink-600 focus:ring-0"
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-6 lg:top-[58px] top-[42px] transform -translate-y-1/2 text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img
                  className="lg:h-5 lg:w-5 h-4 w-4"
                  src={
                    showPassword
                      ? "images/open-eye.png"
                      : "images/closed-eye.png"
                  }
                  alt={showPassword ? "Hide password" : "Show password"}
                />
              </button>
              <div className="h-3">
                {(incPass || errors.password) && (
                  <p className="text-red-500 lg:text-sm text-[12px] lg:mt-1">
                    {errors.password?.message ||
                      "Incorrect password! Please try again"}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center px-7">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("stayLoggedIn")}
                  className="form-checkbox lg:h-4 lg:w-4 h-3 w-3 cursor-pointer"
                />
                <label className="text-white pl-1 lg:text-sm text-[12px]">
                  Stay Logged in
                </label>
              </div>
              {!isAdminLogin && (
                <a
                  href="#"
                  onClick={() => setIsForgotPassword(true)}
                  className="ml-auto lg:text-sm text-[12px] text-white hover:underline"
                >
                  Forgot Password?
                </a>
              )}
            </div>
            <div className="mt-4 px-7">
              <button
                type="submit"
                className={`bg-pink-700 text-white lg:px-4 lg:py-2 rounded-xl lg:font-bold font-semibold w-full lg:h-11 h-8 lg:text-[18px] text-[16px] hover:bg-pink-600 transition-colors duration-300 ease-in-out ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="text-center lg:text-sm text-[12px] py-2">OR</p>
              <button
                type="button"
                onClick={() => {
                  setIsAdminLogin((prev) => !prev);
                  setValue("email", "");
                  setValue("password", "");
                  setIncPass(false);
                }}
                className="bg-pink-700 text-white lg:px-4 lg:py-2 rounded-xl lg:font-bold font-semibold w-full lg:h-11 h-8 lg:text-[18px] text-[16px] hover:bg-pink-600 transition-colors duration-300 ease-in-out"
              >
                {isAdminLogin ? "User Login" : "Admin Login"}
              </button>
              <p className="text-center lg:text-sm text-[11px] lg:py-2 py-3">
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setValue("email", "");
                    setValue("password", "");
                    setIncPass(false);
                    onRegister();
                  }}
                  className="cursor-pointer hover:underline font-semibold"
                >
                  Click to Register
                </span>
              </p>
              <div className="h-3">
                {localError && (
                  <p className="text-red-500 lg:text-sm text-[12px] lg:mt-1">
                    {localError}
                  </p>
                )}
              </div>
              <div className="h-3">
                {errors.general && (
                  <p className="text-red-500 lg:text-sm text-[12px] lg:mt-1">
                    {errors.general.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Forgot Password Form */}
        <div
          className={`absolute lg:w-full w-[330px] lg:h-[260px] h-[225px] lg:mt-12 mt-24 bg-black bg-opacity-50 rounded-lg transition-all duration-700 ease-in-out transform ${
            isForgotPassword ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="text-center lg:text-4xl text-3xl pt-4 pb-2 font-extrabold"
          >
            Reset Password
          </h1>
          <form onSubmit={handlePasswordReset}>
            <div className="flex flex-col m-3 px-4">
              <label
                className="lg:font-bold font-semibold lg:text-xl lg:mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="lg:h-10 h-8 text-gray-800 rounded-lg lg:text-[18px] text-[16px] px-2 border-gray-300 border-2 focus:border-pink-600 focus:ring-0"
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@example.com"
                required
              />
            </div>
            <div className="mt-4 px-7">
              <button
                type="submit"
                className={`bg-pink-700 text-white lg:px-4 lg:py-2 rounded-2xl lg:font-bold font-semibold w-full lg:h-11 h-8 lg:text-[18px] hover:bg-pink-600 transition-colors duration-300 ease-in-out ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Email"}
              </button>
              <p className="text-center lg:text-sm text-[12px] py-2">
                Remember your password?{" "}
                <span
                  onClick={() => {
                    setIsForgotPassword(false);
                    setValue("email", email);
                  }}
                  className="cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>
              <div className="h-3">
                {message && (
                  <p className="text-green-500 text-center lg:text-sm text-[12px] lg:mt-1">
                    {message}
                  </p>
                )}
              </div>
              <div className="h-3">
                {localError && (
                  <p className="text-red-500 text-center lg:text-sm text-[12px] lg:mt-1">
                    {localError}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
