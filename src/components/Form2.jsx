import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { State, City } from "country-state-city";
import { db, auth } from "../Firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Helmet } from "react-helmet-async";

const Form2 = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  // const [countries2, setCountries2] = useState([]);
  const [states2, setStates2] = useState([]);
  const [cities2, setCities2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [not, setNot] = useState(false);
  const [live, setLive] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountry2, setSelectedCountry2] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedState2, setSelectedState2] = useState("");

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userDocRef = doc(db, "Biodata", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setLive(userDocSnap.data().gender);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch countries when component mounts
  // useEffect(() => {
  //   const allCountries = Country.getAllCountries();
  //   setCountries(allCountries);
  //   setCountries2(allCountries);
  // }, []);

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
      alert("You cannot go back to Form 1 as it is already filled.");
    };

    return () => {
      window.onpopstate = null;
    };
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      const allStates = State.getStatesOfCountry(selectedCountry);
      setStates(allStates);
      setCities([]); // Clear cities when the country changes
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry2) {
      const allStates2 = State.getStatesOfCountry(selectedCountry2);
      setStates2(allStates2);
      setCities2([]); // Clear cities when the country changes
    }
  }, [selectedCountry2]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      const allCities = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(allCities);
    }
  }, [selectedState, selectedCountry]);

  useEffect(() => {
    if (selectedState2) {
      const allCities2 = City.getCitiesOfState(
        selectedCountry2,
        selectedState2
      );
      setCities2(allCities2);
    }
  }, [selectedState2, selectedCountry2]);

  const fetchStates = (countryCode) => {
    const fetchedStates = State.getStatesOfCountry(countryCode);
    setStates(fetchedStates);
  };
  const fetchStates2 = (countryCode2) => {
    const fetchedStates2 = State.getStatesOfCountry(countryCode2);
    setStates2(fetchedStates2);
  };

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    fetchStates(countryCode); // Fetch states when a country is selected
  };
  const handleCountryChange2 = (e) => {
    const countryCode2 = e.target.value;
    setSelectedCountry2(countryCode2);
    fetchStates2(countryCode2); // Fetch states when a country is selected
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };
  const handleStateChange2 = (e) => {
    setSelectedState2(e.target.value);
  };

  const [degree, setDegree] = useState(false);
  const [employedIn, setEmployedIn] = useState(false);

  const selectedDegree = watch("degree");
  const selectedEmployedIn = watch("employedIn");

  useEffect(() => {
    if (selectedDegree === "Other") {
      setDegree(true);
      setValue("other-degree", ""); // Clear any previous value
    } else {
      setDegree(false);
      setValue("other-degree", ""); // Clear the value if not 'Other'
    }
  }, [selectedDegree, setValue]);

  useEffect(() => {
    if (selectedEmployedIn === "Not Working") {
      setNot(true);
    } else {
      setNot(false);
    }
    if (selectedEmployedIn === "Other") {
      setEmployedIn(true);
      setValue("other-employedIn", "");
    } else {
      setEmployedIn(false);
      setValue("other-employedIn", "");
    }
  }, [selectedEmployedIn, setValue]);

  const [isActive, setIsActive] = useState(false);
  const [homeTown, setHomeTown] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "Biodata", userId), {
        ...data,
        groomLive: isActive,
        paid: false
      });
      navigate(`/Form3`);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Education and Employment Details - Nikah Junction</title>
        <meta
          name="description"
          content="Join Nikah Junction, India's trusted Muslim matrimony platform. Find your perfect life partner with ease. Register today!"
        />
        <meta
          name="keywords"
          content="Muslim matrimony, Nikah Junction, matrimony service, Muslim marriage, Islamic wedding, find rishta, matrimony India"
        />
        <meta name="author" content="Nikah Junction" />
        <link rel="canonical" href="https://nikahjunction.netlify.app/Form2" />
        <meta
          property="og:title"
          content="Education and Employment Details - Nikah Junction"
        />
        <meta
          property="og:description"
          content="Nikah Junction helps you find your ideal life partner. Register now to connect with compatible matches!"
        />
        <meta
          property="og:image"
          content="https://nikahjunction.netlify.app/nikah-logo1.png"
        />
        <meta property="og:url" content="https://nikahjunction.netlify.app/Form2" />
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
      <div className="min-h-screen mt-24">
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-2xl border-t-2 rounded-lg">
          <h1 className="lg:text-4xl text-2xl text-pink-700 font-bold text-center mb-6">
            Great! You are a step ahead.
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block lg:text-lg lg:pb-1 font-semibold">
                Currently living{" "}
                <span className="text-red-700 justify-start">*</span>
              </label>
              <div className="flex gap-4">
                <select
                  {...register("country", { required: "Country is required" })}
                  className="w-1/3 lg:h-10 h-8 lg:p-2 p-1 border border-gray-300 rounded-md"
                  onChange={handleCountryChange}
                >
                  <option value="">Country</option>
                  <option value="IN">India</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="KW">Kuwait</option>
                  <option value="OM">Oman</option>
                  <option value="QA">Qatar</option>
                  {/* {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))} */}
                </select>

                <select
                  {...register("state", { required: "State is required" })}
                  className="w-1/3 lg:h-10 h-8 lg:p-2 p-1 border border-gray-300 rounded-md"
                  onChange={handleStateChange}
                >
                  <option value="">State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>

                <select
                  {...register("city", { required: "City is required" })}
                  className="w-1/3 lg:h-10 h-8 lg:p-2 p-1 border border-gray-300 rounded-md"
                >
                  <option value="">City</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              {(errors.city || errors.state || errors.country) && (
                <span className="text-red-500 text-sm">
                  All fields are required
                </span>
              )}
            </div>

            <div className="flex pt-2">
              <div className="lg:text-lg w-[220px] lg:w-[25vw] font-semibold">
                Is your hometown different from current place of living?
              </div>
              <div
                className={`relative inline-flex items-center cursor-pointer ml-6 w-[90px] h-8 rounded-full transition-colors duration-300 ${homeTown ? "bg-green-600" : "bg-blue-600"
                  }`}
                onClick={() => {
                  setHomeTown(!homeTown);
                }}
              >
                <div
                  className={`absolute justify-normal items-center top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${homeTown ? "translate-x-[58px]" : "translate-x-0"
                    }`}
                ></div>
                <span
                  className={`text-white font-semibold ml-10 transition-transform duration-300
                ${homeTown ? "ml-6" : "ml-9"}`}
                >
                  {homeTown ? "YES" : "NO"}
                </span>
              </div>
            </div>

            {homeTown && (
              <div className="pt-1">
                <label className="block lg:text-lg font-semibold">
                  Hometown / Native{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <div>
                  <div className="flex gap-4">
                    <select
                      {...register("country2", {
                        required: "Country is required",
                      })}
                      className="w-1/3 lg:h-10 h-8 lg:p-2 p-1 border border-gray-300 rounded-md"
                      onChange={handleCountryChange2}
                    >
                      <option value="">Country</option>
                      <option value="IN">India</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="KW">Kuwait</option>
                      <option value="OM">Oman</option>
                      <option value="QA">Qatar</option>
                      {/* {countries2.map((country2) => (
                      <option key={country2.isoCode} value={country2.isoCode}>
                        {country2.name}
                      </option>
                    ))} */}
                    </select>

                    <select
                      {...register("state2", { required: "State is required" })}
                      className="w-1/3 lg:h-10 h-8 lg:p-2 p-1 border border-gray-300 rounded-md"
                      onChange={handleStateChange2}
                    >
                      <option value="">State</option>
                      {states2.map((state2) => (
                        <option key={state2.isoCode} value={state2.isoCode}>
                          {state2.name}
                        </option>
                      ))}
                    </select>

                    <select
                      {...register("city2", { required: "City is required" })}
                      className="w-1/3 lg:h-10 h-8 lg:p-2 p-1 border border-gray-300 rounded-md"
                    >
                      <option value="">City</option>
                      {cities2.map((city2) => (
                        <option key={city2.name} value={city2.name}>
                          {city2.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {(errors.city || errors.state || errors.country) && (
                    <span className="text-red-500 text-sm">
                      All fields are required
                    </span>
                  )}
                </div>
                {(errors.city2 || errors.state2 || errors.country2) && (
                  <span className="text-red-500 text-sm">
                    All fields are required
                  </span>
                )}
              </div>
            )}

            {live === "Male" && (
              <div className="flex py-2">
                <div className="lg:text-lg w-[220px] lg:w-[25vw] font-semibold">
                  Does Groom lives with family?
                </div>
                <div
                  className={`relative inline-flex items-center cursor-pointer ml-6 w-[90px] h-8 rounded-full transition-colors duration-300 ${isActive ? "bg-green-600" : "bg-blue-600"
                    }`}
                  onClick={handleClick}
                >
                  <div
                    className={`absolute justify-normal items-center top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${isActive ? "translate-x-[58px]" : "translate-x-0"
                      }`}
                  ></div>
                  <span
                    className={`text-white font-semibold ml-10 transition-transform duration-300
              ${isActive ? "ml-6" : "ml-9"}`}
                  >
                    {isActive ? "YES" : "NO"}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  {...register("address")}
                  className="lg:mt-1 block w-full lg:h-10 h-8 lg:p-2 p-1 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Whatsapp No.{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Number"
                  {...register("whatsappNo", {
                    required: "Please enter your Whatsapp Number.",
                  })}
                  className="lg:mt-1 block w-full lg:h-10 h-8 lg:p-2 p-1 border border-gray-300 rounded-md"
                />
                {errors.whatsappNo && (
                  <span className="text-red-500 text-sm">
                    {errors.whatsappNo.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="degree"
                  className="block lg:text-lg font-semibold"
                >
                  Highest Education{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                {degree ? (
                  <input
                    {...register("other-degree", {
                      required: "Please specify your degree",
                    })}
                    type="text"
                    placeholder="Enter your highest qualification"
                    className="lg:mt-1 block w-full lg:h-10 h-8 lg:p-2 p-1 border border-gray-300 rounded-md  focus:ring-indigo-500"
                  />
                ) : (
                  <select
                    {...register("degree", {
                      required: "Please specify your degree",
                    })}
                    className="lg:mt-1 block w-full lg:h-10 h-8 lg:py-2 lg:px-3 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focussmorder-indigo-500"
                  >
                    <option value="">Select a Course</option>

                    <option value="High School (10th)">
                      High School (10th)
                    </option>
                    <option value="Intermediate (12th)">
                      Intermediate (12th)
                    </option>
                    <option value="Diploma in Engineering">
                      Diploma in Engineering
                    </option>
                    <option value="Diploma in Education">
                      Diploma in Education
                    </option>
                    <option value="Diploma in Architecture">
                      Diploma in Architecture
                    </option>
                    <option value="Diploma in Hotel Management">
                      Diploma in Hotel Management
                    </option>
                    <option value="Diploma in Fashion Designing">
                      Diploma in Fashion Designing
                    </option>
                    <option value="Diploma in Graphic Designing">
                      Diploma in Graphic Designing
                    </option>
                    <option value="Diploma in Digital Marketing">
                      Diploma in Digital Marketing
                    </option>
                    <option value="Diploma in Event Management">
                      Diploma in Event Management
                    </option>
                    <option value="Diploma in Interior Designing">
                      Diploma in Interior Designing
                    </option>
                    <option value="Diploma in Multimedia">
                      Diploma in Multimedia
                    </option>
                    <option value="Diploma in Medical Laboratory Technology">
                      Diploma in Medical Laboratory Technology
                    </option>
                    <option value="Diploma in Nursing">
                      Diploma in Nursing
                    </option>
                    <option value="Diploma in Paramedical Sciences">
                      Diploma in Paramedical Sciences
                    </option>
                    <option value="Diploma in Paramedical Sciences">
                      Diploma in Pharmacy
                    </option>

                    <option value="Polytechnic in Civil Engineering">
                      Polytechnic in Civil Engineering
                    </option>
                    <option value="Polytechnic in Mechanical Engineering">
                      Polytechnic in Mechanical Engineering
                    </option>
                    <option value="Polytechnic in Electrical Engineering">
                      Polytechnic in Electrical Engineering
                    </option>
                    <option value="Polytechnic in Electronics Engineering">
                      Polytechnic in Electronics Engineering
                    </option>
                    <option value="Polytechnic in Computer Science">
                      Polytechnic in Computer Science
                    </option>
                    <option value="Polytechnic in Automobile Engineering">
                      Polytechnic in Automobile Engineering
                    </option>
                    <option value="Polytechnic in Chemical Engineering">
                      Polytechnic in Chemical Engineering
                    </option>
                    <option value="Polytechnic in Textile Engineering">
                      Polytechnic in Textile Engineering
                    </option>

                    <option value="B.Sc. (Bachelor of Science)">
                      B.Sc. (Bachelor of Science)
                    </option>
                    <option value="B.Sc. (Hospitality and Hotel Management)">
                      B.Sc. (Hospitality and Hotel Management)
                    </option>
                    <option value="B.A. (Bachelor of Arts)">
                      B.A. (Bachelor of Arts)
                    </option>
                    <option value="B.Com. (Bachelor of Commerce)">
                      B.Com. (Bachelor of Commerce)
                    </option>
                    <option value="B.Tech (Bachelor of Technology)">
                      B.Tech (Bachelor of Technology)
                    </option>
                    <option value="B.E. (Bachelor of Engineering)">
                      B.E. (Bachelor of Engineering)
                    </option>
                    <option value="BBA (Bachelor of Business Administration)">
                      BBA (Bachelor of Business Administration)
                    </option>
                    <option value="BCA (Bachelor of Computer Applications)">
                      BCA (Bachelor of Computer Applications)
                    </option>
                    <option value="MBBS (Bachelor of Medicine, Bachelor of Surgery)">
                      MBBS (Bachelor of Medicine, Bachelor of Surgery)
                    </option>
                    <option value="BDS (Bachelor of Dental Surgery)">
                      BDS (Bachelor of Dental Surgery)
                    </option>
                    <option value="BAMS (Bachelor of Ayurvedic Medicine and Surgery)">
                      BAMS (Bachelor of Ayurvedic Medicine and Surgery)
                    </option>
                    <option value="BUMS (Bachelor of Unani Medicine and Surgery)">
                      BUMS (Bachelor of Unani Medicine and Surgery)
                    </option>
                    <option value="BHMS (Bachelor of Homeopathic Medicine and Surgery)">
                      BHMS (Bachelor of Homeopathic Medicine and Surgery)
                    </option>
                    <option value="BPT (Bachelor of Physiotherapy)">
                      BPT (Bachelor of Physiotherapy)
                    </option>
                    <option value="B.Ed. (Bachelor of Education)">
                      B.Ed. (Bachelor of Education)
                    </option>

                    <option value="M.Sc. (Master of Science)">
                      M.Sc. (Master of Science)
                    </option>
                    <option value="M.A. (Master of Arts)">
                      M.A. (Master of Arts)
                    </option>
                    <option value="M.Com. (Master of Commerce)">
                      M.Com. (Master of Commerce)
                    </option>
                    <option value="M.Tech (Master of Technology)">
                      M.Tech (Master of Technology)
                    </option>
                    <option value="M.E. (Master of Engineering)">
                      M.E. (Master of Engineering)
                    </option>
                    <option value="MBA (Master of Business Administration)">
                      MBA (Master of Business Administration)
                    </option>
                    <option value="MCA (Master of Computer Applications)">
                      MCA (Master of Computer Applications)
                    </option>
                    <option value="MD (Doctor of Medicine)">
                      MD (Doctor of Medicine)
                    </option>
                    <option value="MS (Master of Surgery)">
                      MS (Master of Surgery)
                    </option>
                    <option value="MDS (Master of Dental Surgery)">
                      MDS (Master of Dental Surgery)
                    </option>
                    <option value="MAMS (Master of Ayurvedic Medicine and Surgery)">
                      MAMS (Master of Ayurvedic Medicine and Surgery)
                    </option>
                    <option value="MHMS (Master of Homeopathic Medicine and Surgery)">
                      MHMS (Master of Homeopathic Medicine and Surgery)
                    </option>
                    <option value="MPT (Master of Physiotherapy)">
                      MPT (Master of Physiotherapy)
                    </option>
                    <option value="M.Ed. (Master of Education)">
                      M.Ed. (Master of Education)
                    </option>
                    <option value="PhD (Doctor of Philosophy)">
                      PhD (Doctor of Philosophy)
                    </option>
                    <option value="Other">Type Yourself</option>
                  </select>
                )}
                {errors.degree && (
                  <span className="text-red-500 text-sm">
                    {errors.degree.message}
                  </span>
                )}
                {errors["other-degree"] && (
                  <span className="text-red-500 text-sm">
                    {errors["other-degree"].message}
                  </span>
                )}
              </div>

              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Employed In{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                {employedIn ? (
                  <input
                    {...register("other-employedIn", {
                      required: "Please specify your employment",
                    })}
                    type="text"
                    placeholder="Type your employment here"
                    className="lg:mt-1 block w-full lg:h-10 h-8 lg:p-2 p-1 border border-gray-300 rounded-md"
                  />
                ) : (
                  <select
                    {...register("employedIn", {
                      required: " Employment is required",
                    })}
                    className="lg:mt-1 block w-full lg:h-10 h-8 lg:p-2 p-1 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a value</option>
                    <option value="Business /Self Employed">
                      Business / Self Employed
                    </option>
                    <option value="Government / Public Sector">
                      Government / Public Sector
                    </option>
                    <option value="Private Sector">Private Sector</option>
                    <option value="Defence">Defence</option>
                    <option value="Civil Services">Civil Services</option>
                    <option value="Not Working">Not Working</option>
                    <option value="Other">Type Yourself</option>
                  </select>
                )}
                {errors.employedIn && (
                  <span className="text-red-500 text-sm">
                    {errors.employedIn.message}
                  </span>
                )}
                {errors["other-employedIn"] && (
                  <span className="text-red-500 text-sm">
                    {errors["other-employedIn"].message}
                  </span>
                )}
              </div>

              {/* <div className="w-1/2">
              <label className="block lg:text-lg font-semibold">
                Institution Name{" "}
              </label>
              <input
                type="text"
                placeholder="Highest education"
                {...register("institute")}
                className="lg:mt-1 block w-full lg:h-10 h-8 lg:p-2 p-1 border border-gray-300 rounded-md"
              />
            </div> */}
            </div>

            {!not && (
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block lg:text-lg font-semibold">
                    Occupation{" "}
                    <span className="text-red-700 justify-start">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Designation / post"
                    {...register("occupation", {
                      required: "Please specify your occupation.",
                    })}
                    className="lg:mt-1 block w-full lg:h-10 h-8 lg:p-2 p-1 border border-gray-300 rounded-md"
                  />

                  {errors.occupation && (
                    <span className="text-red-500 text-sm">
                      {errors.occupation.message}
                    </span>
                  )}
                </div>

                <div className="w-1/2">
                  <label className="block lg:text-lg font-semibold">
                    Income <span className="text-red-700 justify-start">*</span>
                  </label>
                  <select
                    {...register("income", {
                      required: "Please enter your income",
                    })}
                    className="lg:mt-1 block w-full lg:h-10 h-8 lg:py-2 lg:px-3 border border-gray-300 rounded-md focus:ring-indigo-500"
                  >
                    <option value="">Select Annual Income Range</option>
                    <option value="Below 1 Lakhs">Below ₹1 Lakh</option>
                    <option value="1 Lakh - 2 Lakhs">₹1 Lakh - ₹2 Lakhs</option>
                    <option value="2 Lakhs - 3 Lakhs">
                      ₹2 Lakhs - ₹3 Lakhs
                    </option>
                    <option value="3 Lakhs - 4 Lakhs">
                      ₹3 Lakhs - ₹4 Lakhs
                    </option>
                    <option value="4 Lakhs - 5 Lakhs">
                      ₹4 Lakhs - ₹5 Lakhs
                    </option>
                    <option value="5 Lakhs - 6 Lakhs">
                      ₹5 Lakhs - ₹6 Lakhs
                    </option>
                    <option value="6 Lakhs - 7 Lakhs">
                      ₹6 Lakhs - ₹7 Lakhs
                    </option>
                    <option value="7 Lakhs - 8 Lakhs">
                      ₹7 Lakhs - ₹8 Lakhs
                    </option>
                    <option value="8 Lakhs - 10 Lakhs">
                      ₹8 Lakhs - ₹10 Lakhs
                    </option>
                    <option value="10 Lakhs - 12 Lakhs">
                      ₹10 Lakhs - ₹12 Lakhs
                    </option>
                    <option value="12 Lakhs - 15 Lakhs">
                      ₹12 Lakhs - ₹15 Lakhs
                    </option>
                    <option value="15 Lakhs - 20 Lakhs">
                      ₹15 Lakhs - ₹20 Lakhs
                    </option>
                    <option value="20 Lakhs - 25 Lakhs">
                      ₹20 Lakhs - ₹25 Lakhs
                    </option>
                    <option value="25 Lakhs - 35 Lakhs">
                      ₹25 Lakhs - ₹30 Lakhs
                    </option>
                    <option value="35 Lakhs - 50 Lakhs">
                      ₹30 Lakhs - ₹35 Lakhs
                    </option>
                    <option value="50 Lakhs - 70 Lakhs">
                      ₹35 Lakhs - ₹40 Lakhs
                    </option>
                    <option value="50 Lakhs - 70 Lakhs">
                      ₹40 Lakhs - ₹45 Lakhs
                    </option>
                    <option value="50 Lakhs - 70 Lakhs">
                      ₹45 Lakhs - ₹55 Lakhs
                    </option>
                    <option value="50 Lakhs - 70 Lakhs">
                      ₹55 Lakhs - ₹65 Lakhs
                    </option>
                    <option value="50 Lakhs - 70 Lakhs">
                      ₹65 Lakhs - ₹75 Lakhs
                    </option>
                    <option value="35 Lakhs - 50 Lakhs">
                      ₹75 Lakhs - ₹1 Crore
                    </option>
                    <option value="Above 1 Crore">Above ₹1 Crore</option>
                    <option value="Can't Specify">Can't Specify</option>
                  </select>

                  {errors.income && (
                    <span className="text-red-500 text-sm">
                      {errors.income.message}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="justify-center flex">
              <button
                type="submit"
                className="lg:w-[50%] mt-4 lg:text-xl bg-pink-700 font-bold text-white p-2 rounded-md hover:bg-pink-600"
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

export default Form2;
