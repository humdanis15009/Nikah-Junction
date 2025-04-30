import About from "./About";
import Footer from "./Footer";
import GetStarted from "./GetStarted";
import Header from "./Header";
import Process from "./Process";
import Register from "./Register";
import Login from "./Login";
import Why from "./Why";
import Reviews from "./Reviews";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

function Home() {
  const [reflect, setReflect] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Nikah Junction - Trusted Muslim Matrimony Service</title>
        <meta
          name="description"
          content="Join Nikah Junction, India's trusted Muslim matrimony platform. Find your perfect life partner with ease. Register today!"
        />
        <meta
          name="keywords"
          content="Muslim matrimony, Nikah Junction, matrimony service, Muslim marriage, Islamic wedding, find rishta, matrimony India"
        />
        <meta name="author" content="Nikah Junction" />
        <link rel="canonical" href="https://nikahjunction.netlify.app" />
        <meta
          property="og:title"
          content="Nikah Junction - Trusted Muslim Matrimony Service"
        />
        <meta
          property="og:description"
          content="Nikah Junction helps you find your ideal life partner. Register now to connect with compatible matches!"
        />
        <meta
          property="og:image"
          content="https://nikahjunction.netlify.app/nikah-logo1.png"
        />
        <meta property="og:url" content="https://nikahjunction.netlify.app" />
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
      <div className="flex relative">
        <img
          src="images/background3.jpg"
          className="hidden md:block h-screen w-full"
          alt="background"
        />
        <img
          src="images/background-mobile.jpg"
          className="md:hidden h-[95vh] w-full"
          alt="background"
        />
        <Header
          onData={(login) => {
            setReflect(login);
          }}
        />

        {reflect ? (
          <Login
            onRegister={(f) => {
              setReflect(f);
            }}
          />
        ) : (
          <Register />
        )}
      </div>
      <About />
      <div className="w-full bg-pink-50">
        <Process />
      </div>
      <Reviews />
      <GetStarted />
      <Why />
      <Footer />
    </>
  );
}

export default Home;
