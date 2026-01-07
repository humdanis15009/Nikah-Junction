import { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import FetchAndGeneratePDF from "./FetchAndGeneratePDF";
import { onAuthStateChanged } from "firebase/auth";
import QRCode from "react-qr-code";
import { Helmet } from "react-helmet-async";

const UserCardList = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uid, setUserId] = useState("");
  const [amount] = useState(1000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const merchantUpiId = "9807419006@kotak811";
  const userName = "Nikah Junction";

  const upiUrl = `upi://pay?pa=${merchantUpiId}&pn=${encodeURIComponent(
    userName
  )}&am=${amount}&cu=INR`;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (uid) {
        const userDoc = doc(db, "Biodata", uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          setUser({ id: userSnapshot.id, ...userSnapshot.data() });
        } else {
          console.log("No such document!");
        }
        setLoading(false);
      }
    };

    fetchUser();
  }, [uid]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const Shimmer = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="animate-pulse bg-white rounded-lg shadow-lg w-full max-w-[600px] p-4">
        <div
          className="rounded-lg shadow-lg p-8 border border-gray-300"
          style={{ maxWidth: "210mm", minHeight: "297mm" }}
        >
          {/* Shimmering Text Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <Shimmer />;
  if (!user) return <div>No user found</div>;

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
    <Helmet>
        <title>User Biodata - Nikah Junction</title>
        <meta
          name="description"
          content="Join Nikah Junction, India's trusted Muslim matrimony platform. Find your perfect life partner with ease. Register today!"
        />
        <meta
          name="keywords"
          content="Muslim matrimony, Nikah Junction, matrimony service, Muslim marriage, Islamic wedding, find rishta, matrimony India"
        />
        <meta name="author" content="Nikah Junction" />
        <link rel="canonical" href="https://nikahjunction.netlify.app/UserCardList" />
        <meta
          property="og:title"
          content="User Biodata - Nikah Junction"
        />
        <meta
          property="og:description"
          content="Nikah Junction helps you find your ideal life partner. Register now to connect with compatible matches!"
        />
        <meta
          property="og:image"
          content="https://nikahjunction.netlify.app/nikah-logo1.png"
        />
        <meta property="og:url" content="https://nikahjunction.netlify.app/UserCardList" />
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
      <button
        onClick={toggleModal}
        className="hidden md:block fixed bottom-20 text-2xl font-bold right-14 border-4 border-gray-700 text-white p-4 px-10 bg-pink-700 rounded-full hover:bg-pink-600 transition-transform transform hover:scale-105 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-700 animate-pulse ring-offset-2 ring-offset-white"
      >
        PAY NOW
      </button>
      <button
        onClick={toggleModal}
        className="md:hidden h-12 w-full z-50 fixed bottom-0 text-lg font-bold text-white py-2 bg-pink-700 hover:bg-pink-600"
      >
        PAY NOW
      </button>

      <div>
        <FetchAndGeneratePDF userId={uid} />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-300 to-blue-400 p-6">
          <h1 className="lg:text-5xl text-3xl font-bold text-center mb-6 drop-shadow-lg">
            Congratulations! 🎉
          </h1>
          <p className="lg:text-xl font-semibold text-center mb-6 drop-shadow-md">
            You've successfully completed your registration with Nikah Junction!
          </p>
          <p className="lg:text-lg font-semibold text-center mb-6 drop-shadow-md">
            Our dedicated team is now on the case, working hard to find you the
            best matches tailored to your preferences.
          </p>
          <p className="lg:text-lg font-semibold text-center">
            Get ready to embark on your journey of love and companionship. ❤️
          </p>
          <p className="lg:text-lg font-semibold text-center mt-6">
            Thank you for choosing Nikah Junction! We’ll be in touch soon!
          </p>
        </div>
      </div>

      {/* UPI Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 font-extrabold right-2 text-gray-600 hover:text-gray-900"
            >
              X
            </button>
            <h1 className="lg:text-3xl text-2xl text-pink-700 text-center font-bold mb-8">
              Complete Your Payment
            </h1>

            <div className="flex justify-center mb-6">
              <QRCode value={upiUrl} lg:size={180} size={140} />
            </div>

            <p className="text-lg text-center font-medium text-gray-600 mb-2">
              UPI ID:{" "}
              <span className="font-mono text-gray-800">{merchantUpiId}</span>
            </p>

            <p className="text-xl text-center font-bold text-gray-700 mb-6">
              Amount: ₹{amount}
              <span className="block text-blue-500 mt-4">
                Scan the QR Code to pay!
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCardList;
