// import { useEffect, useRef, useState } from "react";
// import { db } from "../Firebase";
// import { doc, getDoc } from "firebase/firestore";
// import jsPDF from "jspdf";
// import { FaWhatsapp } from "react-icons/fa";

// const FetchAndGeneratePDF = ({ userId }) => {
//   const [user, setUser] = useState(null);
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const componentRef = useRef();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userDocRef = doc(db, "Biodata", userId);
//         const userDoc = await getDoc(userDocRef);

//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           const userImages =
//             userData.imageUrls?.length > 0
//               ? userData.imageUrls
//               : userData.images?.map(img => img.url) || [];

//           setUser(userData);
//           setImages(userImages);
//         } else {
//           console.log("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const getBase64 = (url) => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.src = url;
//       img.crossOrigin = "Anonymous";
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0);
//         const dataURL = canvas.toDataURL("image/jpeg");
//         resolve(dataURL);
//       };
//       img.onerror = (error) => {
//         reject(error);
//       };
//     });
//   };

//   const drawField = (doc, label, value, x1, yPosition, lineHeight, x2) => {
//     doc.setFontSize(18);
//     doc.setFont("helvetica", "bold");

//     const fieldValue =
//       value !== undefined && value !== null ? String(value) : "N/A";

//     doc.text(label, x1, yPosition);
//     doc.setFont("helvetica", "normal");
//     doc.text(fieldValue, x2, yPosition, { align: "right" });

//     return yPosition + lineHeight;
//   };

//   const generatePDF = async () => {
//     if (!user) return;

//     const doc = new jsPDF("portrait", "mm", "a4");
//     const lineHeight = 9.0;
//     const pageWidth = 210;
//     const leftMargin = 15;
//     const rightMargin = 15;
//     const x2 = pageWidth - rightMargin;

//     let yPosition = 15;

//     const drawSectionHeading = (heading) => {
//       doc.setFontSize(24);
//       doc.setFont("helvetica", "bold");
//       doc.text(heading, 105, yPosition, { align: "center" });
//       const textWidth = doc.getTextWidth(heading);
//       const startX = 105 - textWidth / 2;
//       const endX = 105 + textWidth / 2;

//       doc.line(startX, yPosition + 2, endX, yPosition + 2);

//       yPosition += 12;
//     };

//     const drawSectionTitle = (title) => {
//       doc.setFontSize(20);
//       doc.setFont("helvetica", "bold");
//       doc.text(title, 105, yPosition, { align: "center" });

//       yPosition += 10;
//     };

