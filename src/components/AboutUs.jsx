import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <Helmet>
        <title>About Us - Nikah Junction</title>
        <meta
          name="description"
          content="Join Nikah Junction, India's trusted Muslim matrimony platform. Find your perfect life partner with ease. Register today!"
        />
        <meta
          name="keywords"
          content="Muslim matrimony, Nikah Junction, matrimony service, Muslim marriage, Islamic wedding, find rishta, matrimony India"
        />
        <meta name="author" content="Nikah Junction" />
        <link rel="canonical" href="https://nikahjunction.netlify.app/AboutUs" />
        <meta
          property="og:title"
          content="About Us - Nikah Junction"
        />
        <meta
          property="og:description"
          content="Nikah Junction helps you find your ideal life partner. Register now to connect with compatible matches!"
        />
        <meta
          property="og:image"
          content="https://nikahjunction.netlify.app/nikah-logo1.png"
        />
        <meta property="og:url" content="https://nikahjunction.netlify.app/AboutUs" />
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
      
      <div className="bg-gray-100 flex text-gray-800 min-h-screen">
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="lg:text-4xl text-2xl font-bold text-pink-700 text-center lg:my-6 my-2">
            About Us
          </h1>
          <p className="lg:text-lg lg:mb-6 mb-4">
            Welcome to{" "}
            <span className="font-bold text-gray-600">Nikah Junction</span>, the
            premier online platform dedicated to bringing together Muslims
            seeking marriage. Our mission is to provide a{" "}
            <span className="font-bold text-gray-600">trusted</span> and{" "}
            <span className="font-bold text-gray-600">authentic</span> service
            that aligns with Islamic values and principles.
          </p>

          <h2 className="lg:text-2xl text-lg font-semibold text-gray-800 lg:mb-4">
            Our Founder:
          </h2>
          <div className="lg:flex items-center lg:mb-6">
            <div className="lg:w-[500px] w-[120px] float-left lg:mr-6 mr-3">
              <img
                className="rounded-lg "
                src="images/Founder.jpeg"
                alt="Haji Abdul Khaliq"
              />
            </div>
            <p className="lg:text-lg">
              {" "}
              <span className="font-bold text-gray-600">
                Haji Abdul Khaliq
              </span>{" "}
              is the visionary behind Nikah Junction.He is also the founder of
              &nbsp;
              <span className="font-bold text-gray-600">
                Khidmat-e-Khalq
              </span>{" "}
              foundation which has been running parallel to the Nikah Junction
              since 1994. He is retired from the post of{" "}
              <span className="font-bold text-gray-600">Chief Post Master</span>{" "}
              , Lucknow division. With years of experience in the field of
              matrimonial services, Haji Abdul Khaliq has always been driven by
              a passion to help individuals find their ideal life partners in
              accordance with{" "}
              <span className="font-bold text-gray-600">
                Islamic traditions
              </span>
              . His dedication and commitment to providing a respectful and
              reliable service form the cornerstone of our platform.
            </p>
          </div>

          <h2 className="lg:text-2xl text-lg font-semibold text-gray-800 lg:mb-4 mt-4">
            Our Mission:
          </h2>
          <p className="lg:text-lg mb-6">
            At Nikah Junction, our mission is to foster meaningful and lasting
            connections within the Muslim community. We strive to offer a
            platform that ensures:
          </p>
          <ul className="list-disc list-inside lg:mb-6 mb-3 pl-5">
            <li>
              <span className="font-bold text-gray-600">Confidentiality</span>{" "}
              and <span className="font-bold text-gray-600">security</span> for
              all users.
            </li>
            <li>
              <span className="font-bold text-gray-600">Ease of use</span> with
              a user-friendly interface.
            </li>
            <li>
              A range of{" "}
              <span className="font-bold text-gray-600">
                customizable search options
              </span>{" "}
              to meet individual preferences.
            </li>
            <li>
              <span className="font-bold text-gray-600">
                Cultural and religious sensitivity
              </span>{" "}
              in all interactions.
            </li>
          </ul>

          <h2 className="lg:text-2xl text-lg font-semibold text-gray-800 lg:mb-4 mt-4">
            Our Values:
          </h2>
          <p className="lg:text-lg lg:mb-6">
            We are guided by the principles of{" "}
            <span className="font-bold text-gray-600">honesty</span>,{" "}
            <span className="font-bold text-gray-600">integrity</span>, and{" "}
            <span className="font-bold text-gray-600">respect</span>. We believe
            that every individual deserves a matrimonial journey that is both{" "}
            <span className="font-bold text-gray-600">dignified</span> and{" "}
            <span className="font-bold text-gray-600">supportive</span>. Our
            team is dedicated to upholding these values in every aspect of our
            service.
          </p>

          <h2 className="lg:text-2xl text-lg font-semibold text-gray-800 lg:mb-4 mt-4">
            Contact Us:
          </h2>
          <p className="lg:text-lg lg:mb-6">
            If you have any questions or need assistance, please do not hesitate
            to reach out to us. We are here to help you on your path to finding
            a meaningful and fulfilling partnership.
          </p>

          <p className="lg:text-lg">
            Thank you for choosing Nikah Junction, where your journey to finding
            a life partner begins with trust and care.
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
