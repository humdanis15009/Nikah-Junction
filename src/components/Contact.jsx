import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import emailjs from "emailjs-com";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    emailjs
      .send(
        "service_37lwd7i",
        "template_vjsa7sk",
        formData,
        "XvHNn33SZ53C66bjB"
      )
      .then(
        (result) => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", number: "", message: "" });
          setLoading(false);
        },
        (error) => {
          console.error("Error sending message:", error);
          setStatus("Failed to send the message. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Nikah Junction</title>
        <meta
          name="description"
          content="Join Nikah Junction, India's trusted Muslim matrimony platform. Find your perfect life partner with ease. Register today!"
        />
        <meta
          name="keywords"
          content="Muslim matrimony, Nikah Junction, matrimony service, Muslim marriage, Islamic wedding, find rishta, matrimony India"
        />
        <meta name="author" content="Nikah Junction" />
        <link
          rel="canonical"
          href="https://nikahjunction.netlify.app/Contact"
        />
        <meta property="og:title" content="Contact Us - Nikah Junction" />
        <meta
          property="og:description"
          content="Nikah Junction helps you find your ideal life partner. Register now to connect with compatible matches!"
        />
        <meta
          property="og:image"
          content="https://nikahjunction.netlify.app/nikah-logo1.png"
        />
        <meta
          property="og:url"
          content="https://nikahjunction.netlify.app/Contact"
        />
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

      <div className="bg-gray-100 text-gray-800 min-h-screen">
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="lg:text-4xl text-2xl font-bold text-center text-pink-700 lg:my-6 my-2">
            Contact Us
          </h1>
          <p className="lg:text-lg mb-6">
            At <span className="font-bold text-gray-600">Nikah Junction</span>,
            we value your feedback and are here to assist you with any questions
            or concerns. Whether you need help with your account, have inquiries
            about our services, or wish to provide feedback, we are here to
            help.
          </p>

          <h2 className="lg:text-2xl text-lg font-semibold text-gray-900 lg:mb-4">
            Get in Touch :
          </h2>
          <p className="lg:text-lg mb-6">
            You can reach us through the following methods:
          </p>

          <div className="mb-6">
            <h3 className="lg:text-xl text-lg font-semibold text-gray-600 lg:mb-2">
              Email:
            </h3>
            <p className="lg:text-lg">
              For general inquiries, please email us at:{" "}
              <a
                href="mailto:nikahjunction@gmail.com"
                className="lg:font-bold font-semibold text-blue-800 hover:underline"
              >
                nikahjunction@gmail.com
              </a>
            </p>
          </div>

          <div className="mb-6">
            <h3 className="lg:text-xl text-lg font-semibold text-gray-600 lg:mb-2">
              Phone:
            </h3>
            <p className="lg:text-lg">
              For Calling assistance:{" "}
              <p className="inline-block lg:font-bold font-semibold text-gray-700">
                Go to 'Contact Us' → Click on 'Talk to Us'{" "}
              </p>
            </p>
            <p className="lg:text-lg">
              For WhatsApp assistance:{" "}
              <a
                href="https://wa.me/7652088756"
                className="lg:font-bold font-semibold text-blue-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Whatsapp
              </a>
            </p>
          </div>

          <div className="mb-6">
            <h3 className="lg:text-xl text-lg font-semibold text-gray-600 lg:mb-2">
              Office Address:
            </h3>
            <p className="lg:text-lg">
              Visit us at:{" "}
              <a
                href="https://www.google.com/maps/@26.8586568,80.880189,21z?entry=ttu&g_ep=EgoyMDI0MDkwNC4wIKXMDSoASAFQAw%3D%3D"
                className="lg:font-bold font-semibold text-blue-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                542/ KB- 145, Kishore Vihar Colony, Gate no.- 2, Campwell road,
                Lucknow- 226003
              </a>
            </p>
          </div>

          <h2 className="lg:text-2xl text-lg font-semibold text-gray-900 lg:mt-12 mt-8 lg:mb-6 mb-3">
            Contact Form :
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block lg:text-lg font-medium text-gray-600 lg:mb-1"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full lg:h-11 h-8 p-3 border border-gray-300 rounded-md"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-10">
              <div className="w-[49%]">
                <label
                  htmlFor="email"
                  className="block lg:text-lg font-medium text-gray-600 lg:mb-1"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full lg:h-11 h-8 p-3 border border-gray-300 rounded-md"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="w-[49%]">
                <label
                  htmlFor="number"
                  className="block lg:text-lg font-medium text-gray-600 lg:mb-1"
                >
                  Number:
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  className="w-full lg:h-11 h-8 p-3 border border-gray-300 rounded-md"
                  required
                  value={formData.number}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block lg:text-lg font-medium text-gray-600 lg:mb-1"
              >
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-pink-700 text-white lg:py-2 lg:px-4 py-1 px-2 rounded-md hover:bg-pink-600"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
          {status && (
            <p
              className={`lg:text-lg mt-6 ${status.includes("success") ? "text-green-600" : "text-red-600"
                }`}
            >
              {status}
            </p>
          )}

          <p className="lg:text-lg mt-6">
            We look forward to hearing from you and will respond to your
            inquiries as soon as possible.
          </p>
        </div>
      </div>
    </>
  );
}

export default Contact;
