import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth, db } from "../Firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "Biodata", user.uid), { ...data });

      navigate(`/Form1`);
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("email", { type: "manual", message: "Email already in use" });
      } else if (error.code === "auth/weak-password") {
        setError("password", {
          type: "manual",
          message: "Password should be at least 6 characters",
        });
      } else {
        setError("general", { type: "manual", message: error.message });
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className="flex w-full h-screen absolute text-white justify-center items-center lg:mt-28 mt-12 object-cover">
        <div className="lg:h-[555px] lg:w-[35vw] h-[440px] w-[330px] bg-black bg-opacity-50 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="flex flex-col m-3 px-4">
              <label className="font-bold lg:text-xl lg:mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className="lg:h-10 h-8 text-gray-800 rounded-lg lg:text-[18px] text-[16px] px-2"
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                placeholder="abc@example.com"
              />
              {/* Error for Email */}
              <div className="h-3">
                {errors.email && (
                  <p className="text-red-500 lg:text-sm text-[12px] lg:mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Mobile Number Input */}
            <div className="flex flex-col m-3 px-4">
              <label
                className="lg:font-bold font-semibold lg:text-xl lg:mb-2"
                htmlFor="mobileNumber"
              >
                Mobile Number:
              </label>
              <div className="flex items-center">
                <span className="bg-white w-[45px] text-gray-800 rounded-lg px-2 lg:h-10 h-8 flex items-center mr-1">
                  +91
                </span>
                <input
                  className="lg:h-10 h-8 text-gray-800 rounded-lg lg:text-[18px] text-[16px] px-2 flex-1 max-w-[225px] lg:max-w-[570px]"
                  type="text"
                  id="mobileNumber"
                  {...register("mobileNumber", {
                    required: "Mobile number is required",
                    maxLength: {
                      value: 10,
                      message: "Mobile number cannot exceed 10 digits",
                    },
                    minLength: {
                      value: 10,
                      message: "Mobile number cannot be less than 10 digits",
                    },
                  })}
                  placeholder="Enter 10-digit mobile number"
                />
              </div>
              {/* Error for Mobile Number */}
              <div className="h-3">
                {errors.mobileNumber && (
                  <p className="text-red-500 lg:text-sm text-[12px] lg:mt-1">
                    {errors.mobileNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Profile For Input */}
            <div className="flex flex-col m-3 px-4">
              <label
                className="lg:font-bold font-semibold lg:text-xl lg:mb-2"
                htmlFor="profileFor"
              >
                Create Profile for:
              </label>
              <select
                className="lg:h-10 h-8 text-gray-800 rounded-lg lg:text-[18px] text-[16px] px-2"
                id="profileFor"
                {...register("profileFor", {
                  required: "Please select an option",
                })}
              >
                <option value="">Choose an option</option>
                <option value="self">Self</option>
                <option value="daughter">Daughter</option>
                <option value="son">Son</option>
                <option value="brother">Brother</option>
                <option value="sister">Sister</option>
                <option value="relativeFriend">Relative/Friend</option>
              </select>
              {/* Error for Profile For */}
              <div className="h-3">
                {errors.profileFor && (
                  <p className="text-red-500 lg:text-sm text-[12px] lg:mt-1">
                    {errors.profileFor.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password Input with Visibility Toggle */}
            <div className="flex flex-col m-3 px-4 relative">
              <label
                className="lg:font-bold font-semibold lg:text-xl lg:mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                className="lg:h-10 h-8 text-gray-800 rounded-lg lg:text-[18px] text-[16px] px-2 pr-10" // Padding for eye icon
                type={showPassword ? "text" : "password"} // Toggle input type
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password cannot be less than 8 characters",
                  },
                })}
                placeholder="Enter your password"
              />
              {/* Toggle Button for Password Visibility */}
              <button
                type="button"
                className="absolute right-6 lg:top-[58px] top-[42px] transform -translate-y-1/2 text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <img
                    className="lg:h-5 lg:w-5 h-4 w-4"
                    src="images/open-eye.png"
                  />
                ) : (
                  <img
                    className="lg:h-5 lg:w-5 h-4 w-4"
                    src="images/closed-eye.png"
                  />
                )}{" "}
              </button>
              {/* Error for Password */}
              <div className="h-3">
                {errors.password && (
                  <p className="text-red-500 lg:text-sm text-[12px] lg:mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="m-3 px-4 lg:py-6 py-2">
              <button
                type="submit"
                className={`w-full lg:h-11 h-8 border-2 rounded-2xl text-bold lg:text-2xl text-xl bg-pink-700 font-semibold text-white hover:bg-pink-600 ${loading ? "opacity-90 cursor-not-allowed" : ""
                  }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-4 border-gray-300 border-t-4 border-t-white rounded-full animate-spin inline-block mr-2"></div>
                    Registering...
                  </>
                ) : (
                  "REGISTER"
                )}
              </button>

              <p className="lg:text-xs text-[10px] lg:mt-6 mt-5 text-wrap text-center">
                By clicking on register free you confirm that you accept the{" "}
                <Link className="underline" to="/Tnc">
                  Terms & Conditions
                </Link>{" "}
                &nbsp;and{" "}
                <Link className="underline" to="/Privacy">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
