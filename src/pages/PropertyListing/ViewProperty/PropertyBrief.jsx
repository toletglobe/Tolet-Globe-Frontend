import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"; // Import the slider
import toast from "react-hot-toast";
import Popup from "reactjs-popup";

import { MdOutlineStarPurple500 } from "react-icons/md";
import { CiShare2, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";

import profile from "../../../assets/propertyListing/author.jpg";
import fav from "../../../assets/propertyListing/starbadge.png";
import shield from "../../../assets/propertyListing/shield.png";
import defaultHouse from "../../../assets/propertyListing/defaultHouse.png";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useStateValue } from "../../../StateProvider";

import { API } from "../../../config/axios";

const ItemTypes = {
  COMPARE_BUTTON: "compareButton",
};

const PropertyBrief = ({ property , isOwnerOrAdmin , fetchProperty}) => {
  const navigate = useNavigate();
  const [{ compareProperty }, dispatch] = useStateValue();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [favouriteList, setFavouriteList] = useState([]);
  const [showRectangle, setShowRectangle] = useState(false);
  const [showCompareCard, setShowCompareCard] = useState(false);

  const authState = useSelector((state) => state.auth);
  const [totalReviews, setTotalReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const maskPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    const numberStr = phoneNumber.toString();
    const visiblePart = numberStr.slice(0, -8);
    const maskedPart = "--------";
    return `${visiblePart}${maskedPart}`;
  };

  useEffect(() => {
    console.log("User data", authState?.userData)
    const fetchFavouriteProperties = async () => {
      try {
        if (!authState?.userData?.id) {
          return;
        }

        const token = localStorage.getItem("token");

        const response = await API.post(
          "user/getFavourites",
          {
            userId: authState.userData.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const favouriteList = response.data.favouritesList.favourites;

        console.log(favouriteList);

        setFavouriteList(favouriteList);
      } catch (error) {
        console.log("Error fetching favourite properties:", error);
      }
    };
    fetchFavouriteProperties();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await API.get(`reviews/users/${property._id}`);
        setTotalReviews(res.data.totalReviews); // direct from API
        setAverageRating(res.data.averageRating); // rounded here
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (property?._id) {
      fetchReviews();
    }
  }, [property]);

  console.log("averageRating:", averageRating, typeof averageRating);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (property?.images?.length || 1) - 1 : prevIndex - 1
    );
    setSelectedImage(property?.images[currentIndex]);
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (property?.images?.length || 1)
    );
    setSelectedImage(property?.images[currentIndex]);
  };

  const addToCompare = (property) => {
    const alreadyInCompare = compareProperty.find(
      (item) => item.slug === property.slug
    );

    // if(property.availabilityStatus !== "Available") return toast.error("This property is already rented out")
    // if(property.availabilityStatus === "NA") return toast.error("This property is Not Available")

    if (alreadyInCompare) {
      setErrorMessage("This property is already in the compare list!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (compareProperty.length >= 4) {
      setErrorMessage("You can only compare up to 4 properties.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    dispatch({
      type: "ADD_TO_COMPARE",
      item: property,
    });
    setShowPrompt(true);
    setTimeout(() => setShowPrompt(false), 1000);
    setShowCompareCard(true);
    setShowRectangle(false);
  };

  const addToFavourites = async (propertyId) => {
    try {
      if (!authState.status) {
        toast.error("Login First!");
        return navigate("/login", { replace: true });
      }

      const token = localStorage.getItem("token");

      const updateddata = await API.post(
        "user/addToFavourites",
        {
          userId: authState.userData.id,
          propertyId: propertyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to favorites!");
      setFavouriteList([...favouriteList, propertyId]);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to favorites");
    }
  };

  // Change the availibility status. 
  const changeAvailibilityStatus = async (propertyId) => {
  try {
    const newStatus = property.availabilityStatus === "Available" 
      ? "Rented Out" 
      : "Available";
    
    const token = localStorage.getItem("token");
    await API.put(
      `property/${propertyId}/availability`,
      { availabilityStatus: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    toast.success(
      `Property marked as ${newStatus === "Available" 
        ? "Available" 
        : "Rented Out"} successfully`
    );
    
    // Refresh the property data
    await fetchProperty();
    
  } catch (error) {
    console.error("Error updating availability status:", error);
    toast.error("Failed to update availability status");
  }
};

  const removeFromFavourites = async (propertyId) => {
    try {
      if (!authState.status) {
        toast.error("Login First!");
        return navigate("/login", { replace: true });
      }

      const token = localStorage.getItem("token");

      await API.post(
        "user/removeFromFavourites",
        {
          userId: authState.userData.id,
          propertyId: propertyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Removed from favorites!");
      setFavouriteList(favouriteList.filter((id) => id !== propertyId));
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove from favorites");
    }
  };

  const isInCompareList = (property) => {
    return compareProperty.some((item) => item._id === property._id);
  };

  const removeFromCompare = (property) => {
    dispatch({
      type: "REMOVE_FROM_COMPARE",
      item: property,
    });
    setShowCompareCard(false);
  };

  const handleImageError = (e) => {
    e.target.src = defaultHouse;
  };

  // Custom Arrow Components for the property card slider
  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-white/30 hover:bg-slate-200 text-black rounded-full cursor-pointer z-10 flex items-end justify-center w-5 h-5 lg:w-9 lg:h-9"
      onClick={onClick}
    >
      <span className="text-2xl leading-none justify-center flex items-center lg:text-5xl">
        &#8249;
      </span>
    </div>
  );

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-white/30 hover:bg-slate-200 text-black rounded-full cursor-pointer z-10 flex items-end justify-center w-5 h-5 lg:w-9 lg:h-9"
      onClick={onClick}
    >
      <span className="text-2xl leading-none justify-center flex items-center lg:text-5xl">
        &#8250;
      </span>
    </div>
  );

  const cardSliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    draggable: false,
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <div className="next-arrow text-white text-4xl">&#8594;</div>,
    prevArrow: <div className="prev-arrow text-white text-4xl ">&#8592;</div>,
  };

  const DraggableCompareButton = ({ compareProperty, onNavigate }) => {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({
      top: window.innerHeight / 1.1,
      left: window.innerWidth / 2 - 75,
    });

    const handleDrop = (monitor) => {
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset || !buttonRef.current) return;

      const { x, y } = clientOffset;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Get button dimensions
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const buttonWidth = buttonRect.width;
      const buttonHeight = buttonRect.height;

      // Calculate center of the button after drop
      const buttonCenterX = x;
      const buttonCenterY = y;

      // Define middle area (50% from each edge)
      const middleLeft = windowWidth * 0.25;
      const middleRight = windowWidth * 0.75;
      const middleTop = windowHeight * 0.25;
      const middleBottom = windowHeight * 0.75;

      // Check if dropped in middle area
      const droppedInMiddle =
        buttonCenterX >= middleLeft &&
        buttonCenterX <= middleRight &&
        buttonCenterY >= middleTop &&
        buttonCenterY <= middleBottom;

      let finalX = x - buttonWidth / 2;
      let finalY = y - buttonHeight / 2;

      if (droppedInMiddle) {
        // If dropped in middle, move to nearest edge
        const distanceToLeft = buttonCenterX - middleLeft;
        const distanceToRight = middleRight - buttonCenterX;
        const distanceToTop = buttonCenterY - middleTop;
        const distanceToBottom = middleBottom - buttonCenterY;

        const minDistance = Math.min(
          distanceToLeft,
          distanceToRight,
          distanceToTop,
          distanceToBottom
        );

        if (minDistance === distanceToLeft) {
          // Move to left edge of middle area
          finalX = middleLeft - buttonWidth - 20;
          finalY = Math.max(
            20,
            Math.min(finalY, windowHeight - buttonHeight - 20)
          );
        } else if (minDistance === distanceToRight) {
          // Move to right edge of middle area
          finalX = middleRight + 20;
          finalY = Math.max(
            20,
            Math.min(finalY, windowHeight - buttonHeight - 20)
          );
        } else if (minDistance === distanceToTop) {
          // Move to top edge of middle area
          finalX = Math.max(
            20,
            Math.min(finalX, windowWidth - buttonWidth - 20)
          );
          finalY = middleTop - buttonHeight - 20;
        } else {
          // Move to bottom edge of middle area
          finalX = Math.max(
            20,
            Math.min(finalX, windowWidth - buttonWidth - 20)
          );
          finalY = middleBottom + 20;
        }
      }

      // Ensure button stays within viewport bounds (20px margin)
      finalX = Math.max(20, Math.min(finalX, windowWidth - buttonWidth - 20));
      finalY = Math.max(20, Math.min(finalY, windowHeight - buttonHeight - 20));

      setPosition({
        top: finalY,
        left: finalX,
      });
    };

    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.COMPARE_BUTTON,
      item: { type: ItemTypes.COMPARE_BUTTON },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: ItemTypes.COMPARE_BUTTON,
      drop: (item, monitor) => handleDrop(monitor),
    });

    const dragDropRef = useCallback(
      (node) => {
        drag(node);
        buttonRef.current = node;
      },
      [drag]
    );

    // Handle window resize to keep button in bounds
    useEffect(() => {
      const handleResize = () => {
        if (!buttonRef.current) return;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const buttonWidth = buttonRect.width;
        const buttonHeight = buttonRect.height;

        setPosition((prev) => ({
          top: Math.max(
            20,
            Math.min(prev.top, windowHeight - buttonHeight - 20)
          ),
          left: Math.max(
            20,
            Math.min(prev.left, windowWidth - buttonWidth - 20)
          ),
        }));
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
      <>
        {/* Full-screen drop zone */}
        <div
          ref={drop}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: isDragging ? 999 : -1,
            pointerEvents: isDragging ? "auto" : "none",
          }}
        />

        {/* Draggable button */}
        <div
          ref={dragDropRef}
          onClick={onNavigate}
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            zIndex: 1000,
            cursor: isDragging ? "grabbing" : "grab",
            transition: isDragging ? "none" : "all 0.3s ease",
            backgroundColor: "#3B9D94",
            padding: "12px 16px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            opacity: isDragging ? 0.8 : 1,
          }}
        >
          <span style={{ fontWeight: "bold", color: "white" }}>Compare</span>
          <span
            style={{
              backgroundColor: "#2A7A72",
              color: "white",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {compareProperty.length}
          </span>
        </div>
      </>
    );
  };

  return (
    <div className="px-4 py-4 relative">
      {showPrompt && (
        <div
          className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg z-50"
          style={{ transition: "opacity 0.3s ease-in-out" }}
        >
          Property added to compare successfully!
        </div>
      )}

      {errorMessage && (
        <div
          className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-50"
          style={{ transition: "opacity 0.3s ease-in-out" }}
        >
          {errorMessage}
        </div>
      )}

      {property.images.length > 0 ? (
        <div className="relative">
          <div className="hidden lg:flex  gap-2 h-[500px]">
            <div className="w-1/2">
              <img
                {property.images && property.images.length > 0 ? (
  <img
    src={property.images[0]}
    alt={property.propertyType || "Property Image"}
    className="w-full h-full object-cover rounded-lg cursor-pointer"
    onClick={() => openModal(property.images[0], 0)}
    onError={handleImageError}
  />
) : (
  <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
    <span className="text-gray-500 text-sm">No Image Available</span>
  </div>
)}

              />
            </div>

            <div className="w-1/2 grid grid-cols-2 gap-2">
              {property.images.slice(1, 5).map((image, index) => (
                <div key={index + 1} className="relative">
                  <img
                    src={image}
                    alt={`${property.propertyType} ${index + 2}`}
                    className="w-full h-[246px] object-cover rounded-lg cursor-pointer"
                    onClick={() => openModal(image, index + 1)}
                    onError={handleImageError}
                  />
                  {index === 3 && property.images.length > 5 && (
                    <div
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer rounded-lg"
                      onClick={() => openModal(image, index + 1)}
                    >
                      <span className="text-white text-lg font-medium items-center justify-center">
                        See all
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:hidden">
            <div className="w-full mb-2">
              <img
                src={property.images[0]}
                alt={property.propertyType}
                className="w-full h-[300px] object-cover rounded-lg cursor-pointer"
                onClick={() => openModal(property.images[0], 0)}
                onError={handleImageError}
              />
            </div>

            {property.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {property.images.slice(1, 4).map((image, index) => (
                  <div key={index + 1} className="relative">
                    <img
                      src={image}
                      alt={`${property.propertyType} ${index + 2}`}
                      className="w-full h-[70px] object-cover cursor-pointer"
                      onClick={() => openModal(image, index + 1)}
                      onError={handleImageError}
                    />
                    {index === 2 && property.images.length > 4 && (
                      <div
                        className="absolute  inset-0 bg-black bg-opacity-80 flex items-center justify-center cursor-pointer"
                        onClick={() => openModal(image, index + 1)}
                      >
                        <span className="text-white text-sm font-medium">
                          See all
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="py-40 text-center text-4xl font-semibold">
          No Images Available for this Property
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 text-white">
            <h3 className="text-lg text-center font-medium">Images</h3>
            <button
              onClick={closeModal}
              className="text-white text-3xl hover:text-gray-300"
            >
              ✖
            </button>
          </div>

          <div className="flex-1 flex overflow-y-auto p-4">
            {/* Image Slider for Large Screens */}
            <div className="lg:flex-1 lg:overflow-y-auto p-10 lg:block relative flex items-center justify-center">
              {property.images.length === 1 ? (
                <div className="w-full flex items-center justify-center">
                  <img
                    src={property.images[0]}
                    alt={`${property.propertyType} 1`}
                    className="h-[500px] rounded-lg block"
                    onError={handleImageError}
                  />
                </div>
              ) : (
                <Slider {...sliderSettings}>
                  {property.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-full items-center justify-center !flex"
                    >
                      <img
                        src={image}
                        alt={`${property.propertyType} ${index + 1}`}
                        className="h-[500px] rounded-lg block"
                        onError={handleImageError}
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>

            {/* Image Grid for Small Screens */}
            <div className="lg:hidden flex-1 overflow-y-auto p-4">
              <div className="max-w-4xl mx-auto space-y-4">
                {property.images.map((image, index) => (
                  <div key={index} className="w-full">
                    <img
                      src={image}
                      alt={`${property.propertyType} ${index + 1}`}
                      className="w-full h-auto rounded-lg"
                      onError={handleImageError}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div className="p-4 text-center text-white bg-black bg-opacity-50">
            Photos | Videos | Property Map
          </div> */}
        </div>
      )}

      {/* Compare button - Shown when property is added to compare */}
      {(showCompareCard || compareProperty.length > 0) && (
        <DndProvider backend={HTML5Backend}>
          <DraggableCompareButton
            compareProperty={compareProperty}
            onNavigate={() => {
              addToCompare(property);
              navigate("/compare-property");
            }}
          />
        </DndProvider>
      )}

      <div className="md:flex justify-between pt-8">
        <div className="lg:w-[40%]">
          <h1 className="text-left text-white lg:text-5xl">
            {property?.propertyType} 
            <span>
              <img
                src={shield}
                alt="shield"
                className="h-7 lg:h-12 w-7 lg:w-12 lg:ml-8 inline"
              />
            </span>
          </h1>
          <p className="text-gray-400 block lg:text-2xl lg:py-4">
            {/* <span className="blur-sm">,{property?.area}</span>,{property?.area}, */}
           <span> {isOwnerOrAdmin ? property?.address : `---------` } </span>,{property?.area},{property?.locality},
            {property?.city}
          </p>

          <div className="flex items-center lg:text-2xl lg:pb-4">
            <MdOutlineStarPurple500 className="text-[#FFC700] mt-1" />
            <p className="ml-2 text-gray-600">
              {averageRating.toFixed(1)} ({totalReviews} Reviews)
            </p>
          </div>

          <div className="border border-gray-600 rounded-lg p-1 sm:p-1 mb-8 mt-2 flex flex-row lg:flex-row justify-evenly items-center gap-2 lg:gap-4 w-full">
            {/* Monthly Rent Section */}
            <div className="text-center w-full sm:w-auto flex flex-col items-center justify-center gap-1">
              <p className="text-gray-400 lg:text-2xl text-[0.8rem] sm:text-base">
                Monthly Rent
              </p>
              <h3 className="text-white text-md lg:text-2xl font-bold">
                Rs. {property?.rent}
              </h3>
            </div>

            {/* Vertical Divider */}
            <div className="border-l border-gray-600 h-[30px] sm:h-[50px]"></div>

            {/* Floor Section */}
            <div className="text-center w-full sm:w-auto flex flex-col items-center justify-center gap-1">
              <p className="text-gray-400 text-xs sm:text-base">Floor</p>
              <h3 className="text-white text-md lg:text-2xl font-bold">
                {property?.floor}
              </h3>
            </div>

            {/* Vertical Divider */}
            <div className="border-l border-gray-600 h-[30px] sm:h-[50px]"></div>

            {/* BHK Section */}
            <div className="text-center w-full sm:w-auto flex flex-col items-center justify-center gap-1">
              <p className="text-gray-400 text-xs sm:text-base">Bhk</p>
              <h3 className="text-white text-md lg:text-2xl font-bold">
                {property?.bhk} Bhk
              </h3>
            </div>
          </div>
        </div>
        <div className="lg:w-[30%] bg-white rounded-lg p-3 mb-2">
          <div className="flex justify-between items-center mb-4 lg:mb-8">
            <p className="text-black text-lg font-semibold">Request a visit</p>
            <div className="flex gap-3 justify-center items-center ">
              <Popup
                arrow={false}
                trigger={
                  <button className="border border-gray-300 p-1 sm:border-none">
                    <CiShare2
                      className="card_icon"
                      style={{ color: "#40B5A8", fontSize: "25px" }}
                    />
                  </button>
                }
                position={"bottom right"}
              >
                {(close) => (
                  <div className="bg-slate-50 text-black rounded-full flex flex-col shadow-xl py-2 px-2 scale-90">
                    <div className="flex items-center gap-12 border border-black rounded-3xl px-2">
                      <div className="px-2 py-2 text-sm truncate w-32">
                        {`www.toletglobe.in/property/${property.slug}`}
                      </div>
                      <div>
                        <button
                          className="px-2 py-2 bg-[#40B5A8] text-white rounded-full"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `www.toletglobe.in/property/${property.slug}`
                            );
                            close();
                          }}
                        >
                          <FaRegCopy />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Popup>

              {/* {!showCompareCard && (
                <Popup
                  trigger={
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowRectangle((prev) => !prev); // Toggle visibility
                      }}
                      key={property._id}
                      className="border border-gray-300 p-1 sm:border-none"
                    >
                      {isInCompareList(property) ? (
                        <IoRemove
                          className="card_icon"
                          style={{
                            color: "#ff0000",
                            border: "none",
                            fontSize: "25px",
                          }}
                        />
                      ) : (
                        <IoAdd
                          className="card_icon"
                          style={{
                            color: "#000000",
                            border: "none",
                            fontSize: "25px",
                          }}
                        />
                      )}
                    </a>
                  }
                  position="top center"
                  on="hover"
                >
                  <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm">
                    Shortlist for Visit
                  </div>
                </Popup>
              )} */}

              <Popup
                trigger={
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (favouriteList.includes(property._id)) {
                        removeFromFavourites(property._id);
                      } else {
                        addToFavourites(property._id);
                      }
                    }}
                    className="border border-gray-300 p-1 sm:border-none"
                  >
                    {favouriteList.includes(property._id) ? (
                      <FaHeart className="card_icon text-2xl text-red-500" />
                    ) : (
                      <CiHeart className="card_icon text-2xl text-red-500" />
                    )}
                  </a>
                }
                position="top center"
                on="hover"
                arrow={true}
              >
                <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm">
                  Favourite
                </div>
              </Popup>
            </div>
          </div>

          <div className="flex items-center mb-3 lg:mb-10">
            <img
              src={profile}
              alt="owner"
              className="h-10 w-10 lg:h-16 lg:w-16 rounded-full"
            />
            <div className="ml-3">
              <p className="text-gray-800 font-medium">
                {property?.firstName} {property?.lastName}
              </p>
              <p className="text-gray-500 font-normal lg:text-xl">
               {isOwnerOrAdmin ? property.ownersContactNumber : `+${maskPhoneNumber(property?.ownersContactNumber)}` }
              </p>
            </div>
          </div>

        {isOwnerOrAdmin ? (
          <button
            className="w-full py-3 px-4 rounded-lg flex items-center justify-center md:gap-[2rem] lg:gap-[2rem] text-black font-semibold lg:text-xl"
            style={{ backgroundColor: "#3B9D94" }}
            onClick={() => changeAvailibilityStatus(property._id)}
          >
            <img
              src={fav}
              alt="favorite"
              className="hidden md:block lg:block h-6 w-5"
            />
            {property.availabilityStatus === "Available" 
              ? "Mark as Rented Out" 
              : "Mark as Available"}
          </button>
        ) : (
          <button
            className="w-full py-3 px-4 rounded-lg flex items-center justify-center md:gap-[2rem] lg:gap-[2rem] text-black font-semibold lg:text-xl"
            style={{ backgroundColor: "#3B9D94" }}
            onClick={() => addToCompare(property)}
          >
    <img
      src={fav}
      alt="favorite"
      className="hidden md:block lg:block h-6 w-5"
    />
    {property.availabilityStatus === "Available" 
      ? "Proceed To Visit" 
      : "Property Not Available"}
  </button>
)}
        </div>
      </div>

      {/* Rectangle Box for Shortlisted Property - Only shown when compare card is not visible */}
      {showRectangle && !showCompareCard && (
        <button
          className="bg-teal-500 text-white p-4 mb-2 w-fit cursor-pointer px-2 gap-20 ml-auto shadow-lg flex items-center justify-between"
          onClick={() => {
            addToCompare(property);
          }}
        >
          <h3 className="text-xl text-black">Compare</h3>
          <div className="bg-teal-600 h-8 w-8 flex items-center justify-center">
            <span className="text-lg font-bold text-black">1</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default PropertyBrief;
