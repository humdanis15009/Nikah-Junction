// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { db,auth } from "../Firebase";
// import { updateDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// const Form4 = () => {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [working, setWorking] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [userId, setUserId] = useState("");
//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid);
//       }
//     });
//   }, [userId])

//   const navigate = useNavigate();

//   const selectedWorking = watch("prefWorking");

//   useEffect(() => {
//     if (
//       selectedWorking === "" ||
//       selectedWorking === "No" ||
//       selectedWorking === "Doesn't Matter"
//     ) {
//       setWorking(false);
//     } else {
//       setWorking(true);
//     }
//   }, [selectedWorking]);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       await updateDoc(doc(db, "Biodata", userId), {
//         ...data,
//       });
//       console.log("User data updated successfully");
//       navigate(`/Verify`);
//     } catch (error) {
//       console.error("Error updating user data:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen mt-36">
//       <div className="max-w-5xl mx-auto p-6  bg-white shadow-2xl border-t-2 rounded-lg">
//         <h1 className="lg:text-4xl text-2xl text-pink-700 font-bold text-center mb-6">
//           Partner Preferences
//         </h1>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="block lg:text-lg font-semibold">
//                 Caste(s) <span className="text-red-700 justify-start">*</span>
//               </label>
//               <input
//                 placeholder="Enter caste preferences"
//                 type="text"
//                 {...register("prefCaste", {
//                   required: "Caste is required",
//                 })}
//                 className="lg:mt-1 lg:placeholder:text-[16px] placeholder:text-[14px] lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
//               />
//               {errors.prefCaste && (
//                 <span className="text-red-500 text-sm">
//                   {errors.prefCaste.message}
//                 </span>
//               )}
//             </div>{" "}
//             <div className="w-1/2">
//               <label className="block lg:text-lg font-semibold">Location</label>
//               <input
//                 placeholder="Enter location preference"
//                 type="text"
//                 {...register("prefLocation", {
//                   // required: "Location is required",
//                 })}
//                 className="lg:mt-1 lg:h-10 h-8 lg:placeholder:text-[16px] placeholder:text-[14px] block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
//               />
//               {/* {errors.prefLocation && (
//                 <span className="text-red-500 text-sm">
//                   {errors.prefLocation.message}
//                 </span>
//               )} */}
//             </div>
//           </div>

//           {/* Education */}
//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="block lg:text-lg font-semibold">
//                 Education
//               </label>
//               <select
//                 {...register("prefEducation", {
//                   // required: "Education is required",
//                 })}
//                 className="lg:mt-1 lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select education</option>
//                 <option value="High School">High School</option>
//                 <option value="Intermediate">Intermediate</option>
//                 <option value="Bachelor's">Bachelor's</option>
//                 <option value="Master's">Master's</option>
//                 <option value="PhD">PhD</option>
//                 <option value="Other">Other</option>
//                 <option value="Doesn't Matter">Doesn't Matter</option>
//               </select>
//               {/* {errors.prefEducation && (
//                 <span className="text-red-500 text-sm">
//                   {errors.prefEducation.message}
//                 </span>
//               )} */}
//             </div>
//           </div>

//           {/* Working */}
//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="block lg:text-lg font-semibold">Working</label>
//               <select
//                 {...register("prefWorking", {
//                   // required: "Working is required",
//                 })}
//                 className="lg:mt-1 lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
//               >
//                 <option value="">
//                   Select working preference of your partner here
//                 </option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//                 <option value="Doesn't Matter">Doesn't Matter</option>
//               </select>
//               {/* {errors.prefWorking && (
//                 <span className="text-red-500 text-sm">
//                   {errors.prefWorking.message}
//                 </span>
//               )} */}
//             </div>

//             {/* Profession/Occupation */}
//             <div className="w-1/2">
//               {working && (
//                 <div>
//                   <label className="block lg:text-lg font-semibold">
//                     Profession/Occupation
//                   </label>
//                   <select
//                     {...register("prefProfession", {
//                       // required: "Profession is required",
//                     })}
//                     className="lg:mt-1 lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
//                   >
//                     <option value="">Select profession</option>
//                     <option value="Doctor">Doctor</option>
//                     <option value="Engineer">Engineer</option>
//                     <option value="Teacher">Teacher</option>
//                     <option value="Business">Business</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   {/* {errors.prefProfession && (
//                     <span className="text-red-500 text-sm">
//                       {errors.prefProfession.message}
//                     </span>
//                   )} */}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="justify-center flex">
//             <button
//               type="submit"
//               className="lg:w-[50%] mt-4 lg:text-xl bg-pink-700 font-bold text-white p-2 rounded-md hover:bg-pink-600"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <div className="w-4 h-4 border-4 border-gray-300 border-t-4 border-t-white rounded-full animate-spin inline-block mr-2"></div>
//                   Proceeding...
//                 </>
//               ) : (
//                 "Proceed to next step"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Form4;
