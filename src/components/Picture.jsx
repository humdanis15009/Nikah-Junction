import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayRemove } from "firebase/firestore";
import imageCompression from "browser-image-compression";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";

const Picture = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingImages, setFetchingImages] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [userId, setUserId] = useState("");
  const maxFiles = 5;
  const storage = getStorage();
  const firestore = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchExistingImages = async () => {
      if (!userId) return;

      try {
        setFetchingImages(true);
        const userDocRef = doc(firestore, "Biodata", userId);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUploadedImages(userData.images || []);
          setMainImage(userData.mainImage || "");
        }
      } catch (error) {
        setModalMessage("Error loading images. Please refresh the page.");
        setShowModal(true);
      } finally {
        setFetchingImages(false);
      }
    };

    fetchExistingImages();
  }, [userId, firestore]);

  useEffect(() => {
    previews.forEach((preview) => URL.revokeObjectURL(preview));

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [selectedFiles]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const totalImages = selectedFiles.length + uploadedImages.length + files.length;

    if (totalImages > maxFiles) {
      setModalMessage(
        `You can only upload a maximum of ${maxFiles} images. You currently have ${uploadedImages.length} uploaded and ${selectedFiles.length} selected. You can add ${maxFiles - uploadedImages.length - selectedFiles.length} more.`
      );
      setShowModal(true);
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setModalMessage("Please select at least one image to upload.");
      setShowModal(true);
      return;
    }

    if (selectedFiles.length + uploadedImages.length > maxFiles) {
      setModalMessage(
        `Cannot upload ${selectedFiles.length} images. You have ${uploadedImages.length} uploaded. Maximum is ${maxFiles}.`
      );
      setShowModal(true);
      return;
    }

    setLoading(true);

    const compressionOptions = {
      maxSizeMB: 10,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.8,
    };

    const uploadPromises = selectedFiles.map(async (file) => {
      try {
        const compressedFile = await imageCompression(file, compressionOptions);
        const uniqueName = `${userId}_${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `images/${uniqueName}`);
        
        const metadata = {
          customMetadata: {
            userId: userId,
            uploadedBy: auth.currentUser?.email || userId,
            originalName: file.name
          }
        };
        
        await uploadBytes(storageRef, compressedFile, metadata);
        const downloadURL = await getDownloadURL(storageRef);

        return { 
          url: downloadURL, 
          name: uniqueName,
          uploadedAt: new Date().toISOString()
        };
      } catch (error) {
        return null;
      }
    });

    try {
      const uploaded = await Promise.all(uploadPromises);
      const validUploadedImages = uploaded.filter((img) => img !== null);

      const allUploadedImages = [...uploadedImages, ...validUploadedImages];

      const userDocRef = doc(firestore, "Biodata", userId);
      await setDoc(
        userDocRef,
        { 
          images: allUploadedImages,
          mainImage: mainImage || allUploadedImages[0]?.url || ""
        },
        { merge: true }
      );

      setUploadedImages(allUploadedImages);
      if (!mainImage && allUploadedImages.length > 0) {
        setMainImage(allUploadedImages[0].url);
      }
      setSelectedFiles([]);
      setPreviews([]);

      setModalMessage("Images uploaded successfully!");
      setShowModal(true);
    } catch (error) {
      setModalMessage("Upload failed. Please try again.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMainImage = async (imageUrl) => {
    setMainImage(imageUrl);

    const userDocRef = doc(firestore, "Biodata", userId);
    try {
      await updateDoc(userDocRef, { mainImage: imageUrl });
    } catch (error) {
      setModalMessage("Failed to set main image. Please try again.");
      setShowModal(true);
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const handleRemoveUploadedImage = async (imageToRemove) => {
    try {
      let storagePath;
      
      if (imageToRemove.name) {
        storagePath = `images/${imageToRemove.name}`;
      } else {
        const url = imageToRemove.url || imageToRemove;
        const decodedUrl = decodeURIComponent(url);
        const pathMatch = decodedUrl.match(/\/o\/(.+?)\?/);
        
        if (pathMatch && pathMatch[1]) {
          storagePath = pathMatch[1];
        } else {
          throw new Error("Could not extract storage path from URL");
        }
      }

      const imageRef = ref(storage, storagePath);
      await deleteObject(imageRef);

      const userDocRef = doc(firestore, "Biodata", userId);
      await updateDoc(userDocRef, {
        images: arrayRemove(imageToRemove)
      });

      const updatedImages = uploadedImages.filter(
        (img) => (img.name ? img.name !== imageToRemove.name : img.url !== imageToRemove.url)
      );
      setUploadedImages(updatedImages);

      const imageUrl = imageToRemove.url || imageToRemove;
      if (mainImage === imageUrl) {
        const newMainImage = updatedImages[0]?.url || "";
        setMainImage(newMainImage);
        await updateDoc(userDocRef, { mainImage: newMainImage });
      }

      setModalMessage("Image deleted successfully!");
      setShowModal(true);
    } catch (error) {
      setModalMessage("Failed to delete image. Please try again.");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  const remainingSlots = maxFiles - uploadedImages.length - selectedFiles.length;

  if (fetchingImages) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-pink-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="border-gray-300 border-t-2 flex flex-col items-center p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg my-16">
      <h2 className="text-3xl pb-6 font-semibold mb-4">Upload Your Photos</h2>

      <div className="mb-4 text-center">
        <p className="text-gray-700 font-medium">
          Images uploaded: <span className="text-pink-600 font-bold">{uploadedImages.length}</span> / {maxFiles}
        </p>
        {remainingSlots > 0 && (
          <p className="text-green-600 font-medium">
            You can upload {remainingSlots} more image{remainingSlots !== 1 ? "s" : ""}
          </p>
        )}
        {remainingSlots === 0 && (
          <p className="text-red-500 font-semibold">
            Maximum limit reached. Delete images to upload new ones.
          </p>
        )}
      </div>

      {uploadedImages.length > 0 && (
        <div className="mb-6 w-full">
          <h3 className="text-xl font-semibold mb-3 text-center">Your Uploaded Images</h3>
          <p className="text-gray-500 mb-4 text-center text-sm">
            Click on an image to set it as your main display picture (DP)
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            {uploadedImages.map((image, index) => (
              <div key={image.name || index} className="relative group">
                <img
                  src={image.url}
                  alt={`Uploaded ${index + 1}`}
                  className={`h-48 w-48 rounded-lg border border-gray-300 object-cover shadow-md cursor-pointer transition-transform duration-200 ${
                    mainImage === image.url
                      ? "ring-4 ring-pink-600 transform scale-105"
                      : "hover:scale-105"
                  }`}
                  onClick={() => handleSelectMainImage(image.url)}
                />
                <button
                  onClick={() => handleRemoveUploadedImage(image)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white h-8 w-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete image"
                >
                  ✕
                </button>
                {mainImage === image.url && (
                  <span className="absolute top-2 left-2 font-bold text-white bg-green-600 rounded-full px-2 py-1 text-xs">
                    ⭐ Main DP
                  </span>
                )}
                <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Uploaded
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {remainingSlots > 0 && (
        <div className="mb-4 w-full max-w-md">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select images to upload:
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
          />
        </div>
      )}

      {previews.length > 0 && (
        <div className="mb-6 w-full">
          <h3 className="text-xl font-semibold mb-3 text-center">Preview (Not Uploaded Yet)</h3>
          <div className="flex gap-4 flex-wrap justify-center">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="h-48 w-48 rounded-lg border border-gray-300 object-cover shadow-md"
                />
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white h-8 w-8 rounded-full flex items-center justify-center"
                  title="Remove from selection"
                >
                  ✕
                </button>
                <span className="absolute bottom-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Preview
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedFiles.length > 0 && (
        <button
          onClick={handleUpload}
          className={`bg-pink-700 font-semibold text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Uploading...
            </span>
          ) : (
            `Upload ${selectedFiles.length} Image${selectedFiles.length !== 1 ? "s" : ""}`
          )}
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Notice</h3>
            <p className="text-gray-700 mb-6 whitespace-pre-line">{modalMessage}</p>
            <button
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
              onClick={closeModal}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Picture;
