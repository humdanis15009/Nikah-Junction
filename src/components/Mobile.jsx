import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { updateEmail, sendEmailVerification } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const EmailVerification = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailUpdateAndSendVerification = async () => {
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const user = auth.currentUser;
      const oldEmail = user.email;

      await updateEmail(user, email);
      await sendEmailVerification(user);

      const userDocRef = doc(db, "Biodata", user.uid);
      await updateDoc(userDocRef, {
        oldEmail: oldEmail,
        verifiedEmail: email,
      });

      setSuccess("Verification email sent! Please check your inbox.");
    } catch (err) {
      console.error("Error during email verification:", err);

      // Check for specific error codes
      if (err.code === "auth/invalid-email") {
        setError("The email address is not valid.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email address is already in use.");
      } else if (err.code === "auth/requires-recent-login") {
        setError("Please log in again to update your email.");
      } else {
        setError("Failed to send verification email. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const checkEmailVerification = async () => {
          await user.reload();
          if (user.emailVerified) {
            // navigate(`/UserCardList`);
          }
        };
        const intervalId = setInterval(checkEmailVerification, 1000);

        return () => clearInterval(intervalId);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <div className="border-gray-300 border-t-2 flex flex-col items-center p-6 max-w-3xl my-16 mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-3xl pb-6 font-semibold mb-4">Email Verification</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="mb-4 p-2 border border-gray-300 rounded lg:w-[50%] w-[300px]"
        />
        <button
          onClick={handleEmailUpdateAndSendVerification}
          disabled={isSubmitting}
          className="bg-pink-700 h-9 w-40 font-semibold text-white rounded hover:bg-pink-600 flex items-center justify-center"
        >
          {isSubmitting ? "Sending..." : "Verify Email"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </div>
    </>
  );
};

export default EmailVerification;
