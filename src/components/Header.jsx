import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";

Header.propTypes = {
  onData: PropTypes.func.isRequired,
};

function Header({ onData }) {
  const [pop, setPop] = useState(false);
  const [login, setLogin] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [messageSent, setMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contactRequests"), {
        name: formData.name,
        phone: formData.phone,
      });
      setMessageSent(true);
      setFormData({ name: "", phone: "" });
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
      <div className="flex w-full lg:h-12 justify-between text-white items-center lg:p-16 lg:pt-20 px-3 pt-2 absolute z-10">
        <div className="flex">
          <div className="flex flex-col items-center">
            <div
              className="lg:text-[80px] text-[29px] lg:leading-[60px] leading-[26px] pt-1"
              style={{ fontFamily: "Dancing Script" }}
            >
              Nikah Junctionghdfgd
            </div>
            <p className="text-center inline-block lg:text-[14px] text-[7px] font-semibold lg:tracking-[14px] tracking-[5px]">
              Muslim Matrimony
            </p>
          </div>
          <img
            className="lg:h-[86px] lg:w-20 h-9 w-8 lg:ml-0 ml-1"
            src="images/nikah-logo2.png"
          />
        </div>

        <div>
          <ul className="lg:text-2xl text-sm font-semibold relative flex lg:gap-x-20 gap-x-2">
            <li
              className="cursor-pointer hover:text-pink-700"
              onClick={() => {
                setLogin((prev) => !prev);
                onData(login);
              }}
            >
              {login ? "Login" : "Register"}
            </li>

            <li
              className="cursor-pointer relative right-[-9px]"
              onClick={() => setPop((prev) => !prev)}
            >
              <p
                className={`${pop ? "text-pink-700" : "text-white"}
                 hover:text-pink-700`}
              >
                Contact Us &#x25BE;
              </p>
            </li>

            {pop && (
              <div className="lg:h-[150px] lg:w-[150px] w-[120px] h-[125px] bg-black lg:top-10 top-7 lg:right-0 right-[-7px] bg-opacity-50 rounded-lg absolute z-20">
                <div className="flex items-center lg:pt-1 pt-2 px-2">
                  <img
                    className="bg-white rounded-full lg:h-5 lg:w-5 h-4 w-4"
                    src="images/phone.png"
                    alt="phone"
                  />
                  <button
                    className="lg:text-[16px] text-[14px] lg:pl-3 pl-1 text-white hover:underline"
                    onClick={() => setIsPopupOpen(true)}
                  >
                    Talk to us...
                  </button>
                  {isPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl text-center text-pink-700 font-bold mb-4">
                          Talk to us...
                        </h2>

                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label className="text-black lg:text-[18px] text-[16px] block">
                              Name:
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full border text-black lg:h-10 h-8 lg:text-[18px] text-[16px] border-gray-300 p-2 rounded"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="text-black lg:text-[18px] text-[16px] block">
                              Phone No:
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full border text-black lg:h-10 h-8 lg:text-[18px] text-[16px] border-gray-300 p-2 rounded"
                            />
                          </div>
                          <div className="text-center">
                            {messageSent && (
                              <p className="text-green-500 mb-2 text-[13px]">
                                We will contact you shortly!
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
                <div className="flex items-center lg:pt-1 pt-2 px-2">
                  <img
                    className="bg-white rounded-full lg:h-5 lg:w-5 h-4 w-4"
                    src="images/whatsapp.png"
                    alt="whatsapp"
                  />
                  <a
                    href="https://wa.me/917652088756"
                    target="_blank"
                    className="lg:text-[16px] text-[14px] lg:pl-2 pl-1 text-white hover:underline"
                  >
                    Whatsapp
                  </a>
                </div>
                <div className="flex items-center lg:pt-1 pt-2 px-2">
                  <img
                    className="bg-white rounded-full lg:h-5 lg:w-5 h-4 w-4"
                    src="images/email.png"
                    alt="email"
                  />
                  <a
                    href="mailto:nikahjunction@gmail.com"
                    className="lg:text-[16px] text-[14px] lg:pl-2 pl-1 text-white hover:underline"
                  >
                    E-mail
                  </a>
                </div>
                <div className="flex items-center lg:pt-1 pt-2 px-2 cursor-pointer">
                  <img
                    className="bg-white rounded-full lg:h-5 lg:w-5 h-4 w-4"
                    src="images/info.png"
                    alt="info"
                  />
                  <p className="lg:text-[16px] text-[14px] lg:pl-2 pl-1">
                    <Link className="hover:underline" to="/Contact">
                      View more
                    </Link>
                    ...
                  </p>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