//     drawSectionHeading("NIKAH JUNCTION");
//     drawSectionTitle("Personal Details");
//     yPosition = drawField(
//       doc,
//       "Name:",
//       `${user.firstName} ${user.lastName}`,
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     yPosition = drawField(
//       doc,
//       "DOB:",
//       `${user.day}/${user.month}/${user.year} (${new Date().getFullYear() - user.year
//       } yrs)`,
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     yPosition = drawField(
//       doc,
//       "Complexion:",
//       user.complexion,
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     yPosition = drawField(
//       doc,
//       "Height:",
//       user.height,
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     yPosition = drawField(
//       doc,
//       "Marital Status:",
//       `${user.maritalStatus}${user.children ? ` (${user.children})` : ""}`,
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     yPosition = drawField(
//       doc,
//       "Sect:",
//       user.sect,
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     yPosition = drawField(
//       doc,
//       "Caste:",
//       user.caste !== "Other" ? user.caste : user["other-caste"],
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     yPosition = drawField(
//       doc,
//       "Partner's Caste(s):",
//       user.prefCaste,
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     yPosition = drawField(
//       doc,
//       "Currently Living:",
//       `${user.city}, ${user.state}, ${user.country}`,
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );

//     {
//       user.country2 &&
//         (yPosition = drawField(
//           doc,
//           "Native Place:",
//           `${user.city2}, ${user.state2}, ${user.country2}`,
//           leftMargin,
//           yPosition,
//           lineHeight,
//           x2
//         ));
//     }
//     {
//       user.gender === "Male" &&
//         (yPosition = drawField(
//           doc,
//           "Does groom lives with Family?",
//           user.groomLive ? "Yes" : "No",
//           leftMargin,
//           yPosition,
//           lineHeight,
//           x2
//         ));
//     }

//     // Education & Occupation Section
//     yPosition += 5;
//     drawSectionTitle("Education & Occupation");
//     yPosition = drawField(
//       doc,
//       "Education:",
//       user.degree !== "Other" ? user.degree : user["other-degree"],
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );

//     yPosition = drawField(
//       doc,
//       "Employed In:",
//       user.employedIn !== "Other" ? user.employedIn : user["other-employedIn"],
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     {
//       user.employedIn !== "Not Working" &&
//         (yPosition = drawField(
//           doc,
//           "Occupation:",
//           user.occupation,
//           leftMargin,
//           yPosition,
//           lineHeight,
//           x2
//         ));
//     }

//     {
//       user.employedIn !== "Not Working" &&
//         (yPosition = drawField(
//           doc,
//           "Annual Income:",
//           user.income,
//           leftMargin,
//           yPosition,
//           lineHeight,
//           x2
//         ));
//     }

//     // Family Details Section
//     yPosition += 5;
//     drawSectionTitle("Family Details");
//     // yPosition = drawField(
//     //   doc,
//     //   "Family Type:",
//     //   user.familyType,
//     //   leftMargin,
//     //   yPosition,
//     //   lineHeight,
//     //   x2
//     // );
//     yPosition = drawField(
//       doc,
//       "Family Status:",
//       user.familyStatus,
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     yPosition = drawField(
//       doc,
//       "Family Values:",
//       user.familyLifestyle,
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     yPosition = drawField(
//       doc,
//       "Father's Name:",
//       user.fatherName,
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     {
//       user.fatherOccupation !== "Late" &&
//         (yPosition = drawField(
//           doc,
//           "Father's Occupation:",
//           user.fatherOccupation,
//           leftMargin,
//           yPosition,
//           lineHeight,
//           x2
//         ));
//     }
//     yPosition = drawField(
//       doc,
//       "Mother's Name:",
//       user.motherName,
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     {
//       user.motherOccupation !== "Late" &&
//         (yPosition = drawField(
//           doc,
//           "Mother's Occupation:",
//           user.motherOccupation,
//           leftMargin,
//           yPosition,
//           lineHeight,
//           x2
//         ));
//     }
//     yPosition = drawField(
//       doc,
//       "No. of Brothers:",
//       user.bro || "None",
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     {
//       user.bro !== "None" &&
//         (yPosition = drawField(
//           doc,
//           "Married Brothers:",
//           user.marriedBro || "None",
//           leftMargin,
//           yPosition,
//           lineHeight,
//           x2
//         ));
//     }
//     yPosition = drawField(
//       doc,
//       "No. of Sisters:",
//       user.sis || "None",
//       leftMargin,
//       yPosition,
//       lineHeight,
//       x2
//     );
//     {
//       user.sis !== "None" &&
//         (yPosition = drawField(
//           doc,
//           "Married Sisters:",
//           user.marriedSis || "None",
//           leftMargin,
//           yPosition,
//           lineHeight,
//           x2
//         ));
//     }

//     // Partner Preferences Section
//     // yPosition += 5;
//     // drawSectionTitle("Partner Preferences");
//     // yPosition = drawField(
//     //   doc,
//     //   "Caste(s):",
//     //   user.prefCaste,
//     //   leftMargin,
//     //   yPosition,
//     //   lineHeight,
//     //   x2
//     // );
//     // yPosition = drawField(
//     //   doc,
//     //   "Education:",
//     //   user.prefEducation,
//     //   leftMargin,
//     //   yPosition,
//     //   lineHeight,
//     //   x2
//     // );
//     // yPosition = drawField(
//     //   doc,
//     //   "Working:",
//     //   user.prefWorking,
//     //   leftMargin,
//     //   yPosition,
//     //   lineHeight,
//     //   x2
//     // );
//     // yPosition = drawField(
//     //   doc,
//     //   "Location:",
//     //   user.prefLocation,
//     //   leftMargin,
//     //   yPosition,
//     //   lineHeight,
//     //   x2
//     // );

//     // Footer
//     yPosition = doc.internal.pageSize.height - 5; // Position it 20 mm from the bottom
//     doc.setFontSize(10);
//     doc.setFont("helvetica", "italic");
//     doc.text(
//       `© ${new Date().getFullYear()} Nikah Junction. All rights reserved. Privacy ensured.`,
//       105,
//       yPosition,
//       { align: "center" }
//     );

//     for (const image of images) {
//       const base64Image = await getBase64(image);

//       const img = new Image();
//       img.src = base64Image;
//       await new Promise((resolve) => (img.onload = resolve));

//       const imgWidth = img.width;
//       const imgHeight = img.height;

//       const pageWidth = 210;
//       const pageHeight = 297;

//       // Calculate aspect ratios
//       const imgAspectRatio = imgWidth / imgHeight;
//       const pageAspectRatio = pageWidth / pageHeight;

//       let finalWidth, finalHeight, x, y;

//       if (imgAspectRatio < pageAspectRatio) {
//         finalHeight = pageHeight;
//         finalWidth = imgAspectRatio * finalHeight;
//         x = (pageWidth - finalWidth) / 2;
//         y = 0;
//       } else {
//         finalWidth = pageWidth;
//         finalHeight = finalWidth / imgAspectRatio;
//         x = 0;
//         y = (pageHeight - finalHeight) / 2; // Center vertically
//       }

//       doc.addPage();
//       doc.addImage(base64Image, "JPEG", x, y, finalWidth, finalHeight);
//     }

//     doc.save(`${user.firstName} ${user.lastName}.pdf`);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <div>No user data found.</div>;
//   }

//   return (
//     <>
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="bg-white rounded-lg">
//           <h1 className="lg:text-4xl text-2xl text-pink-700 font-semibold my-4 text-center">
//             User Details and Images
//           </h1>

//           <div
//             className="rounded-lg shadow-lg lg:p-8 p-3 border border-gray-300"
//             ref={componentRef}
//           >
//             <div className="mb-8">
//               <h3 className="text-2xl font-bold text-center lg:mb-6 mb-3 text-gray-700">
//                 Personal Details
//               </h3>
//               <div className="grid grid-cols-1">
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Name:</strong>
//                   <span>{`${user.firstName} ${user.lastName}`}</span>
//                 </div>
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>DOB:</strong>
//                   <span>{`${user.day}/${user.month}/${user.year} (${new Date().getFullYear() - user.year
//                     } yrs)`}</span>
//                 </div>
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Complexion:</strong>
//                   <span>{user.complexion}</span>
//                 </div>
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Height:</strong>
//                   <span>{user.height}</span>
//                 </div>
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Marital Status:</strong>
//                   <span>
//                   {user.maritalStatus} {user.maritalStatus != "Never Married" ? `(${user.children})` : ""}
//                   </span>
//                 </div>
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Sect:</strong>
//                   <span>{user.sect}</span>
//                 </div>
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Caste:</strong>
//                   <span>
//                     {user.caste !== "Other" ? user.caste : user["other-caste"]}
//                   </span>
//                 </div>
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Partner's Caste(s):</strong>
//                   <span>{user.prefCaste}</span>
//                 </div>
//                 {/* <div className="flex justify-between lg:text-lg text-gray-600">
//                 <strong>Mother Tongue:</strong>
//                 <span>{user.language}</span>
//               </div> */}
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Currently Living:</strong>
//                   <span>{`${user.city}, ${user.state}, ${user.country}`}</span>
//                 </div>
//                 {user.country2 && (
//                   <div className="flex justify-between lg:text-xl text-gray-600">
//                     <strong>Native Place:</strong>
//                     <span>{`${user.city2}, ${user.state2}, ${user.country2}`}</span>
//                   </div>
//                 )}
//                 {user.gender === "Male" && (
//                   <div className="flex justify-between lg:text-xl text-gray-600">
//                     <strong>Does groom lives with family?</strong>
//                     <span>{user.groomLive ? "Yes" : "No"}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="my-8">
//               <h3 className="text-2xl font-bold text-center text-gray-700 lg:mb-6 mb-3">
//                 Education & Occupation
//               </h3>
//               <div className="grid grid-cols-1">
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Education:</strong>
//                   <span>
//                     {user.degree !== "Other"
//                       ? user.degree
//                       : user["other-degree"]}
//                     {/* {user.degree.substring(0, user.degree.indexOf("("))} */}
//                   </span>
//                 </div>
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Employed In:</strong>
//                   <span>
//                     {user.employedIn !== "Other"
//                       ? user.employedIn
//                       : user["other-employedIn"]}
//                   </span>
//                 </div>
//                 {user.employedIn !== "Not Working" && (
//                   <div>
//                     <div className="flex justify-between lg:text-xl text-gray-600">
//                       <strong>Occupation:</strong>
//                       <span>{user.occupation}</span>
//                     </div>
//                     <div className="flex justify-between lg:text-xl text-gray-600">
//                       <strong>Annual Income:</strong>
//                       <span>{user.income}</span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="my-8">
//               <h3 className="text-2xl font-bold text-center text-gray-700 lg:mb-6 mb-3">
//                 Family Details
//               </h3>
//               <div className="grid grid-cols-1">
//                 {/* <div className="flex justify-between lg:text-xl text-gray-600">
//                 <strong>Family Type:</strong>
//                 <span>{user.familyType}</span>
//               </div> */}
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Family Status:</strong>
//                   <span>{user.familyStatus}</span>
//                 </div>
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Family Values:</strong>
//                   <span>{user.familyLifestyle}</span>
//                 </div>
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Father's Name:</strong>
//                   <span>{user.fatherName}</span>
//                 </div>
//                 {user.fatherOccupation !== "Late" && (
//                   <div className="flex justify-between lg:text-xl text-gray-600">
//                     <strong>Father's Occupation:</strong>
//                     <span>{user.fatherOccupation}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>Mother's Name:</strong>
//                   <span>{user.motherName}</span>
//                 </div>
//                 {user.motherOccupation !== "Late" && (
//                   <div className="flex justify-between lg:text-xl text-gray-600">
//                     <strong>Mother's Occupation:</strong>
//                     <span>{user.motherOccupation}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>No. of Brothers:</strong>
//                   <span>{user.bro || "None"}</span>
//                 </div>
//                 {user.marriedBro && (
//                   <div className="flex justify-between lg:text-xl text-gray-600">
//                     <strong>No. of Married Brothers:</strong>
//                     <span>{user.marriedBro}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between lg:text-xl text-gray-600">
//                   <strong>No. of Sisters:</strong>
//                   <span>{user.sis || "None"}</span>
//                 </div>
//                 {user.marriedSis && (
//                   <div className="flex justify-between lg:text-xl text-gray-600">
//                     <strong>No. of Married Sisters:</strong>
//                     <span>{user.marriedSis}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="mt-8">
//               {/* <h3 className="text-2xl font-bold text-center text-gray-700 lg:mb-6 mb-3">
//               Partner Preferences
//             </h3>
//             <div className="grid grid-cols-1">
//               <div className="flex justify-between lg:text-xl text-gray-600">
//                 <strong>Caste(s):</strong>
//                 <span>{user.prefCaste}</span>
//               </div>
//               <div className="flex justify-between lg:text-xl text-gray-600">
//                 <strong>Education:</strong>
//                 <span>{user.prefEducation}</span>
//               </div>
//               <div className="flex justify-between lg:text-xl text-gray-600">
//                 <strong>Working:</strong>
//                 <span>{user.prefWorking}</span>
//               </div>
//               <div className="flex justify-between lg:text-xl text-gray-600">
//                 <strong>Location:</strong>
//                 <span>{user.prefLocation}</span>
//               </div>
//             </div> */}
//               <footer className="text-center text-sm text-gray-500 lg:mt-6">
//                 <p>
//                   © {new Date().getFullYear()} Nikah Junction. All rights
//                   reserved. Privacy ensured.
//                 </p>
//               </footer>
//             </div>
//           </div>

//           {/* Display images */}
//           <div className="grid grid-cols-3 gap-4 mt-12 p-1">
//             {images.length > 0 ? (
//               images.map((image, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={image}
//                     alt={`Image ${index}`}
//                     className="rounded shadow-lg h-64 w-64 object-contain"
//                   />
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-2 text-center text-gray-600">
//                 No images available
//               </div>
//             )}
//           </div>
//           <div className="justify-center flex">
//             <button
//               type="submit"
//               className="lg:w-[50%] my-8 lg:text-2xl bg-pink-700 font-bold text-white p-2 rounded-md hover:bg-pink-600"
//               onClick={generatePDF}
//             >
//               Download PDF
//             </button>
//             <button
//               type="submit"
//               className="lg:w-[50%] ml-2 my-8 lg:text-2xl bg-pink-700 font-bold text-white p-2 rounded-md hover:bg-pink-600 flex items-center justify-center"
//             >
//               <a
//                 href={`https://wa.me/+919807419006?text=Hi,%20My%20name%20is%20${user.firstName}%20${user.lastName},%20I'm%20happy%20to%20inform%20you%20that%20I%20have%20successfully%20registered%20with%20Nikah%20Junction.!`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center space-x-2"
//               >
//                 <FaWhatsapp size={30} />
//                 {/* <span>Contact Admin</span> */}
//               </a>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };














import { useEffect, useRef, useState } from "react";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import jsPDF from "jspdf";
import { FaWhatsapp } from "react-icons/fa";

const FetchAndGeneratePDF = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  let usedFirstPage = false;


  const componentRef = useRef();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "Biodata", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userImages =
            userData.imageUrls?.length > 0
              ? userData.imageUrls
              : userData.images?.map(img => img.url) || [];

          setUser(userData);
          setImages(userImages);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const getBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/jpeg");
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  const drawField = (doc, label, value, x1, yPosition, lineHeight, x2) => {
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");

    const fieldValue =
      value !== undefined && value !== null ? String(value) : "N/A";

    doc.text(label, x1, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(fieldValue, x2, yPosition, { align: "right" });

    return yPosition + lineHeight;
  };

  const generatePDF = async () => {
    if (!user) return;

    const doc = new jsPDF("portrait", "mm", "a4");
    const lineHeight = 9.0;
    const pageWidth = 210;
    const leftMargin = 15;
    const rightMargin = 15;
    const x2 = pageWidth - rightMargin;

    let yPosition = 15;

    const drawSectionHeading = (heading) => {
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text(heading, 105, yPosition, { align: "center" });
      const textWidth = doc.getTextWidth(heading);
      const startX = 105 - textWidth / 2;
      const endX = 105 + textWidth / 2;
      doc.line(startX, yPosition + 2, endX, yPosition + 2);
      yPosition += 12;
    };

    const drawSectionTitle = (title) => {
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text(title, 105, yPosition, { align: "center" });
      yPosition += 10;
    };



    drawSectionHeading("NIKAH JUNCTION");

    // ✅ Only show biodata if not Agent/India Nikah
    if (user.profileFor !== "india nikah" && user.profileFor !== "agent" && user.profileFor !== "own") {
      usedFirstPage = true;
      drawSectionTitle("Personal Details");

      yPosition = drawField(doc, "Name:", `${user.firstName} ${user.lastName}`, leftMargin, yPosition, lineHeight, x2);
      yPosition = drawField(doc, "DOB:", `${user.day}/${user.month}/${user.year} (${new Date().getFullYear() - user.year} yrs)`, leftMargin, yPosition, lineHeight, x2);
      yPosition = drawField(doc, "Complexion:", user.complexion, leftMargin, yPosition, lineHeight, x2);
      yPosition = drawField(doc, "Height:", user.height, leftMargin, yPosition, lineHeight, x2);
      yPosition = drawField(doc, "Marital Status:", `${user.maritalStatus}${user.children ? ` (${user.children})` : ""}`, leftMargin, yPosition, lineHeight, x2);
      yPosition = drawField(doc, "Sect:", user.sect, leftMargin, yPosition, lineHeight, x2);
      yPosition = drawField(doc, "Caste:", user.caste !== "Other" ? user.caste : user["other-caste"], leftMargin, yPosition, lineHeight, x2);
      yPosition = drawField(doc, "Partner's Caste(s):", user.prefCaste, leftMargin, yPosition, lineHeight, x2);
      yPosition = drawField(doc, "Currently Living:", `${user.city}, ${user.state}, ${user.country}`, leftMargin, yPosition, lineHeight, x2);

      if (user.country2) {
        yPosition = drawField(doc, "Native Place:", `${user.city2}, ${user.state2}, ${user.country2}`, leftMargin, yPosition, lineHeight, x2);
      }

      if (user.gender === "Male") {
        yPosition = drawField(doc, "Does groom lives with Family?", user.groomLive ? "Yes" : "No", leftMargin, yPosition, lineHeight, x2);
      }

      yPosition += 5;
      drawSectionTitle("Education & Occupation");
      yPosition = drawField(doc, "Education:", user.degree !== "Other" ? user.degree : user["other-degree"], leftMargin, yPosition, lineHeight, x2);
      yPosition = drawField(doc, "Employed In:", user.employedIn !== "Other" ? user.employedIn : user["other-employedIn"], leftMargin, yPosition, lineHeight, x2);

      if (user.employedIn !== "Not Working") {
        yPosition = drawField(doc, "Occupation:", user.occupation, leftMargin, yPosition, lineHeight, x2);
        yPosition = drawField(doc, "Annual Income:", user.income, leftMargin, yPosition, lineHeight, x2);
      }

      yPosition += 5;
      drawSectionTitle("Family Details");
      yPosition = drawField(doc, "Family Status:", user.familyStatus, leftMargin, yPosition, lineHeight, x2);
      yPosition = drawField(doc, "Family Values:", user.familyLifestyle, leftMargin, yPosition, lineHeight, x2);
      yPosition = drawField(doc, "Father's Name:", user.fatherName, leftMargin, yPosition, lineHeight, x2);

      if (user.fatherOccupation !== "Late") {
        yPosition = drawField(doc, "Father's Occupation:", user.fatherOccupation, leftMargin, yPosition, lineHeight, x2);
      }

      yPosition = drawField(doc, "Mother's Name:", user.motherName, leftMargin, yPosition, lineHeight, x2);

      if (user.motherOccupation !== "Late") {
        yPosition = drawField(doc, "Mother's Occupation:", user.motherOccupation, leftMargin, yPosition, lineHeight, x2);
      }

      yPosition = drawField(doc, "No. of Brothers:", user.bro || "None", leftMargin, yPosition, lineHeight, x2);

      if (user.bro !== "None") {
        yPosition = drawField(doc, "Married Brothers:", user.marriedBro || "None", leftMargin, yPosition, lineHeight, x2);
      }

      yPosition = drawField(doc, "No. of Sisters:", user.sis || "None", leftMargin, yPosition, lineHeight, x2);

      if (user.sis !== "None") {
        yPosition = drawField(doc, "Married Sisters:", user.marriedSis || "None", leftMargin, yPosition, lineHeight, x2);
      }
      // ✅ Footer
      yPosition = doc.internal.pageSize.height - 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.text(
        `© ${new Date().getFullYear()} Nikah Junction. All rights reserved. Privacy ensured.`,
        105,
        yPosition,
        { align: "center" }
      );
    }
    // ✅ Always render images regardless of profileFor
    for (const image of images) {
      const base64Image = await getBase64(image);
      const img = new Image();
      img.src = base64Image;
      await new Promise((resolve) => (img.onload = resolve));

      const imgWidth = img.width;
      const imgHeight = img.height;

      const pageAspectRatio = pageWidth / 297;
      const imgAspectRatio = imgWidth / imgHeight;

      let finalWidth, finalHeight, x, y;

      if (imgAspectRatio < pageAspectRatio) {
        finalHeight = 297;
        finalWidth = imgAspectRatio * finalHeight;
        x = (pageWidth - finalWidth) / 2;
        y = 0;
      } else {
        finalWidth = pageWidth;
        finalHeight = finalWidth / imgAspectRatio;
        x = 0;
        y = (297 - finalHeight) / 2;
      }

      if (usedFirstPage) {
        doc.addPage();
      } else {
        usedFirstPage = true; // use the first page for the first image
      }
      doc.addImage(base64Image, "JPEG", x, y, finalWidth, finalHeight);

    }
    // if (user.profileFor === "agent" || user.profileFor === "india nikah" || user.profileFor === "own") {
    //   doc.deletePage(1);
    // }
    doc.save(`${user.firstName} ${user?.lastName ? user.lastName : ""
      }.pdf`);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg">
          <h1 className="lg:text-4xl text-2xl text-pink-700 font-semibold my-4 text-center">
            User Details and Images
          </h1>

          <div
            className="rounded-lg shadow-lg lg:p-8 p-3 border border-gray-300"
            ref={componentRef}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-center lg:mb-6 mb-3 text-gray-700">
                Personal Details
              </h3>
              <div className="grid grid-cols-1">
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Name:</strong>
                  <span>{`${user.firstName} ${user.lastName}`}</span>
                </div>
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>DOB:</strong>
                  <span>{`${user.day}/${user.month}/${user.year} (${new Date().getFullYear() - user.year
                    } yrs)`}</span>
                </div>
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Complexion:</strong>
                  <span>{user.complexion}</span>
                </div>
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Height:</strong>
                  <span>{user.height}</span>
                </div>
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Marital Status:</strong>
                  <span>
                    {user.maritalStatus} {user.maritalStatus != "Never Married" ? `(${user.children})` : ""}
                  </span>
                </div>
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Sect:</strong>
                  <span>{user.sect}</span>
                </div>
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Caste:</strong>
                  <span>
                    {user.caste !== "Other" ? user.caste : user["other-caste"]}
                  </span>
                </div>
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Partner's Caste(s):</strong>
                  <span>{user.prefCaste}</span>
                </div>
                {/* <div className="flex justify-between lg:text-lg text-gray-600">
                <strong>Mother Tongue:</strong>
                <span>{user.language}</span>
              </div> */}
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Currently Living:</strong>
                  <span>{`${user.city}, ${user.state}, ${user.country}`}</span>
                </div>
                {user.country2 && (
                  <div className="flex justify-between lg:text-xl text-gray-600">
                    <strong>Native Place:</strong>
                    <span>{`${user.city2}, ${user.state2}, ${user.country2}`}</span>
                  </div>
                )}
                {user.gender === "Male" && (
                  <div className="flex justify-between lg:text-xl text-gray-600">
                    <strong>Does groom lives with family?</strong>
                    <span>{user.groomLive ? "Yes" : "No"}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="my-8">
              <h3 className="text-2xl font-bold text-center text-gray-700 lg:mb-6 mb-3">
                Education & Occupation
              </h3>
              <div className="grid grid-cols-1">
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Education:</strong>
                  <span>
                    {user.degree !== "Other"
                      ? user.degree
                      : user["other-degree"]}
                    {/* {user.degree.substring(0, user.degree.indexOf("("))} */}
                  </span>
                </div>
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Employed In:</strong>
                  <span>
                    {user.employedIn !== "Other"
                      ? user.employedIn
                      : user["other-employedIn"]}
                  </span>
                </div>
                {user.employedIn !== "Not Working" && (
                  <div>
                    <div className="flex justify-between lg:text-xl text-gray-600">
                      <strong>Occupation:</strong>
                      <span>{user.occupation}</span>
                    </div>
                    <div className="flex justify-between lg:text-xl text-gray-600">
                      <strong>Annual Income:</strong>
                      <span>{user.income}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="my-8">
              <h3 className="text-2xl font-bold text-center text-gray-700 lg:mb-6 mb-3">
                Family Details
              </h3>
              <div className="grid grid-cols-1">
                {/* <div className="flex justify-between lg:text-xl text-gray-600">
                <strong>Family Type:</strong>
                <span>{user.familyType}</span>
              </div> */}
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Family Status:</strong>
                  <span>{user.familyStatus}</span>
                </div>
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Family Values:</strong>
                  <span>{user.familyLifestyle}</span>
                </div>
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Father's Name:</strong>
                  <span>{user.fatherName}</span>
                </div>
                {user.fatherOccupation !== "Late" && (
                  <div className="flex justify-between lg:text-xl text-gray-600">
                    <strong>Father's Occupation:</strong>
                    <span>{user.fatherOccupation}</span>
                  </div>
                )}
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>Mother's Name:</strong>
                  <span>{user.motherName}</span>
                </div>
                {user.motherOccupation !== "Late" && (
                  <div className="flex justify-between lg:text-xl text-gray-600">
                    <strong>Mother's Occupation:</strong>
                    <span>{user.motherOccupation}</span>
                  </div>
                )}
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>No. of Brothers:</strong>
                  <span>{user.bro || "None"}</span>
                </div>
                {user.marriedBro && (
                  <div className="flex justify-between lg:text-xl text-gray-600">
                    <strong>No. of Married Brothers:</strong>
                    <span>{user.marriedBro}</span>
                  </div>
                )}
                <div className="flex justify-between lg:text-xl text-gray-600">
                  <strong>No. of Sisters:</strong>
                  <span>{user.sis || "None"}</span>
                </div>
                {user.marriedSis && (
                  <div className="flex justify-between lg:text-xl text-gray-600">
                    <strong>No. of Married Sisters:</strong>
                    <span>{user.marriedSis}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8">
              {/* <h3 className="text-2xl font-bold text-center text-gray-700 lg:mb-6 mb-3">
              Partner Preferences
            </h3>
            <div className="grid grid-cols-1">
              <div className="flex justify-between lg:text-xl text-gray-600">
                <strong>Caste(s):</strong>
                <span>{user.prefCaste}</span>
              </div>
              <div className="flex justify-between lg:text-xl text-gray-600">
                <strong>Education:</strong>
                <span>{user.prefEducation}</span>
              </div>
              <div className="flex justify-between lg:text-xl text-gray-600">
                <strong>Working:</strong>
                <span>{user.prefWorking}</span>
              </div>
              <div className="flex justify-between lg:text-xl text-gray-600">
                <strong>Location:</strong>
                <span>{user.prefLocation}</span>
              </div>
            </div> */}
              <footer className="text-center text-sm text-gray-500 lg:mt-6">
                <p>
                  © {new Date().getFullYear()} Nikah Junction. All rights
                  reserved. Privacy ensured.
                </p>
              </footer>
            </div>
          </div>

          {/* Display images */}
          <div className="grid grid-cols-3 gap-4 mt-12 p-1">
            {images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Image ${index}`}
                    className="rounded shadow-lg h-64 w-64 object-contain"
                  />
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-600">
                No images available
              </div>
            )}
          </div>
          <div className="justify-center flex">
            <button
              type="submit"
              className="lg:w-[50%] my-8 lg:text-2xl bg-pink-700 font-bold text-white p-2 rounded-md hover:bg-pink-600"
              onClick={generatePDF}
            >
              Download PDF
            </button>
            <button
              type="submit"
              className="lg:w-[50%] ml-2 my-8 lg:text-2xl bg-pink-700 font-bold text-white p-2 rounded-md hover:bg-pink-600 flex items-center justify-center"
            >
              <a
                href={`https://wa.me/+919807419006?text=Hi,%20My%20name%20is%20${user.firstName}%20${user?.lastName ? user.lastName : ""
                  },%20I'm%20happy%20to%20inform%20you%20that%20I%20have%20successfully%20registered%20with%20Nikah%20Junction.!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <FaWhatsapp size={30} />
                {/* <span>Contact Admin</span> */}
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FetchAndGeneratePDF;


// export default FetchAndGeneratePDF;
