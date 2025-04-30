import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../Firebase";
import { updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Helmet } from "react-helmet-async";

const Form1 = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [lang, setLang] = useState(false);
  const [caste, setCaste] = useState(false);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  // const selectedLanguage = watch("language");
  const selectedCaste = watch("caste");
  const selectedStatus = watch("maritalStatus");

  const [userId, setUserId] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  // useEffect(() => {
  //   if (selectedLanguage === "Other") {
  //     setLang(true);
  //     setValue("other-language", "");
  //   } else {
  //     setLang(false);
  //     setValue("other-language", "");
  //   }
  // }, [selectedLanguage, setValue]);

  useEffect(() => {
    if (selectedCaste === "Other") {
      setCaste(true);
      setValue("other-caste", "");
    } else {
      setCaste(false);
      setValue("other-caste", "");
    }
  }, [selectedCaste, setValue]);

  useEffect(() => {
    if (selectedStatus === "" || selectedStatus === "Never Married") {
      setStatus(false);
    } else if (selectedStatus !== "Never Married") {
      setStatus(true);
    }
  }, [selectedStatus]);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "Biodata", userId), {
        ...data,
      });
      console.log("User data updated successfully");
      navigate(`/Form2`);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Personal Details - Nikah Junction</title>
        <meta
          name="description"
          content="Join Nikah Junction, India's trusted Muslim matrimony platform. Find your perfect life partner with ease. Register today!"
        />
        <meta
          name="keywords"
          content="Muslim matrimony, Nikah Junction, matrimony service, Muslim marriage, Islamic wedding, find rishta, matrimony India"
        />
        <meta name="author" content="Nikah Junction" />
        <link rel="canonical" href="https://nikahjunction.netlify.app/Form1" />
        <meta
          property="og:title"
          content="Personal Details - Nikah Junction"
        />
        <meta
          property="og:description"
          content="Nikah Junction helps you find your ideal life partner. Register now to connect with compatible matches!"
        />
        <meta
          property="og:image"
          content="https://nikahjunction.netlify.app/nikah-logo1.png"
        />
        <meta property="og:url" content="https://nikahjunction.netlify.app/Form1" />
        {/* <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Nikah Junction - Trusted Muslim Matrimony Service"
    />
    <meta
      name="twitter:description"
      content="Find your perfect Muslim partner on Nikah Junction. Register today!"
    />
    <meta
      name="twitter:image"
      content="https://yourwebsite.com/twitter-image.jpg"
    /> */}
      </Helmet>
      <div className="min-h-screen mt-16">
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-2xl border-t-2 rounded-lg">
          <h1 className="lg:text-4xl text-2xl text-pink-700 font-bold text-center mb-6">
            Register to Find Your Perfect Match
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  First Name{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <input
                  type="text"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  onChange={(e) => {
                    const value = e.target.value;
                    const formattedValue = value
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ");
                    e.target.value = formattedValue;
                  }}
                  className="lg:mt-1 block w-full p-2 lg:h-10 h-8 border border-gray-300 rounded-md"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Last Name{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  onChange={(e) => {
                    const value = e.target.value;
                    const formattedValue = value
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ");
                    e.target.value = formattedValue;
                  }}
                  className="lg:mt-1 block w-full p-2 lg:h-10 h-8 border border-gray-300 rounded-md  focus:ring-pink-500"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Date of Birth (in the same row) */}
            <div>
              <label className="block lg:text-lg font-semibold">
                Date of Birth{" "}
                <span className="text-red-700 justify-start">*</span>
              </label>
              <div className="flex gap-4">
                <select
                  {...register("day", { required: "Day is required" })}
                  className="w-1/3 lg:p-2 p-1 lg:h-10 h-8 border border-gray-300 rounded-md"
                >
                  <option value="">Day</option>
                  {[...Array(31).keys()].map((day) => (
                    <option key={day} value={day + 1}>
                      {day + 1}
                    </option>
                  ))}
                </select>

                <select
                  {...register("month", { required: "Month is required" })}
                  className="w-1/3 lg:p-2 p-1 lg:h-10 h-8 border border-gray-300 rounded-md"
                >
                  <option value="">Month</option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  {...register("year", { required: "Year is required" })}
                  className="w-1/3 lg:p-2 p-1 lg:h-10 h-8 border border-gray-300 rounded-md"
                >
                  <option value="">Year</option>
                  {[...Array(40).keys()].map((index) => {
                    const year = new Date().getFullYear() - 18 - index;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              {(errors.day || errors.month || errors.year) && (
                <span className="text-red-500 text-sm">
                  Date of birth required
                </span>
              )}
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Complexion{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <select
                  {...register("complexion", {
                    required: "Complexion is required",
                  })}
                  className="lg:mt-1 block w-full lg:p-2 p-1 lg:h-10 h-8 border border-gray-300 rounded-md"
                >
                  <option value="">Select a value</option>
                  <option value="Brown">Brown</option>
                  <option value="Wheatish">Wheatish</option>
                  <option value="Fair">Fair</option>
                  <option value="Very Fair">Very Fair</option>
                </select>
                {errors.complexion && (
                  <span className="text-red-500 text-sm">
                    {errors.complexion.message}
                  </span>
                )}
              </div>

              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Gender <span className="text-red-700 justify-start">*</span>
                </label>
                <select
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                  className="lg:mt-1 block w-full lg:p-2 p-1 lg:h-10 h-8 border border-gray-300 rounded-md"
                >
                  <option value="">Select a value</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <span className="text-red-500 text-sm">
                    {errors.gender.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Height <span className="text-red-700 justify-start">*</span>
                </label>
                <select
                  {...register("height", { required: "Height is required" })}
                  className="lg:mt-1 block w-full lg:p-2 p-1 lg:h-10 h-8 border border-gray-300 rounded-md"
                >
                  <option value="">Select a value</option>
                  {[...Array((7 - 4) * 12 + 1).keys()].map((i) => {
                    // Convert i to feet and inches
                    const totalInches = i + 4 * 12; // Adding base inches for feet

                    const feet = Math.floor(totalInches / 12);
                    const inches = totalInches % 12;

                    return (
                      <option key={i} value={`${feet}' ${inches}"`}>
                        {`${feet}' ${inches === 0 ? "feet" : inches}"`}
                      </option>
                    );
                  })}
                </select>
                {errors.height && (
                  <span className="text-red-500 text-sm">
                    {errors.height.message}
                  </span>
                )}
              </div>

              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Sect <span className="text-red-700 justify-start">*</span>
                </label>
                <select
                  {...register("sect", { required: "Sect is required" })}
                  className="lg:mt-1 block w-full lg:p-2 p-1 lg:h-10 h-8 border border-gray-300 rounded-md"
                >
                  <option value="">Select a value</option>
                  <option value="Sunni">Sunni</option>
                  <option value="Shia">Shia</option>
                </select>
                {errors.sect && (
                  <span className="text-red-500 text-sm">
                    {errors.sect.message}
                  </span>
                )}
              </div>

              {/* <div className="w-1/2">
              <label
                htmlFor="language"
                className="block lg:text-lg font-semibold"
              >
                Mother Tongue{" "}
              </label>
              {lang ? (
                <input
                  {...register("other-language", {
                    required: "Specify your language",
                  })}
                  type="text"
                  placeholder="Type your mother tongue here"
                  className=" lg:mt-1 block w-full lg:p-2 p-1 lg:h-10 h-8 border border-gray-300 rounded-md focus:ring-pink-500"
                />
              ) : (
                <select
                  {...register("language", {
                    required: "Language is required",
                  })}
                  className="lg:mt-1 block w-full lg:py-2 lg:px-3 p-1 lg:h-10 h-8 border border-gray-300 rounded-md focus:ring-pink-500"
                >
                  <option value="">Select your mother tongue</option>
                  <option value="Hindi / Urdu">Hindi / Urdu</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Kashmiri">Kashmiri</option>
                  <option value="Sindhi">Sindhi</option>
                  <option value="Nepali">Nepali</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Odia">Odia</option>
                  <option value="Punjabi">Punjabi</option>
                  <option value="Assamese">Assamese</option>
                  <option value="Maithili">Maithili</option>
                  <option value="Santali">Santali</option>
                  <option value="Konkani">Konkani</option>
                  <option value="Sanskrit">Sanskrit</option>
                  <option value="Bhili">Bhili</option>
                  <option value="Gondi">Gondi</option>
                  <option value="Bodo">Bodo</option>
                  <option value="Rajasthani">Rajasthani</option>
                  <option value="Other">Other</option>
                </select>
              )}
              {errors.language && (
                <span className="text-red-500 text-sm">
                  {errors.language.message}
                </span>
              )}
              {errors["other-language"] && (
                <span className="text-red-500 text-sm">
                  {errors["other-language"].message}
                </span>
              )}
            </div> */}
            </div>

            <div className="flex gap-4">
              {/* Marital Status */}
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Marital Status{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <select
                  {...register("maritalStatus", {
                    required: "Marital status is required",
                  })}
                  className="lg:mt-1 block w-full lg:p-2 p-1 lg:h-10 h-8 border border-gray-300 rounded-md"
                >
                  <option value="">Select a value</option>
                  <option value="Never Married">Never Married</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                </select>
                {errors.maritalStatus && (
                  <span className="text-red-500 text-sm">
                    {errors.maritalStatus.message}
                  </span>
                )}
              </div>

              <div className="w-1/2">
                {status && (
                  <div>
                    <label className="block lg:text-lg font-semibold">
                      Children{" "}
                      <span className="text-red-700 justify-start">*</span>
                    </label>
                    <select
                      {...register("children", {
                        required: "Children field is required",
                      })}
                      className="lg:mt-1 block w-full lg:p-2 p-1 lg:h-10 h-8 border border-gray-300 rounded-md"
                    >
                      <option value="">Select a value</option>
                      <option value="None">None</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="5+">5+</option>
                    </select>
                    {errors.children && (
                      <span className="text-red-500 text-sm">
                        {errors.children.message}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              {/* Caste */}
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Caste <span className="text-red-700 justify-start">*</span>
                </label>
                {caste ? (
                  <input
                    {...register("other-caste", {
                      required: "Specify your caste",
                    })}
                    type="text"
                    placeholder="Type your caste here"
                    className="lg:mt-1 block w-full lg:p-2 p-1 lg:h-10 h-8 border border-gray-300 rounded-md"
                  />
                ) : (
                  <select
                    {...register("caste", { required: "Caste is required" })}
                    className="lg:mt-1 block w-full lg:p-2 p-1 lg:h-10 h-8 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a value</option>
                    <option value="Abbasi">Abbasi</option>
                    {/* <option value="Afghan">Afghan</option> */}
                    <option value="Alvi">Alvi</option>
                    <option value="Ansari">Ansari</option>
                    <option value="Arab">Arab</option>
                    <option value="Asadi">Asadi</option>
                    {/* <option value="Baghdadi">Baghdadi</option> */}
                    <option value="Baig">Baig/Beg</option>
                    {/* <option value="Barelvi">Barelvi</option> */}
                    <option value="Bohra">Bohra</option>
                    <option value="Bukhari">Bukhari</option>
                    <option value="Chaudhary">Chaudhary</option>
                    <option value="Chishti">Chishti</option>
                    <option value="Dakhini">Dakhini</option>
                    <option value="Dawoodi Bohra">Dawoodi Bohra</option>
                    {/* <option value="Deobandi">Deobandi</option> */}
                    <option value="Faqir">Faqir</option>
                    <option value="Farooqui">Farooqui</option>
                    {/* <option value="Gujjar">Gujjar</option> */}
                    <option value="Halwai">Halwai</option>
                    <option value="Hanafi">Hanafi</option>
                    <option value="Hussaini">Hussaini</option>
                    <option value="Idrisi">Idrisi</option>
                    <option value="Jafari">Jafari</option>
                    <option value="Jat">Jat</option>
                    <option value="Jilani">Jilani</option>
                    <option value="Kazmi">Kazmi</option>
                    <option value="Khan">Khan</option>
                    <option value="Khanani">Khanani</option>
                    <option value="Khoja">Khoja</option>
                    <option value="Lohar">Lohar</option>
                    <option value="Madni">Madni</option>
                    <option value="Mahdavi">Mahdavi</option>
                    <option value="Malik">Malik</option>
                    <option value="Mansoori">Mansoori</option>
                    <option value="Manihar">Manihar</option>
                    <option value="Meo">Meo</option>
                    <option value="Mir">Mir</option>
                    <option value="Mirza">Mirza</option>
                    <option value="Memon">Memon</option>
                    <option value="Mughal">Mughal</option>
                    <option value="Naqvi">Naqvi</option>
                    <option value="Nadvi">Nadvi</option>
                    <option value="Naimi">Naimi</option>
                    <option value="Pathan">Pathan</option>
                    {/* <option value="Pashmina">Pashmina</option> */}
                    {/* <option value="Pirzada">Pirzada</option> */}
                    <option value="Qadri">Qadri</option>
                    <option value="Qidwai">Qidwai</option>
                    <option value="Qureshi">Qureshi</option>
                    <option value="Raeen">Raeen/Rayeen</option>
                    {/* <option value="Rajput Muslim">Rajput Muslim</option> */}
                    <option value="Razvi">Razvi</option>
                    <option value="Rizvi">Rizvi</option>
                    {/* <option value="Rohilla">Rohilla</option> */}
                    <option value="Saifi">Saifi</option>
                    <option value="Salafi">Salafi</option>
                    <option value="Salmani">Salmani</option>
                    <option value="Shaikh">Shaikh</option>
                    <option value="Sheikh">Sheikh</option>
                    <option value="Shah">Shah</option>
                    <option value="Shamsi">Shamsi</option>
                    <option value="Siddiqi">Siddiqi</option>
                    <option value="Siddiqui">Siddiqui</option>
                    <option value="Sheikh">Sheikh/Siddiqui</option>
                    <option value="Sufi">Sufi</option>
                    <option value="Syed">Syed</option>
                    <option value="Teli">Teli</option>
                    {/* <option value="Turk">Turk</option> */}
                    <option value="Usmani">Usmani</option>
                    <option value="Zuberi">Zuberi</option>
                    <option value="Other">Type Yourself</option>
                  </select>
                )}
                {errors.caste && (
                  <span className="text-red-500 text-sm">
                    {errors.caste.message}
                  </span>
                )}
                {errors["other-caste"] && (
                  <span className="text-red-500 text-sm">
                    {errors["other-caste"].message}
                  </span>
                )}
              </div>
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Partner's Caste(s){" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <input
                  placeholder="Enter caste preferences"
                  type="text"
                  {...register("prefCaste", {
                    required: "Caste is required",
                  })}
                  className="lg:mt-1 lg:placeholder:text-[16px] placeholder:text-[14px] lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
                />
                {errors.prefCaste && (
                  <span className="text-red-500 text-sm">
                    {errors.prefCaste.message}
                  </span>
                )}
              </div>
            </div>

            <div className="justify-center flex">
              <button
                type="submit"
                className="lg:w-[50%] lg:mt-4 mt-3 lg:text-xl bg-pink-700 font-bold text-white p-2 rounded-md hover:bg-pink-600"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-4 border-gray-300 border-t-4 border-t-white rounded-full animate-spin inline-block mr-2"></div>
                    Proceeding...
                  </>
                ) : (
                  "Proceed to next step"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form1;
