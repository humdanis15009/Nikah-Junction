import { useNavigate } from "react-router-dom";
import Picture from "./Picture";
import Mobile from "./Mobile";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

function Verify() {
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
      alert("You cannot go back to Form 3 as it is already completed.");
    };

    return () => {
      window.onpopstate = null; // Cleanup
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Upload images and verification - Nikah Junction</title>
        <meta
          name="description"
          content="Join Nikah Junction, India's trusted Muslim matrimony platform. Find your perfect life partner with ease. Register today!"
        />
        <meta
          name="keywords"
          content="Muslim matrimony, Nikah Junction, matrimony service, Muslim marriage, Islamic wedding, find rishta, matrimony India"
        />
        <meta name="author" content="Nikah Junction" />
        <link rel="canonical" href="https://nikahjunction.netlify.app/Verify" />
        <meta
          property="og:title"
          content="Upload images and verification - Nikah Junction"
        />
        <meta
          property="og:description"
          content="Nikah Junction helps you find your ideal life partner. Register now to connect with compatible matches!"
        />
        <meta
          property="og:image"
          content="https://nikahjunction.netlify.app/nikah-logo1.png"
        />
        <meta property="og:url" content="https://nikahjunction.netlify.app/Verify" />
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
      <div className="min-h-screen">
        <Picture />
        <Mobile />
        <div className="justify-center flex">
          <button
            onClick={() => navigate(`/UserCardList`)}
            className="w-40 lg:my-6 mb-6 lg:text-xl bg-pink-700 font-semibold text-white p-1 rounded-md hover:bg-pink-600"
          >
            Skip for now
          </button>
        </div>
      </div>
    </>
  );
}

export default Verify;
