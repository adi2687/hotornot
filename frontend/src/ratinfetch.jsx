import React, { useEffect, useState } from "react";
import ratings from "../ratingmain.json"; // Keep this as fallback data
const RatingFetch = () => {
  const [randomImages, setRandomImages] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);
  const [selected, setSelected] = useState("");
  const [rating, setRating] = useState(0); // Track the selected image's rating
  const [oppositeRating, setOppositeRating] = useState(0);
  const [oppositeImg, setOppositeImg] = useState("");
  const length = ratings.length;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [allrating, setallrating] = useState([]);
  // Fetch random images and their ratings from the backend
  const getRandomImages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/get-ratings");
      const data = await response.json();
      if (Array.isArray(data) && data.length === 2) {
        const images = data.map((item) => item.Filename);
        const ratings = data.map((item) => item.Rating);

        setRandomImages(images);
        setRatingsData(ratings);
        setSelected("");
        setRating(0);
        setOppositeRating(0);
        setOppositeImg("");
      } else {
        console.error("Unexpected data format from API:", data);
      }
    } catch (error) {
      console.error("Error fetching images and ratings:", error);
    }
  };

  useEffect(() => {
    getRandomImages();
  }, []);

  const [index, setselect] = useState(0);
  const select = (images, ratings, index) => {
    const img = images[index];
    const selectedRating = ratings[index];
    const oppositeimg = images[1 - index];
    const oppositeRating = ratings[1 - index];
    setOppositeImg(oppositeimg);
    setOppositeRating(oppositeRating);
    setSelected(img);
    setRating(selectedRating);
    setselect(index);
  };

  const handleRate = async () => {
    if (selected === "") {
      console.log("No image selected.");
      return;
    }

    if (!oppositeImg || !oppositeRating) {
      alert("Please select opposite image first");
      return;
    }

    const playerIndex = randomImages.indexOf(selected);
    const playerRating = ratingsData[playerIndex];
    let e = 1 / (1 + Math.pow(10, (oppositeRating - playerRating) / 400));
    console.log(e);

    const newPlayerRating = playerRating + 32 * (1 - e);
    console.log("Updated Player Rating:", newPlayerRating);

    // Update the backend with the new rating
    try {
      const response = await fetch("http://localhost:5000/api/update-rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedImage: selected,
          newRating: newPlayerRating,
        }),
      });
      const result = await response.json();
      console.log(result); // Handle the response from the backend
    } catch (error) {
      console.error("Error updating rating:", error);
    }

    getRandomImages(); // Refresh the images after rating
  };

  const [showPopup, setShowPopup] = useState(false);

  const ratingall = () => {
    fetch(`${backendUrl}/api/all-rating`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.rating)) {
          setallrating(data.rating); // Corrected to access the rating array
          setShowPopup(true); // show the popup
        } else {
          console.error("Received invalid data:", data);
        }
      })
      .catch((error) => console.error("Error fetching all ratings:", error));
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 justify-center items-center ">
      <div className="container mx-auto p-6">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Image Rating</h1>
          <p className="text-lg text-gray-600">Select and rate images below.</p>
        </header>

        {/* Rating Section */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          {selected && (
            <p className="mb-4 font-semibold text-gray-700 text-center text-lg">
              You selected: {index === 0 ? "Image 1" : "Image 2"}
            </p>
          )}

          <h2 className="text-xl font-bold mb-4 text-gray-800">Ratings</h2>

          {/* Centering Images */}
          <div className="flex justify-center items-center space-x-4 flex-wrap">
            {randomImages.map((image, index) => (
              <div
                key={index}
                className="bg-gray-200 p-4 rounded-lg w-1/4 max-w-[350px] min-w-[400px]"
              >
                <img
                  src={`./Images/${image}`}
                  alt={`random-image-${index}`}
                  onClick={() => select(randomImages, ratingsData, index)}
                  className="cursor-pointer rounded-lg"
                />
                <div className="mt-2 text-center text-gray-600">
                  Rating: {ratingsData[index]}
                </div>
              </div>
            ))}
          </div>

          <br />
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={handleRate}
              className="cursor-pointer border-2 border-red-500 bg-red-500 p-4 text-white rounded-lg shadow-lg hover:bg-red-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Rate
            </button>
            <button
              onClick={ratingall}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 cursor-pointer"
            >
              Ratings
            </button>
          </div>

          {/* All Ratings Modal */}
          {showPopup && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-2xl w-[90vw] max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          All Ratings
        </h2>
        <button
          className="text-red-500 text-lg font-bold hover:text-red-700"
          onClick={() => setShowPopup(false)}
        >
          ✕
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allrating.map((item, idx) => (
          <div key={idx} className="bg-gray-100 p-4 rounded-lg text-center">
            <img
              src={`./Images/${item.Filename}`}
              alt={`Image ${idx}`}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <p className="text-lg font-semibold text-gray-700">
              {item.Filename}
            </p>
            <p className="text-sm text-gray-600">
              Rating: {item.Rating}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default RatingFetch;
