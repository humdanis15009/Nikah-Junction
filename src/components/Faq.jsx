import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <Helmet>
        <title>Frequently Asked Questions - Nikah Junction</title>
        <meta
          name="description"
          content="Join Nikah Junction, India's trusted Muslim matrimony platform. Find your perfect life partner with ease. Register today!"
        />
        <meta
          name="keywords"
          content="Muslim matrimony, Nikah Junction, matrimony service, Muslim marriage, Islamic wedding, find rishta, matrimony India"
        />
        <meta name="author" content="Nikah Junction" />
        <link rel="canonical" href="https://nikahjunction.netlify.app/Faq" />
        <meta
          property="og:title"
          content="Frequently Asked Questions - Nikah Junction"
        />
        <meta
          property="og:description"
          content="Nikah Junction helps you find your ideal life partner. Register now to connect with compatible matches!"
        />
        <meta
          property="og:image"
          content="https://nikahjunction.netlify.app/nikah-logo1.png"
        />
        <meta property="og:url" content="https://nikahjunction.netlify.app/Faq" />
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
      <div className="container mx-auto p-6">
        <h1 className="lg:text-4xl text-2xl text-pink-700 font-bold lg:mb-6 text-center">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="lg:text-xl text-lg font-semibold mb-3">
              What is Muslim Matrimony?
            </h2>
            <blockquote className="lg:border-l-4 border-l-2 border-blue-500 lg:text-[18px] text-[16px] pl-4 italic text-gray-700">
              &ldquo;Muslim Matrimony is a platform designed to help Muslim
              individuals find suitable life partners in accordance with Islamic
              traditions and values.&rdquo;
            </blockquote>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="lg:text-xl text-lg font-semibold mb-3">
              How do I create a profile?
            </h2>
            <blockquote className="lg:border-l-4 border-l-2 border-blue-500 lg:text-[18px] text-[16px] pl-4 italic text-gray-700">
              &ldquo;To create a profile, click on the &lsquo;Sign Up&rsquo;
              button on the homepage and fill out the registration form with
              your personal details and preferences. Once submitted, you can
              start browsing profiles.&rdquo;
            </blockquote>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="lg:text-xl text-lg font-semibold mb-3">
              Is there a fee to use the site?
            </h2>
            <blockquote className="lg:border-l-4 border-l-2 border-blue-500 lg:text-[18px] text-[16px] pl-4 italic text-gray-700">
              &ldquo;We charge Rs.1000 only for registration after you fill up
              your biodata. These charges are applicable till you get married
              and after that we have our service fulfillment charges.&rdquo;
            </blockquote>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="lg:text-xl text-lg font-semibold mb-3">
              How can I ensure my privacy?
            </h2>
            <blockquote className="lg:border-l-4 border-l-2 border-blue-500 lg:text-[18px] text-[16px] pl-4 italic text-gray-700">
              &ldquo;We prioritize your privacy and employ robust security
              measures to protect your personal information. You can manage your
              privacy settings in your account dashboard to control who can view
              your profile.&rdquo;
            </blockquote>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="lg:text-xl text-lg font-semibold mb-3">
              What should I do if I encounter inappropriate behavior?
            </h2>
            <blockquote className="lg:border-l-4 border-l-2 border-blue-500 lg:text-[18px] text-[16px] pl-4 italic text-gray-700">
              &ldquo;If you experience or observe any inappropriate behavior,
              please report it to our support team using the
              &lsquo;Report&rsquo; feature on the user&apos;s profile page. We
              take such reports seriously and will take appropriate
              action.&rdquo;
            </blockquote>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="lg:text-xl text-lg font-semibold mb-3">
              How can I contact customer support?
            </h2>
            <blockquote className="lg:border-l-4 border-l-2 border-blue-500 lg:text-[18px] text-[16px] pl-4 italic text-gray-700">
              &ldquo;You can contact customer support through the &lsquo;Contact
              Us&rsquo; page on our website, or by sending an email to
              nikahjunction@gmail.com.&rdquo;
            </blockquote>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="lg:text-xl text-lg font-semibold mb-3">
              Are there any success stories from users?
            </h2>
            <blockquote className="lg:border-l-4 border-l-2 border-blue-500 lg:text-[18px] text-[16px] pl-4 italic text-gray-700">
              &ldquo;Yes, we have numerous success stories from users who have
              found their life partners through our platform. Check our
              &lsquo;Success Stories&rsquo; section for more information.&rdquo;
            </blockquote>
          </div>

          {/* New FAQs */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="lg:text-xl text-lg font-semibold mb-3">
              How safe is it to use this website?
            </h2>
            <blockquote className="lg:border-l-4 border-l-2 border-blue-500 lg:text-[18px] text-[16px] pl-4 italic text-gray-700">
              &ldquo;We take the safety of our users very seriously. Our
              platform uses advanced encryption technologies and strict privacy
              policies to protect your data. We also continuously monitor for
              any suspicious activities to ensure a safe experience for all
              users.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
