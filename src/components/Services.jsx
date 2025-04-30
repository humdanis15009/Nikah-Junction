import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";
import { Helmet } from "react-helmet-async";

const Services = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
  });
  const [messageSent, setMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Catering:",
      description:
        "We offer a range of catering options, including traditional and contemporary dishes tailored to your preferences. Our experienced chefs can customize menus for various dietary needs, ensuring a delightful culinary experience. From appetizers to desserts, we take care of every detail, using fresh, high-quality ingredients. Let us make your special day unforgettable with exquisite flavors and presentation.",
      imageUrl: "/images/catering.jpeg",
    },
    {
      title: "Marriage Halls/Venues:",
      description:
        "Finding the perfect venue is crucial for your wedding day. We assist in booking marriage halls that fit your style, capacity, and budget. Our partners offer a variety of options, from lavish banquet halls with grand chandeliers to cozy, intimate spaces. We provide detailed information about each venue, including layout options, amenities, and decor possibilities, ensuring you choose the perfect setting for your celebration.",
      imageUrl: "/images/marriage-hall.jpg",
    },
    {
      title: "Transport:",
      description:
        "Ensure smooth transportation for your guests with our reliable transport services. We offer a range of vehicles, including luxury cars, coaches, and shuttles. Our team coordinates schedules and routes to accommodate all guests efficiently. Whether it’s airport pickups, guest transfers, or transportation for bridal parties, we ensure that everyone arrives on time and in comfort, making your wedding experience seamless.",
      imageUrl: "/images/transport.webp",
    },
    {
      title: "Event Management:",
      description:
        "From planning to execution, our event management services cover every aspect of your celebration. Our dedicated team works closely with you to understand your vision and preferences, ensuring every detail aligns with your expectations. We manage timelines, vendor coordination, and on-the-day logistics to create a stress-free experience. Whether it’s a wedding, reception, or other special events, we make sure your day is memorable and perfectly orchestrated.",
      imageUrl: "/images/event-management.avif",
    },
    {
      title: "Makeup and Beauty:",
      description:
        "Our professional makeup and beauty services ensure you look your best on your special day. We offer personalized consultations to help you choose the perfect look that complements your style and personality. From bridal makeup to hairstyling, our experienced artists use high-quality products to enhance your natural beauty, ensuring you feel confident and radiant throughout the event.",
      imageUrl: "/images/makeup.webp",
    },
    {
      title: "Photography and Videography:",
      description:
        "Capture the magic of your wedding with our professional photography and videography services. Our skilled photographers and videographers work discreetly to document every moment, from candid shots to staged portraits. We offer customizable packages, including pre-wedding shoots, full-day coverage, and beautifully edited highlight reels, allowing you to relive your special day for years to come.",
      imageUrl: "/images/photography.jpg",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "serviceRequests"), {
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
      });
      setMessageSent(true);
      setFormData({ name: "", phone: "", service: "" });
      setTimeout(() => {
        setMessageSent(false);
        setIsPopupOpen(false);
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Services - Nikah Junction</title>
        <meta
          name="description"
          content="Join Nikah Junction, India's trusted Muslim matrimony platform. Find your perfect life partner with ease. Register today!"
        />
        <meta
          name="keywords"
          content="Muslim matrimony, Nikah Junction, matrimony service, Muslim marriage, Islamic wedding, find rishta, matrimony India"
        />
        <meta name="author" content="Nikah Junction" />
        <link rel="canonical" href="https://nikahjunction.netlify.app/Services" />
        <meta
          property="og:title"
          content="Services - Nikah Junction"
        />
        <meta
          property="og:description"
          content="Nikah Junction helps you find your ideal life partner. Register now to connect with compatible matches!"
        />
        <meta
          property="og:image"
          content="https://nikahjunction.netlify.app/nikah-logo1.png"
        />
        <meta property="og:url" content="https://nikahjunction.netlify.app/Services" />
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
      <div className="relative">
        <div className="p-6 lg:mt-1 mx-auto max-w-6xl rounded-lg shadow-md">
          <h1 className="lg:text-4xl text-2xl text-pink-700 font-bold text-center mb-6">
            Our Partner Services
          </h1>
          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg transition-shadow duration-200"
              >
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded-t-lg mb-4 lg:ml-3 lg:float-right lg:w-1/3 lg:mr-4"
                />
                <h2 className="lg:text-2xl text-lg font-semibold">
                  {service.title}
                </h2>
                <p className="mt-2">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Button */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="hidden md:block fixed lg:bottom-10 bottom-12 right-2 lg:right-6 border-2 border-white text-white lg:p-3 p-1 lg:font-semibold bg-pink-700 rounded-full shadow-lg hover:bg-pink-600 transition"
        >
          Request Service
        </button>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="md:hidden h-12 w-full z-50 fixed bottom-0 text-lg font-bold text-white py-2 bg-pink-700 hover:bg-pink-600"
        >
          REQUEST SERVICE
        </button>

        {/* Popup Form */}
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl text-center text-pink-700 font-bold mb-4">
                Request Service
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full lg:h-10 h-8 border border-gray-300 p-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full lg:h-10 h-8 border border-gray-300 p-2 rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Service Required:</label>
                  <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full lg:h-10 h-8 border border-gray-300 p-2 rounded"
                  />
                </div>
                <div className="text-center">
                  {messageSent && (
                    <p className="text-green-500 mb-2 text-[13px]">
                      Message successfully sent!
                    </p>
                  )}
                  {errorMessage && (
                    <p className="text-red-500 mb-2 text-[13px]">
                      {errorMessage}
                    </p>
                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-pink-700 text-white font-semibold px-3 text-sm h-10 rounded hover:bg-pink-600 transition"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPopupOpen(false)}
                    className="ml-2 bg-gray-400 text-white font-semibold px-2 text-sm rounded hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Services;
