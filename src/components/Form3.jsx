import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../Firebase";
import { updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Helmet } from "react-helmet-async";

const Form3 = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [bro, setBro] = useState(false);
  const [sis, setSis] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedBro = watch("bro");
  const selectedSis = watch("sis");

  const [userId, setUserId] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
      alert("You cannot go back to Form 2 as it is already completed.");
    };

    return () => {
      window.onpopstate = null;
    };
  }, []);

  useEffect(() => {
    if (selectedBro === "None" || selectedBro === "") setBro(false);
    else setBro(true);
  }, [selectedBro]);

  useEffect(() => {
    if (selectedSis === "None" || selectedSis === "") setSis(false);
    else setSis(true);
  }, [selectedSis]);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Update Firestore document with new data
      await updateDoc(doc(db, "Biodata", userId), { ...data });
      console.log("User data updated successfully");
      navigate(`/Verify`);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Family Details - Nikah Junction</title>
        <meta
          name="description"
          content="Join Nikah Junction, India's trusted Muslim matrimony platform. Find your perfect life partner with ease. Register today!"
        />
        <meta
          name="keywords"
          content="Muslim matrimony, Nikah Junction, matrimony service, Muslim marriage, Islamic wedding, find rishta, matrimony India"
        />
        <meta name="author" content="Nikah Junction" />
        <link rel="canonical" href="https://nikahjunction.netlify.app/Form3" />
        <meta
          property="og:title"
          content="Family Details - Nikah Junction"
        />
        <meta
          property="og:description"
          content="Nikah Junction helps you find your ideal life partner. Register now to connect with compatible matches!"
        />
        <meta
          property="og:image"
          content="https://nikahjunction.netlify.app/nikah-logo1.png"
        />
        <meta property="og:url" content="https://nikahjunction.netlify.app/Form3" />
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
        <div className="max-w-5xl mx-auto p-6  bg-white shadow-2xl border-t-2 rounded-lg">
          <h1 className="lg:text-4xl text-2xl text-pink-700 font-bold text-center mb-6">
            Family Details
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold"
                  htmlFor="fStatus">
                  Family Status{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <select
                  {...register("familyStatus", {
                    required: "Family Status is required",
                  })}
                  className="lg:mt-1 lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
                  id="fStatus"
                >
                  <option value="">Select a value</option>
                  <option value="Lower Middle Class">Lower Middle Class</option>
                  <option value="Middle Class">Middle Class</option>
                  <option value="Upper Middle Class">Upper Middle Class</option>
                  <option value="Rich / Affluent">Rich / Affluent</option>
                </select>
                {errors.familyStatus && (
                  <span className="text-red-500 text-sm">
                    {errors.familyStatus.message}
                  </span>
                )}
              </div>

              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Family Values{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <select
                  {...register("familyLifestyle", {
                    required: "Family Lifestyle is required",
                  })}
                  className="lg:mt-1 lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
                >
                  <option value="">Select a value</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Moderate/Medium">Moderate/Medium</option>
                  <option value="Modern">Modern</option>
                  <option value="Very Religious">Very Religious</option>
                </select>
                {errors.familyLifestyle && (
                  <span className="text-red-500 text-sm">
                    {errors.familyLifestyle.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Father&apos;s Name{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <input
                  type="text"
                  {...register("fatherName", {
                    required: "Father's Name is required",
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
                  className="lg:mt-1 lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
                />
                {errors.fatherName && (
                  <span className="text-red-500 text-sm">
                    {errors.fatherName.message}
                  </span>
                )}
              </div>

              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Father&apos;s Job{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <select
                  {...register("fatherOccupation", {
                    required: "Father's Occupation is required",
                  })}
                  className="lg:mt-1 lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
                >
                  <option value="">Select occupation</option>
                  <option value="Business Self Employed">
                    Business/Self Employed
                  </option>
                  <option value="Private Sector">Private Sector</option>
                  <option value="Government / PSU">Government / PSU</option>
                  <option value="Defence">Defence</option>
                  <option value="Civil Services">Civil Services</option>
                  <option value="Politician">Politician</option>
                  <option value="Social Workers">Social Workers</option>
                  <option value="Not Working">Not Working</option>
                  <option value="Retired">Retired</option>
                  <option value="Late">Late</option>
                  <option value="Other">Other</option>
                </select>
                {errors.fatherOccupation && (
                  <span className="text-red-500 text-sm">
                    {errors.fatherOccupation.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Mother&apos;s Name{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <input
                  type="text"
                  {...register("motherName", {
                    required: "Mother's Name is required",
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
                  className="lg:mt-1 lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
                />
                {errors.motherName && (
                  <span className="text-red-500 text-sm">
                    {errors.motherName.message}
                  </span>
                )}
              </div>

              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  Mother&apos;s Job{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <select
                  {...register("motherOccupation", {
                    required: "Mother's Occupation is required",
                  })}
                  className="lg:mt-1 lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
                >
                  <option value="">Select occupation</option>
                  <option value="Homemaker / Housewife">
                    Homemaker / Housewife
                  </option>
                  <option value="Business Self Employed">
                    Business/Self Employed
                  </option>
                  <option value="Private Sector">Private Sector</option>
                  <option value="Government PSU">Government PSU</option>
                  <option value="Defence">Defence</option>
                  <option value="Civil Services">Civil Services</option>
                  <option value="Politician">Politician</option>
                  <option value="Social Workers">Social Workers</option>
                  <option value="Not Working">Not Working</option>
                  <option value="Retired">Retired</option>
                  <option value="Late">Late</option>
                  <option value="Other">Other</option>
                </select>
                {errors.motherOccupation && (
                  <span className="text-red-500 text-sm">
                    {errors.motherOccupation.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  No. of Brothers{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <select
                  {...register("bro", {
                    required: "This field is required",
                  })}
                  className="lg:mt-1 lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
                >
                  <option value="">Select a value</option>
                  <option value="None">None</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
                {errors.bro && (
                  <span className="text-red-500 text-sm">
                    {errors.bro.message}
                  </span>
                )}
              </div>

              <div className="w-1/2">
                {bro && (
                  <div>
                    <label className="block lg:text-lg font-semibold">
                      How many married?{" "}
                      <span className="text-red-700 justify-start">*</span>
                    </label>
                    <select
                      {...register("marriedBro", {
                        required: "This field is required",
                      })}
                      className="lg:mt-1 lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
                    >
                      <option value="">Select a value</option>
                      <option value="None">None</option>
                      {[
                        ...Array(
                          Number(selectedBro === "None" ? 0 : selectedBro)
                        ).keys(),
                      ].map((i) => {
                        return (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        );
                      })}
                    </select>
                    {errors.marriedBro && (
                      <span className="text-red-500 text-sm">
                        {errors.marriedBro.message}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block lg:text-lg font-semibold">
                  No. of Sisters{" "}
                  <span className="text-red-700 justify-start">*</span>
                </label>
                <select
                  {...register("sis", {
                    required: "This field is required",
                  })}
                  className="lg:mt-1 lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
                >
                  <option value="">Select a value</option>
                  <option value="None">None</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
                {errors.sis && (
                  <span className="text-red-500 text-sm">
                    {errors.sis.message}
                  </span>
                )}
              </div>

              <div className="w-1/2">
                {sis && (
                  <div>
                    <label className="block lg:text-lg font-semibold">
                      How many married?{" "}
                      <span className="text-red-700 justify-start">*</span>
                    </label>
                    <select
                      {...register("marriedSis", {
                        required: "This field is required",
                      })}
                      className="lg:mt-1 lg:h-10 h-8 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
                    >
                      <option value="">Select a value</option>
                      <option value="None">None</option>
                      {[
                        ...Array(
                          Number(selectedSis === "None" ? 0 : selectedSis)
                        ).keys(),
                      ].map((i) => {
                        return (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        );
                      })}
                    </select>
                    {errors.marriedSis && (
                      <span className="text-red-500 text-sm">
                        {errors.marriedSis.message}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* <div className="w-full">
            <label className="block lg:text-lg font-semibold">
              About Family{" "}
            </label>
            <textarea
              rows={1}
              type="text"
              {...register("family")}
              className="lg:mt-1 block w-full lg:p-2 p-1 border border-gray-300 rounded-md"
              placeholder="Write about your family details in brief..."
            />
          </div> */}

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

export default Form3;
