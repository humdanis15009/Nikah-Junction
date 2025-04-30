import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <Helmet>
        <title>Privacy Policy - Nikah Junction</title>
        <meta
          name="description"
          content="Join Nikah Junction, India's trusted Muslim matrimony platform. Find your perfect life partner with ease. Register today!"
        />
        <meta
          name="keywords"
          content="Muslim matrimony, Nikah Junction, matrimony service, Muslim marriage, Islamic wedding, find rishta, matrimony India"
        />
        <meta name="author" content="Nikah Junction" />
        <link rel="canonical" href="https://nikahjunction.netlify.app/Privacy" />
        <meta
          property="og:title"
          content="Privacy Policy - Nikah Junction"
        />
        <meta
          property="og:description"
          content="Nikah Junction helps you find your ideal life partner. Register now to connect with compatible matches!"
        />
        <meta
          property="og:image"
          content="https://nikahjunction.netlify.app/nikah-logo1.png"
        />
        <meta property="og:url" content="https://nikahjunction.netlify.app/Privacy" />
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
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="lg:text-4xl text-2xl font-bold lg:my-6 mb-2 text-center text-pink-700">
          Privacy Policy
        </h1>
        <p className="mb-4 lg:text-[18px] text-[16px]">
          At &ldquo;Nikah Junction&rdquo;, we are committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, and
          disclose your personal information.
        </p>

        <h2 className="lg:text-2xl text-lg font-semibold lg:mb-3">
          1. Information We Collect:
        </h2>
        <p className="mb-4 lg:text-[18px] text-[16px]">
          We collect the following types of information:
          <ul className="list-disc list-inside ml-5">
            <li>
              <strong>Personal Information:</strong> Includes your name, email
              address, phone number, and other details you provide when
              registering.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our
              website, such as IP address, browser type, and pages visited.
            </li>
            <li>
              <strong>Cookies:</strong> Small data files stored on your device
              to enhance your user experience.
            </li>
          </ul>
        </p>

        <h2 className="lg:text-2xl text-lg font-semibold lg:mb-3">
          2. How We Use Your Information:
        </h2>
        <p className="mb-4 lg:text-[18px] text-[16px]">
          We use your information to:
          <ul className="list-disc list-inside ml-5">
            <li>
              <strong>Provide and Improve Our Services:</strong> To enhance your
              experience on &ldquo;Nikah Junction&rdquo; and tailor content to your
              preferences.
            </li>
            <li>
              <strong>Communicate with You:</strong> To send you updates,
              newsletters, and other relevant information.
            </li>
            <li>
              <strong>Ensure Security:</strong> To protect our website and
              prevent fraudulent activities.
            </li>
          </ul>
        </p>

        <h2 className="lg:text-2xl text-lg font-semibold lg:mb-3">
          3. Sharing Your Information:
        </h2>
        <p className="mb-4 lg:text-[18px] text-[16px]">
          We do not share your personal information with third parties except:
          <ul className="list-disc list-inside ml-5">
            <li>
              <strong>Service Providers:</strong> Who assist us in operating our
              website and providing services to you.
            </li>
            <li>
              <strong>Legal Requirements:</strong> If required by law or to
              protect our rights and safety.
            </li>
          </ul>
        </p>

        <h2 className="lg:text-2xl text-lg font-semibold lg:mb-3">
          4. Your Choices:
        </h2>
        <p className="mb-4 lg:text-[18px] text-[16px]">
          You have the right to:
          <ul className="list-disc list-inside ml-5">
            <li>
              <strong>Access and Update Your Information:</strong> By logging
              into your account or contacting us.
            </li>
            <li>
              <strong>Opt-Out:</strong> From receiving marketing communications
              by following the unsubscribe instructions.
            </li>
          </ul>
        </p>

        <h2 className="lg:text-2xl text-lg font-semibold :mb-3">
          5. Security:
        </h2>
        <p className="mb-4 lg:text-[18px] text-[16px]">
          We implement security measures to protect your personal information.
          However, no online transmission or electronic storage method is
          completely secure.
        </p>

        <h2 className="lg:text-2xl text-lg font-semibold lg:mb-3">
          6. Changes to This Policy:
        </h2>
        <p className="mb-4 lg:text-[18px] text-[16px]">
          We may update this Privacy Policy from time to time. We will notify
          you of any significant changes by posting the new policy on our
          website.
        </p>

        <h2 className="lg:text-2xl text-lg font-semibold lg:mb-3">
          7. Contact Us:
        </h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a
            href="mailto:nikahjunction@gmail.com"
            className="text-blue-500 hover:underline"
          >
            nikahjunction@gmail.com
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default Privacy;
