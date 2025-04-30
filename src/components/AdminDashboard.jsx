import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import FetchAndGeneratePDF from "./FetchAndGeneratePDF";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [casteFilter, setCasteFilter] = useState("");
  const [contactRequests, setContactRequests] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState("");
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(userId);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setEditMode(true);
  };

  const handleDeleteClick = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "Biodata", userId));
        setUsers(users.filter((user) => user.id !== userId));
        setSelectedUser(null);
        alert("User deleted successfully.");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "Biodata");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((u) => ({
        id: u.id,
        ...u.data(),
      }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  const fetchContactRequests = async () => {
    try {
      const contactCollection = collection(db, "contactRequests");
      const contactSnapshot = await getDocs(contactCollection);
      const contactList = contactSnapshot.docs.map((c) => ({
        id: c.id,
        ...c.data(),
      }));
      setContactRequests(contactList);
    } catch (error) {
      console.error("Error fetching contact requests: ", error);
    }
  };

  const fetchServiceRequests = async () => {
    try {
      const serviceCollection = collection(db, "serviceRequests");
      const serviceSnapshot = await getDocs(serviceCollection);
      const serviceList = serviceSnapshot.docs.map((s) => ({
        id: s.id,
        ...s.data(),
      }));
      setServiceRequests(serviceList);
    } catch (error) {
      console.error("Error fetching service requests: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchContactRequests();
    fetchServiceRequests();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const matchingUser = users.find((user) =>
      user.firstName?.toLowerCase().includes(value.toLowerCase())
    );

    if (matchingUser) {
      setSelectedUser(matchingUser);
      const userUid = matchingUser.id;
      console.log("User UID:", userUid);
    } else {
      setSelectedUser(null);
    }
  };

  const [genderFilter, setGenderFilter] = useState("");
  const [uidFilter, setUidFilter] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesName = `${user.firstName ?? ""} ${user.lastName ?? ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const castes = casteFilter.toLowerCase().split(" ");
    const matchesCaste =
      casteFilter.trim() !== ""
        ? castes.some((caste) => caste === user.caste?.toLowerCase())
        : true;

    const matchesGender =
      genderFilter.trim() !== ""
        ? user.gender?.toLowerCase() === genderFilter.toLowerCase()
        : true;

    const matchesUid =
      uidFilter.trim() !== ""
        ? user.id?.toLowerCase() === uidFilter.toLowerCase()
        : true;

    return matchesName && matchesCaste && matchesGender && matchesUid;
  });

  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const filteredUsers1 = filteredUsers.filter((user) => {
    if (!user.year) return false;
    const currentYear = new Date().getFullYear();
    const userAge = currentYear - user.year;

    const matchesMinAge =
      minAge.trim() !== "" ? userAge >= parseInt(minAge) : true;
    const matchesMaxAge =
      maxAge.trim() !== "" ? userAge <= parseInt(maxAge) : true;

    return matchesMinAge && matchesMaxAge;
  });

  const handleCasteChange = (e) => {
    const selectedCaste = e.target.value;
    setCasteFilter(selectedCaste);

    const matchingUser = users.find(
      (user) => user.caste?.toLowerCase() === selectedCaste.toLowerCase()
    );

    if (matchingUser) {
      setSelectedUser(matchingUser);
      const userUid = matchingUser.id;
      // console.log("User UID:", userUid);
    } else {
      setSelectedUser(null);
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedUser) {
      try {
        const userRef = doc(db, "Biodata", selectedUser.id);
        await updateDoc(userRef, formData);
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id ? { ...user, ...formData } : user
          )
        );
        setEditMode(false);
        alert("User updated successfully.");
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Nikah Junction</title>
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
          href="https://nikahjunction.netlify.app/AdminDashboard"
        />
        <meta property="og:title" content="Admin Dashboard - Nikah Junction" />
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
          content="https://nikahjunction.netlify.app/AdminDashboard"
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
      <div className="p-6">
        <h1 className="lg:text-5xl text-2xl text-center font-bold my-4 mb-7">
          Admin Dashboard
        </h1>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Enter Name to search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded lg:w-[30vw] mb-4"
          />
          <button
            onClick={handleSearchChange}
            className="bg-pink-700 h-[42px] font-medium text-white p-2 rounded ml-2"
          >
            Search
          </button>
        </div>

        {selectedUser ? (
          <FetchAndGeneratePDF userId={selectedUser.id} />
        ) : (
          <div className="text-center">
            <p className="text-red-500">No matching user found.</p>
          </div>
        )}
      </div>

      {/* CASTE Filter */}
      <div className="lg:p-6 p-1">
        <div className="w-full mb-4 flex justify-center">
          <select
            value={casteFilter}
            onChange={handleCasteChange} // Call caste filter change logic
            className="mt-1 block lg:w-[30vw] w-[150px] p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Caste</option>
            <option value=" sheikh shaikh siddiqui siddiqi syed alvi bukhari jafari mirza pathan mughal khan Baig farooqui usmani">
              Common
            </option>
            <option value=" Raeen Idrisi Manihar Zuberi Turk Teli Sufi Shamsi Shah Salmani Salafi Saifi Rohilla Rizvi Razvi Rajput Muslim Qureshi Qadri Pirzada Pashmina Naimi Nadvi Naqvi Memon Mir Meo Mansoori Malik Mahdavi Madni Lohar Khoja Khanani Kazmi Jilani Jat Hussaini Hanafi Halwai Gujjar Faqir Deobandi Abbasi Afghan Ansari Asadi Baghdadi Barelvi Bohra Bukhari Chaudhary Chishti Dakhini Dawoodi Bohra">
              Lower
            </option>
            <option value="Abbasi">Abbasi</option>
            {/* <option value="Afghan">Afghan</option> */}
            <option value="Alvi">Alvi</option>
            <option value="Ansari">Ansari</option>
            <option value="Arab">Arab</option>
            <option value="Asadi">Asadi</option>
            {/* <option value="Baghdadi">Baghdadi</option> */}
            <option value="Baig">Baig/Beg</option>
            {/* <option value="Barelvi">Barelvi</option> */}
            <option value="Bohra">Bohra</option>
            <option value="Bukhari">Bukhari</option>
            <option value="Chaudhary">Chaudhary</option>
            <option value="Chishti">Chishti</option>
            <option value="Dakhini">Dakhini</option>
            <option value="Dawoodi Bohra">Dawoodi Bohra</option>
            {/* <option value="Deobandi">Deobandi</option> */}
            <option value="Faqir">Faqir</option>
            <option value="Farooqui">Farooqui</option>
            {/* <option value="Gujjar">Gujjar</option> */}
            <option value="Halwai">Halwai</option>
            <option value="Hanafi">Hanafi</option>
            <option value="Hussaini">Hussaini</option>
            <option value="Idrisi">Idrisi</option>
            <option value="Jafari">Jafari</option>
            <option value="Jat">Jat</option>
            <option value="Jilani">Jilani</option>
            <option value="Kazmi">Kazmi</option>
            <option value="Khan">Khan</option>
            <option value="Khanani">Khanani</option>
            <option value="Khoja">Khoja</option>
            <option value="Lohar">Lohar</option>
            <option value="Madni">Madni</option>
            <option value="Mahdavi">Mahdavi</option>
            <option value="Malik">Malik</option>
            <option value="Mansoori">Mansoori</option>
            <option value="Manihar">Manihar</option>
            <option value="Meo">Meo</option>
            <option value="Mir">Mir</option>
            <option value="Mirza">Mirza</option>
            <option value="Memon">Memon</option>
            <option value="Mughal">Mughal</option>
            <option value="Naqvi">Naqvi</option>
            <option value="Nadvi">Nadvi</option>
            <option value="Naimi">Naimi</option>
            <option value="Pathan">Pathan</option>
            {/* <option value="Pashmina">Pashmina</option> */}
            {/* <option value="Pirzada">Pirzada</option> */}
            <option value="Qadri">Qadri</option>
            <option value="Qidwai">Qidwai</option>
            <option value="Qureshi">Qureshi</option>
            <option value="Raeen">Raeen/Rayeen</option>
            {/* <option value="Rajput Muslim">Rajput Muslim</option> */}
            <option value="Razvi">Razvi</option>
            <option value="Rizvi">Rizvi</option>
            {/* <option value="Rohilla">Rohilla</option> */}
            <option value="Saifi">Saifi</option>
            <option value="Salafi">Salafi</option>
            <option value="Salmani">Salmani</option>
            <option value="Shaikh">Shaikh</option>
            <option value="Sheikh">Sheikh</option>
            <option value="Shah">Shah</option>
            <option value="Shamsi">Shamsi</option>
            <option value="Siddiqi">Siddiqi</option>
            <option value="Siddiqui">Siddiqui</option>
            <option value="Sheikh">Sheikh/Siddiqui</option>
            <option value="Sufi">Sufi</option>
            <option value="Syed">Syed</option>
            <option value="Teli">Teli</option>
            {/* <option value="Turk">Turk</option> */}
            <option value="Usmani">Usmani</option>
            <option value="Zuberi">Zuberi</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="filter-section w-full gap-4 mb-4 flex flex-col sm:flex-row justify-center items-center sm:items-stretch">
          <input
            type="number"
            placeholder="Min Age"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
            className="age-input pl-3 h-10 w-11/12 sm:w-1/6 border border-gray-300 rounded-lg shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Max Age"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            className="age-input pl-3 h-10 w-11/12 sm:w-1/6 border border-gray-300 rounded-lg shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="filter-section w-full gap-4 mb-4 flex flex-col sm:flex-row justify-center items-center">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="gender-filter h-10 w-11/12 sm:w-1/3 border rounded-lg shadow-md pl-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="filter-section w-full gap-4 mb-4 flex flex-col sm:flex-row justify-center items-center">
          <input
            type="text"
            value={uidFilter}
            onChange={(e) => setUidFilter(e.target.value)}
            placeholder="Enter UID to filter"
            className="uid-filter p-2 h-10 w-11/12 sm:w-1/3 border border-gray-300 rounded-lg shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-lg lg:px-4 lg:py-2">#</th>{" "}
                {/* Added column for row numbers */}
                <th className="border px-4 py-2 text-lg lg:px-16 lg:py-2">
                  Name
                </th>
                <th className="border px-4 py-2 text-lg lg:px-4 lg:py-2">
                  Sect
                </th>
                <th className="border px-4 py-2 text-lg lg:px-4 lg:py-2">
                  Own Caste
                </th>
                <th className="border px-4 py-2 text-lg lg:px-4 lg:py-2">
                  Preferred Caste
                </th>
                <th className="border px-4 py-2 text-lg lg:px-4 lg:py-2">
                  Age
                </th>
                <th className="border px-4 py-2 text-lg lg:px-4 lg:py-2">
                  Marital Status
                </th>
                <th className="border px-4 py-2 text-lg lg:px-4 lg:py-2">
                  Phone Number
                </th>
                <th className="border px-4 py-2 text-lg lg:px-4 lg:py-2">
                  E-mail/UID
                </th>
                <th className="border px-4 py-2 text-lg lg:px-4 lg:py-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers1.map((user, index) => (
                <tr
                  key={user.id}
                  className={`hover:bg-gray-100 cursor-pointer ${user.paid ? "bg-green-200" : ""
                    }`}
                  // onClick={() => setSelectedUser(user)}
                  onClick={() => handleRowClick(user)}
                >
                  <td className="border px-2 py-2 text-lg lg:px-4 lg:py-2">
                    {index + 1}
                  </td>{" "}
                  {/* Display row number */}
                  <td className="border px-2 py-2 text-lg lg:px-4 lg:py-2">
                    {user.firstName || user.lastName
                      ? `${user.firstName || ""} ${user.lastName || ""}`
                      : "N/A"}
                  </td>
                  <td className="border px-2 py-2 text-lg lg:px-4 lg:py-2">
                    {user.sect || "N/A"}
                  </td>
                  <td className="border px-2 py-2 text-lg lg:px-4 lg:py-2">
                    {user.caste || "N/A"}
                  </td>
                  <td className="border px-2 py-2 text-lg lg:px-4 lg:py-2">
                    {user.prefCaste || "N/A"}
                  </td>
                  <td className="border px-2 py-2 text-lg lg:px-4 lg:py-2">
                    {new Date().getFullYear() - user.year || "N/A"} yrs
                  </td>
                  <td className="border px-2 py-2 text-lg lg:px-4 lg:py-2">
                    {user.maritalStatus || "N/A"}
                  </td>
                  <td className="border px-2 py-2 text-lg lg:px-4 lg:py-2">
                    {user.mobileNumber || "N/A"} <br />
                    {user.whatsappNo || "N/A"}
                  </td>
                  <td className="border px-2 py-2 text-lg lg:px-4 lg:py-2">
                    {user.email.substring(0, user.email.indexOf("@")) || "N/A"}{" "}
                    <br />
                    {user.id.substring(0, 5) || "N/A"}
                  </td>
                  <td className="border px-2 py-2 text-lg lg:px-4 lg:py-2">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleEditClick(user);
                      }}
                      className="bg-blue-500 text-white p-1 mr-2 px-[15px] rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteClick(user.id);
                      }}
                      className="bg-red-500 text-white mt-1 p-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Form */}
        {editMode && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Edit User Details</h2>
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-4 mt-4"
            >
              {Object.keys(formData).map((field) => (
                <div key={field} className="flex flex-col gap-2">
                  <label className="text-gray-700 font-bold">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleFormChange}
                    className="border p-2 rounded"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 mr-4 rounded cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white p-2 rounded cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Contact Requests Table */}
      <div className="p-6">
        <h2 className="text-2xl text-center font-bold mb-4">
          Contact Requests
        </h2>
        <table className="border mx-auto border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border lg:px-4 lg:py-2">Name</th>
              <th className="border lg:px-4 lg:py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {contactRequests.map((request) => (
              <tr key={request.id}>
                <td className="border lg:px-4 lg:py-2 px-1 py-1">
                  {request.name}
                </td>
                <td className="border lg:px-4 lg:py-2 px-1 py-1">
                  {request.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Service Requests Table */}
      <div className="p-6">
        <h2 className="text-2xl text-center font-bold mb-4">
          Service Requests
        </h2>
        <table className="border mx-auto border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border lg:px-4 lg:py-2">Name</th>
              <th className="border lg:px-4 lg:py-2">Phone</th>
              <th className="border lg:px-4 lg:py-2">Service</th>
            </tr>
          </thead>
          <tbody>
            {serviceRequests.map((request) => (
              <tr key={request.id}>
                <td className="border lg:px-4 lg:py-2 px-1 py-1">
                  {request.name}
                </td>
                <td className="border lg:px-4 lg:py-2 px-1 py-1">
                  {request.phone}
                </td>
                <td className="border lg:px-4 lg:py-2 px-1 py-1">
                  {request.service}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 max-w-4xl h-auto rounded-lg p-6 relative overflow-auto">
              <button
                className="absolute top-2 right-2 bg-red-500 text-white font-extrabold p-3 rounded-full"
                onClick={closeModal}
              >
                ✕
              </button>
              <div className="overflow-auto max-h-[80vh]">
                <FetchAndGeneratePDF userId={selectedUser.id} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
