import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../Firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const [pop, setPop] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [messageSent, setMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userFirstName, setUserFirstName] = useState("");

  const navigate = useNavigate();

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

  const [userId, setUserId] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userDocRef = doc(db, "Biodata", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserFirstName(userDocSnap.data().firstName);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
    <nav className="sticky top-0 bg-gray-800 p-2 pr-1 text-white z-50">
      <div className="flex w-full lg:h-20 justify-between items-center lg:px-6">
        <div className="flex">
          <Link to="/">
            <div
              className="lg:text-[70px] text-[26px]"
              style={{ fontFamily: "Dancing Script" }}
            >
              Nikah Junction
            </div>
          </Link>
          <img
            className="lg:h-24 lg:w-20 h-9 w-8 mt-1 ml-1"
            src="images/nikah-logo2.png"
          />
        </div>
        <nav>
          <ul className="flex lg:space-x-12 lg:text-xl lg:gap-x-3 gap-x-2 text-[14px]">
            <li>
              {userId ? (
                <span className="hover:text-pink-700">
                  {userFirstName ? `${userFirstName}` : ""}
                </span>
              ) : (
                ""
              )}
            </li>
            <li>
              {userId ? (
                <button
                  onClick={handleSignOut}
                  className="hover:text-pink-700 px-3"
                >
                  Logout
                </button>
              ) : (
                <Link className="hover:text-pink-700" to="/">
                  Login/Register
                </Link>
              )}
            </li>
            <li
              className="cursor-pointer hover:text-pink-700 hidden md:block"
              onClick={() => setPop((prev) => !prev)}
            >
              {pop ? (
                <p className="cursor-pointer text-pink-700">
                  Contact Us &#x25BE;
                </p>
              ) : (
                <p className="cursor-pointer text-white">Contact Us &#x25BE;</p>
              )}
            </li>

            {pop && (
              <div className="h-[100px] w-[150px] bg-gray-800 top-[70px] right-6 bg-opacity-95 border-2 border-gray-500 rounded-lg absolute z-20">
                <div className="flex items-center px-1">
                  <img
                    className="bg-white rounded-lg h-4 w-4"
                    src="images/phone.png"
                    alt="phone"
                  />
                  <button
                    className="text-[15px] pl-2 text-white hover:underline"
                    onClick={() => setIsPopupOpen(true)}
                  >
                    Talk to us...
                  </button>
                  {isPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="lg:text-[16px] text-[14px] text-center text-pink-700 font-bold mb-4">
                          Talk to us...
                        </p>

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
                              className="w-full border lg:h-10 h-8 lg:text-[18px] text-[16px] border-gray-300 p-2 rounded"
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
                              className="w-full border lg:h-10 h-8 lg:text-[18px] text-[16px] border-gray-300 p-2 rounded"
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
                <div className="flex items-center pt-1 px-1">
                  <img
                    className="bg-white rounded-lg h-4 w-4"
                    src="images/whatsapp.png"
                    alt="whatsapp"
                  />
                  <a
                    href="https://wa.me/9197652088756"
                    target="_blank"
                    className="text-[14px] pl-2 text-white hover:underline"
                  >
                    Whatsapp
                  </a>
                </div>
                <div className="flex items-center pt-1 px-1">
                  <img
                    className="bg-white rounded-lg h-4 w-4"
                    src="images/email.png"
                    alt="email"
                  />
                  <a
                    href="mailto:nikahjunction@gmail.com"
                    className="text-[14px] pl-2 text-white hover:underline"
                  >
                    E-mail
                  </a>
                </div>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
