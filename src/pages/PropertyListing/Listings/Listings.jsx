import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStateValue } from "../../../StateProvider";
import { ClipLoader } from "react-spinners";

import { FaSearch } from "react-icons/fa";

import {
  Map,
  Marker, // Use regular Marker instead of AdvancedMarker
  InfoWindow,
} from "@vis.gl/react-google-maps";

import drop from "../../../assets/propertyListing/drop.png";
import areas from "./areas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { google } = window;

import SelectLocation from "./components/SelectLocation";
import Filters from "./components/Filters";
import Cards from "./components/Cards";

import LoginPopup from "./components/LoginPopup/LoginPopup"; // Import the LoginPopup component

import "./listings.css";
import PoiMarkers from "./PoiMarkers";

import { API } from "../../../config/axios";

const Listing = () => {
  // Add this near the top of your component, with other constants
  const cityCoordinates = {
    Lucknow: { lat: 26.8467, lng: 80.9462 },
    Ayodhya: { lat: 26.7922, lng: 82.1998 },
    Vellore: { lat: 12.9165, lng: 79.1325 },
    Kota: { lat: 25.2138, lng: 75.8648 },
  };

  const localityCoordinates = {
    Lucknow: {
      Kamta: { lat: 26.8868, lng: 81.0586 },
      Nishatganj: { lat: 26.87, lng: 80.95 },
      Hazratganj: { lat: 26.85, lng: 80.95 },
      "Gomti Nagar": { lat: 26.85, lng: 81.0 },
      "Sushant Golf City": { lat: 26.78, lng: 81.02 },
      Khargapur: { lat: 26.83, lng: 81.03 },
      Chinhat: { lat: 26.88, lng: 81.05 },
      "Indira Nagar": { lat: 26.87, lng: 81.0 },
      Aliganj: { lat: 26.88, lng: 80.94 },
      "Vinay Khand": { lat: 26.85, lng: 81.0 },
      "Patrakar Puram": { lat: 26.85, lng: 81.0 },
      "Awadh Vihar Colony": { lat: 26.78, lng: 81.02 },
      "Sunder Nagar": { lat: 26.87, lng: 80.95 },
      "Amity University": { lat: 26.78, lng: 81.02 },
      "Ismail Ganj": { lat: 26.85, lng: 80.95 },
      Rajajipuram: { lat: 26.85, lng: 80.9 },
    },
    Ayodhya: {
      Bakhtiarpur: { lat: 26.7922, lng: 82.1998 },
      Bhadohi: { lat: 26.785, lng: 82.21 },
    },
    Vellore: {
      "Vellore Cantonment": { lat: 12.9461, lng: 79.1789 },
      "Gandhi Nagar": { lat: 12.9547, lng: 79.1407 },
      "Vellore East": { lat: 12.9349, lng: 79.1469 },
      "Vellore West": { lat: 12.9349, lng: 79.1469 },
    },
    Kota: {
      "Kota Cantonment": { lat: 25.18, lng: 75.85 },
      "Kota East": { lat: 25.18, lng: 75.87 },
      "Kota West": { lat: 25.18, lng: 75.83 },
      "Kota Central": { lat: 25.18, lng: 75.85 },
    },
  };

  const { city } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.status);

  // State for managing the login popup
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showCount, setShowCount] = useState(3);

  const [Hamburger, SetHamburger] = useState(false);
  const [isOpen, SetIsOpen] = useState(false);
  const [totalPages, setTotalPages] = useState();

  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const [Location, setLocation] = useState(false);
  const location = useLocation();
  const [propertiesPerPage] = useState(9);
  const [showSelectCity, setShowSelectCity] = useState(false);
  // let selectedCity = false;
  const [favouriteList, setFavouriteList] = useState([]);
  const [{ compareProperty }, dispatch] = useStateValue();

  const [filterCount, setFilterCount] = useState(0);

  const [noPropertiesFound, setNoPropertiesFound] = useState(false);
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedArea, setSelectedArea] = useState([]);
  const [moreArea, setMoreArea] = useState(false);
  // const [selectedCity, setSelectedCity] = useState("");
  const [selectedSort, setSelectedSort] = useState("Sort");
  const [availableProperties, setAvailableProperties] = useState([]);
  const [mapCenter, setMapCenter] = useState(cityCoordinates["Lucknow"]);
  const [hovered, setHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Extract query string from the URL
  const queryString = location.search;

  // Decode the query string
  const params = new URLSearchParams(queryString);
  const residential = params.get("residential"); // Example: Get the value of 'param1'
  const commercial = params.get("commercial"); // Example: Get the value of 'param1'

  const [filters, setFilters] = useState({
    bhk: [],
    residential: [],
    commercial: [],
    preferenceHousing: "",
    genderPreference: "",
    houseType: [],
  });

  // To be Updated
  const citylocalities = {
    // Respected Localities of Particular City
    Lucknow: [
      "Gomti Nagar",
      "Aliganj",
      "Indira Nagar",
      "Chinhat",
      "Hazratganj",
      "Aashiana",
      "Aminabad",
      "Surender Nagar",
      "Chowk",
      "Jankipuram",
      "Rajajipuram ",
      "Mahanagar ",
    ],
    Ayodhya: ["ayodhya1", "ayodhya2"],
    Vellore: ["vellore1", "vellore2"],
    Kota: ["kota1", "kota2"],
  };

  // Add this new state for search
  const [searchQuery, setSearchQuery] = useState("");

  // Add new state for search results
  const [searchResults, setSearchResults] = useState({
    localities: [],
    areas: [],
  });
  const [showSearchPanel, setShowSearchPanel] = useState(false);

  // Add this state for tracking window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const authState = useSelector((state) => state.auth);
  const currentUserId = authState?.userData?.id;
  const currentUserRole = authState?.userData?.role;
  // Add a new ref for the search panel
  const searchPanelRef = useRef(null);

  const sampleLocs = [
    { key: "Kamta", location: { lat: 26.8868, lng: 81.0586 } },
    { key: "Nishatganj", location: { lat: 26.87, lng: 80.95 } },
  ];

  const [mapInstance, setMapInstance] = useState(null);
  const [highlightedArea, setHighlightedArea] = useState(null);
  const polygonRef = useRef(null);

  useEffect(() => {
    if (!mapInstance || !highlightedArea) {
      if (polygonRef.current) {
        polygonRef.current.setMap(null);
        polygonRef.current = null;
      }
      return;
    }

    polygonRef.current = new window.google.maps.Polygon({
      paths: highlightedArea,
      strokeColor: "#6CC1B6",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: "transparent",
      map: mapInstance,
    });

    return () => {
      if (polygonRef.current) {
        polygonRef.current.setMap(null);
      }
    };
  }, [highlightedArea, mapInstance]);

  useEffect(() => {
    if (!city || !selectedLocality) {
      setHighlightedArea(null);
      return;
    }

    const cityBorders = Listing[city];
    if (cityBorders?.[selectedLocality]) {
      setHighlightedArea(cityBorders[selectedLocality]);
    } else {
      setHighlightedArea(null);
      console.warn(`No borders for ${selectedLocality} in ${city}`);
    }
  }, [selectedLocality, city]);

  // Add useEffect to handle clicks outside the panel
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchPanelRef.current &&
        !searchPanelRef.current.contains(event.target)
      ) {
        setShowSearchPanel(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
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

  // Add useEffect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function refresh() {
    window.location.reload(false);
  }

  function handleOpen() {
    SetIsOpen(!isOpen);
  }
  function handleHamburger() {
    SetHamburger(!Hamburger);
  }
  function handleLocation() {
    setLocation(!Location);
    setShowSelectCity(!showSelectCity);
  }
  const { slug } = useParams();
  function handleMode() {
    setMode(!mode);
  }
  function handleShowCity() {
    if (city) {
      setShowCity(!showCity);
    }
  }
  function handleShowArea() {
    if (selectedLocality) {
      setShowArea(!showArea);
    }
  }
  function addLocality(area) {
    setSelectedArea(area);
    if (selectedArea.includes(area)) {
      selectedArea.splice(selectedArea.indexOf(area), 1);
      setSelectedArea([...selectedArea]);
    } else {
      setSelectedArea([...selectedArea, area]);
    }
  }

  const resetFilters = () => {
    setFilters({
      bhk: [],
      residential: [],
      commercial: [],
      preferenceHousing: "",
      genderPreference: "",
      houseType: [],
    });
  };

  const sortPropertiesByAvailability = (properties) => {
    return properties.slice().sort((a, b) => {
      const statusA = a.availabilityStatus.trim().toLowerCase();
      const statusB = b.availabilityStatus.trim().toLowerCase();

      if (statusA === "available" && statusB !== "available") {
        return -1;
      } else if (statusA !== "available" && statusB === "available") {
        return 1;
      }
      return 0;
    });
  };

  // Helper function to get fallback coordinates
  const getFallbackCoordinates = (property, selectedCity) => {
    // First try locality coordinates
    if (
      property.locality &&
      localityCoordinates[selectedCity] &&
      localityCoordinates[selectedCity][property.locality]
    ) {
      return localityCoordinates[selectedCity][property.locality];
    }

    // Then try area coordinates
    if (
      property.area &&
      localityCoordinates[selectedCity] &&
      localityCoordinates[selectedCity][property.area]
    ) {
      return localityCoordinates[selectedCity][property.area];
    }

    // Try to extract area from address
    if (property.address) {
      const addressLower = property.address.toLowerCase();
      const availableAreas = localityCoordinates[selectedCity] || {};

      for (const [area, coords] of Object.entries(availableAreas)) {
        if (addressLower.includes(area.toLowerCase())) {
          return coords;
        }
      }
    }

    return null;
  };

  // Helper function to check if coordinates are equal (with tolerance)
  const areCoordsEqual = (coord1, coord2, tolerance = 0.001) => {
    return (
      Math.abs(coord1.lat - coord2.lat) < tolerance &&
      Math.abs(coord1.lng - coord2.lng) < tolerance
    );
  };

  // Helper function to add random offset to properties with duplicate coordinates
  const addRandomOffsetToDuplicates = (markers) => {
    const coordinateGroups = {};

    // Group markers by coordinates
    markers.forEach((marker) => {
      const key = `${marker.location.lat.toFixed(
        4
      )},${marker.location.lng.toFixed(4)}`;
      if (!coordinateGroups[key]) {
        coordinateGroups[key] = [];
      }
      coordinateGroups[key].push(marker);
    });

    // Add small random offsets to duplicates
    Object.entries(coordinateGroups).forEach(([key, group]) => {
      if (group.length > 1) {
        console.log(
          `Adding offsets to ${group.length} properties with duplicate coordinates:`,
          key
        );

        group.forEach((marker, index) => {
          if (index > 0) {
            // Keep the first one as-is
            const offsetLat = (Math.random() - 0.5) * 0.002; // ~200m offset
            const offsetLng = (Math.random() - 0.5) * 0.002;

            marker.location.lat += offsetLat;
            marker.location.lng += offsetLng;
            marker.hasOffset = true;
          }
        });
      }
    });

    return markers;
  };

  const fetchAndFilterProperties = async (
    selectedCity,
    selectedArea,
    selectedLocality
  ) => {
    setLoading(true);
    let propertyData = [];

    try {
      let cleanedFilters = {
        ...filters,
        bhk: filters.bhk.map((bhk) => bhk.replace(/[^0-9]/g, "")),
      };

      if (residential) {
        cleanedFilters = {
          ...filters,
          residential: [residential],
        };
      }

      if (commercial) {
        cleanedFilters = {
          ...filters,
          commercial: [commercial],
        };
      }

      let queryString = Object.keys(cleanedFilters)
        .filter(
          (key) => cleanedFilters[key].length > 0 || cleanedFilters[key] !== ""
        )
        .map((key) => {
          const value = Array.isArray(cleanedFilters[key])
            ? cleanedFilters[key].map(encodeURIComponent).join(",")
            : encodeURIComponent(cleanedFilters[key]);
          return `${encodeURIComponent(key)}=${value}`;
        })
        .join("&");

      if (selectedCity) {
        queryString = queryString + `&city=${encodeURIComponent(selectedCity)}`;
        setMapCenter(cityCoordinates[selectedCity]);
        if (selectedArea.length > 0) {
          queryString =
            queryString +
            `&area=${selectedArea.map(encodeURIComponent).join(",")}`;
        } else if (selectedLocality) {
          queryString =
            queryString + `&locality=${encodeURIComponent(selectedLocality)}`;
          if (
            localityCoordinates[selectedCity] &&
            localityCoordinates[selectedCity][selectedLocality]
          ) {
            setMapCenter(localityCoordinates[selectedCity][selectedLocality]);
          }
        }
      }

      queryString = queryString + `&limit=1000`;

      const url = `property/filter?${queryString}`;
      console.log("Fetching from URL:", url);

      try {
        const response = await API.get(url);
        propertyData = response.data.data || [];

        console.log("Raw property data received:", propertyData);

        // Enhanced debugging for coordinates
        const debugPropertyCoordinates = (properties) => {
          console.log("=== DEBUGGING PROPERTY COORDINATES ===");
          console.log("Total properties received:", properties.length);

          const coordinateStats = {
            valid: 0,
            invalid: 0,
            duplicate: {},
            cityCenter: 0,
          };

          properties.forEach((property, index) => {
            const lat = parseFloat(property.latitude);
            const lng = parseFloat(property.longitude);
            const coordKey = `${lat},${lng}`;

            // Check if it's city center coordinates
            const isCityCenter = Object.values(cityCoordinates).some(
              (cityCoord) =>
                Math.abs(cityCoord.lat - lat) < 0.001 &&
                Math.abs(cityCoord.lng - lng) < 0.001
            );

            if (isCityCenter) {
              coordinateStats.cityCenter++;
            }

            // Track duplicate coordinates
            if (coordinateStats.duplicate[coordKey]) {
              coordinateStats.duplicate[coordKey]++;
            } else {
              coordinateStats.duplicate[coordKey] = 1;
            }

            const hasValidCoords =
              !isNaN(lat) &&
              !isNaN(lng) &&
              lat !== 0 &&
              lng !== 0 &&
              lat >= -90 &&
              lat <= 90 &&
              lng >= -180 &&
              lng <= 180;

            if (hasValidCoords) {
              coordinateStats.valid++;
            } else {
              coordinateStats.invalid++;
            }

            console.log(`Property ${index + 1}:`, {
              slug: property.slug,
              address: property.address,
              area: property.area,
              locality: property.locality,
              latitude: property.latitude,
              longitude: property.longitude,
              parsedLat: lat,
              parsedLng: lng,
              latType: typeof property.latitude,
              lngType: typeof property.longitude,
              hasValidCoords,
              isCityCenter,
              coordKey,
            });
          });

          console.log("Coordinate Statistics:", coordinateStats);

          // Show duplicate coordinates
          const duplicates = Object.entries(coordinateStats.duplicate).filter(
            ([key, count]) => count > 1
          );
          if (duplicates.length > 0) {
            console.warn("DUPLICATE COORDINATES FOUND:", duplicates);
          }

          if (coordinateStats.cityCenter > 0) {
            console.warn(
              `WARNING: ${coordinateStats.cityCenter} properties are using city center coordinates!`
            );
          }
        };

        debugPropertyCoordinates(propertyData);

        // Enhanced marker creation with better fallback logic
        let allPropertyMarkers = propertyData
          .map((property, index) => {
            const lat = parseFloat(property.latitude);
            const lng = parseFloat(property.longitude);

            // Check if coordinates are valid and not city center
            const hasValidCoords =
              !isNaN(lat) &&
              !isNaN(lng) &&
              lat !== 0 &&
              lng !== 0 &&
              lat >= -90 &&
              lat <= 90 &&
              lng >= -180 &&
              lng <= 180;

            // Check if it's using city center coordinates (which might indicate missing data)
            const isCityCenter = Object.values(cityCoordinates).some(
              (cityCoord) =>
                Math.abs(cityCoord.lat - lat) < 0.001 &&
                Math.abs(cityCoord.lng - lng) < 0.001
            );

            if (!hasValidCoords) {
              console.warn(`Property ${index + 1} has invalid coordinates:`, {
                slug: property.slug,
                address: property.address,
                originalLat: property.latitude,
                originalLng: property.longitude,
                parsedLat: lat,
                parsedLng: lng,
              });

              // Try to use area/locality coordinates as fallback
              const fallbackCoords = getFallbackCoordinates(
                property,
                selectedCity
              );
              if (fallbackCoords) {
                console.log(
                  `Using fallback coordinates for ${property.slug}:`,
                  fallbackCoords
                );
                return {
                  key: property.slug,
                  location: fallbackCoords,
                  property: property,
                  isFallback: true,
                };
              }
              return null; // Skip this property if no valid coordinates
            }

            // If using city center coordinates, try to find better coordinates
            if (isCityCenter) {
              console.warn(
                `Property ${property.slug} is using city center coordinates`
              );
              const fallbackCoords = getFallbackCoordinates(
                property,
                selectedCity
              );
              if (
                fallbackCoords &&
                !areCoordsEqual(fallbackCoords, { lat, lng })
              ) {
                console.log(
                  `Using better fallback coordinates for ${property.slug}:`,
                  fallbackCoords
                );
                return {
                  key: property.slug,
                  location: fallbackCoords,
                  property: property,
                  isFallback: true,
                };
              }
            }

            return {
              key: property.slug,
              location: {
                lat: lat,
                lng: lng,
              },
              property: property,
              isFallback: false,
            };
          })
          .filter((marker) => marker !== null); // Remove null entries

        // Add some random offset to properties with same coordinates to prevent overlapping
        allPropertyMarkers = addRandomOffsetToDuplicates(allPropertyMarkers);

        console.log(
          "Valid property markers created:",
          allPropertyMarkers.length
        );
        console.log("Property markers:", allPropertyMarkers);

        setAvailableProperties(allPropertyMarkers);

        // Handle fallback logic if no properties are found
        if (
          propertyData.length === 0 &&
          selectedArea.length > 0 &&
          selectedLocality
        ) {
          queryString = queryString.replace(
            /&area=[^&]*/,
            `&locality=${encodeURIComponent(selectedLocality)}`
          );
          const fallbackUrl = `property/filter?${queryString}`;
          const fallbackResponse = await API.get(fallbackUrl);
          propertyData = fallbackResponse.data.data || [];

          // Process fallback data the same way
          allPropertyMarkers = propertyData
            .map((property) => {
              const lat = parseFloat(property.latitude);
              const lng = parseFloat(property.longitude);

              if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
                return {
                  key: property.slug,
                  location: {
                    lat: lat,
                    lng: lng,
                  },
                  property: property,
                  isFallback: false,
                };
              }
              return null;
            })
            .filter((marker) => marker !== null);

          setAvailableProperties(allPropertyMarkers);
        }

        if (propertyData && Array.isArray(propertyData)) {
          propertyData = sortPropertiesByAvailability(propertyData);
        }

        // Apply sorting if sort parameter exists in URL
        const params = new URLSearchParams(location.search);
        const sortParam = params.get("sort");
        if (sortParam && propertyData.length > 0) {
          propertyData = sortProperties(propertyData, sortParam);
        }

        setProperties(propertyData);
        setNoPropertiesFound(propertyData.length === 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProperties([]);
        setNoPropertiesFound(true);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
      setProperties([]);
      setNoPropertiesFound(true);
    }
    return propertyData;
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get("city");
    const areaParam = params.get("area") ? params.get("area").split(",") : [];
    const localityParam = params.get("locality");
    const sortParam = params.get("sort");

    fetchAndFilterProperties(
      cityParam || city,
      areaParam.length > 0 ? areaParam : selectedArea,
      localityParam || selectedLocality
    );
    //setting area params
    if (areaParam.length > 0) {
      setSelectedArea(areaParam);
    }

    //setting locality params
    if (localityParam) {
      setSelectedLocality(localityParam);
    }
    // Set the selected sort based on URL parameter
    if (sortParam) {
      const sortLabels = {
        "price-low-high": "Price: Low to High",
        "price-high-low": "Price: High to Low",
        "most-trending": "Most Trending",
        "date-uploaded": "Date Uploaded",
      };
      setSelectedSort(sortLabels[sortParam] || "Sort");
    } else {
      setSelectedSort("Sort");
    }
  }, [city, location.search]); // Add city to the dependency array

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get("city");
    const areaParam = params.get("area") ? params.get("area").split(",") : [];
    const localityParam = params.get("locality");

    fetchAndFilterProperties(
      cityParam || city,
      areaParam.length > 0 ? areaParam : [],
      localityParam || ""
    );
  }, [filters, city, selectedArea, selectedLocality]);

  // Sorting logic
  const sortProperties = (properties, sortType) => {
    let sortedProperties = [...properties];

    if (sortType === "price-low-high") {
      sortedProperties.sort((a, b) => {
        const rentA = parseFloat(a.rent) || 0;
        const rentB = parseFloat(b.rent) || 0;
        return rentA - rentB;
      });
    } else if (sortType === "price-high-low") {
      sortedProperties.sort((a, b) => {
        const rentA = parseFloat(a.rent) || 0;
        const rentB = parseFloat(b.rent) || 0;
        return rentB - rentA;
      });
    } else if (sortType === "most-trending") {
      sortedProperties.sort((a, b) => {
        const reviewsA = a.reviews ? a.reviews.length : 0;
        const reviewsB = b.reviews ? b.reviews.length : 0;
        return reviewsB - reviewsA;
      });
    } else if (sortType === "date-uploaded") {
      sortedProperties.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
    }

    return sortedProperties;
  };

  const handleSortClick = (sortType, label) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("sort", sortType);
    navigate(`?${queryParams.toString()}`); // Update URL with new sort query
    setSelectedSort(label);
    setMode(false); // Close mobile dropdown

    // Apply sorting immediately to current properties
    if (properties.length > 0) {
      const sortedProperties = sortProperties(properties, sortType);
      setProperties(sortedProperties);
    }
  };

  const handleLocalitySelect = (locality) => {
    setSelectedLocality(locality); // Update selected locality
  };

  // Add this function to handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length === 0) {
      setShowSearchPanel(false);
      return;
    }

    // Filter localities based on selected city
    const matchingLocalities = city
      ? citylocalities[city].filter((locality) =>
          locality.toLowerCase().startsWith(query)
        )
      : [];

    // Filter areas
    const matchingAreas = areas.filter((area) =>
      area.toLowerCase().startsWith(query)
    );

    setSearchResults({
      localities: matchingLocalities,
      areas: matchingAreas,
    });
    setShowSearchPanel(true);
  };

  const handleSearchSelection = (value, type) => {
    const queryParams = new URLSearchParams(location.search);

    if (type === "locality") {
      // Update locality selection
      handleLocalitySelect(value);
      queryParams.set("locality", value);

      // Trigger search with updated locality
      fetchAndFilterProperties(city, selectedArea, value);
    } else {
      // Compute updated areas before using it
      const newAreas = selectedArea.includes(value)
        ? selectedArea.filter((area) => area !== value)
        : [...selectedArea, value];

      // Update state and query params for areas
      setSelectedArea(newAreas);
      if (newAreas.length > 0) {
        queryParams.set("area", newAreas.join(","));
      } else {
        queryParams.delete("area");
      }

      // Trigger search with updated areas
      fetchAndFilterProperties(city, newAreas, selectedLocality);
    }

    setSearchQuery("");
    setShowSearchPanel(false);

    // Update the URL with the new search parameter
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const handleAddPropertybtn = () => {
    if (authState.status === true && localStorage.getItem("token")) {
      navigate("/landlord-dashboard", { state: { content: "AddProperty" } });
    } else {
      // Show the login popup instead of navigating to the login page
      setShowLoginPopup(true);
    }
  };

  const handleVisit = () => {
    if (!isLoggedIn) {
      // Show the login popup instead of navigating to the login page
      setShowLoginPopup(true);
    } else {
      // Proceed with the visit logic (e.g., show property details)
      compare();
    }
  };

  const handleClearCompare = () => {
    console.log("Cancel clicked. Clearing compare list...");
    dispatch({ type: "CLEAR_COMPARE" });
  };

  const compare = () => {
    navigate("/compare-property");
  };

  const updateFilterCount = (count) => {
    setFilterCount(count);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }

  return (
    <>
      {showLoginPopup && (
        <LoginPopup onClose={() => setShowLoginPopup(false)} />
      )}
      <div
        onClick={() => {
          if (Location === true) setLocation(false);
          if (isOpen === true) SetIsOpen(false);
        }}
        className={`bg-black opacity-80 h-[2600px] absolute z-20 ${
          isOpen || Hamburger || Location ? "block" : "hidden"
        }`}
      ></div>
      <section
        onClick={() => {
          if (mode === true) setMode(false);
          if (Location === true) setLocation(false);
          if (showCity === true) setShowCity(false);
          if (isOpen === true) SetIsOpen(false);
        }}
        className="property h-[100vh] pb-3 lg:px-12 w-full overflow-y-auto"
        id="property"
      >
        <div className="flex flex-col gap-6 pt-6 sticky top-0 z-20 bg-black md:pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-10 gap-4 text-sm md:text-lg">
            <div className="bg-white sm:col-span-8 md:col-span-6 rounded-md lg:w-full w-[96%] mx-[2%] ">
              <div className="flex flex-wrap items-center text-black  text-sm md:text-lg">
                {/* Select city dropdown */}
                <div className="flex flex-wrap items-center text-black text-sm md:text-lg">
                  {/* Select city dropdown */}
                  <div className="relative group flex items-center gap-4 px-3 py-2 my-1 shrink-0 border-r border-black cursor-pointer">
                    {/* Button Area */}
                    <span className="text-sm md:text-lg whitespace-nowrap">
                      {!city ? "Select City" : city}
                    </span>

                    <img src={drop} alt="Dropdown" className="cursor-pointer" />

                    {/* Dropdown */}
                    <div className="absolute top-9 left-0 hidden group-hover:flex hover:flex bg-white shadow-md mt-1 rounded w-40 z-50">
                      <div className="w-full text-black flex flex-col justify-center rounded-lg shadow-md">
                        {["Lucknow", "Ayodhya", "Vellore", "Kota"].map(
                          (cityName) => (
                            <h2
                              key={cityName}
                              className="text-sm md:text-lg font-medium cursor-pointer px-4 py-2 hover:bg-gray-100"
                              onClick={() => {
                                resetFilters();
                                navigate(`/property-listing/${cityName}`);
                              }}
                            >
                              {cityName}
                            </h2>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Select area searchbar */}
                <div className="flex-1 min-w-0 flex items-center gap-2 px-4 lg:px-8 my-1 text-sm md:text-lg">
                  <FaSearch className="text-black shrink-0" />
                  <div className="flex flex-wrap items-center gap-1 py-2 w-full overflow-x-hidden">
                    {selectedLocality && (
                      <div className="flex items-center gap-1 bg-[#EED98B] px-2 py-1 rounded-full shrink-0">
                        <span className="text-sm">{selectedLocality}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => {
                            setSelectedLocality("");

                            const queryParams = new URLSearchParams(
                              location.search
                            );
                            queryParams.delete("locality");
                            navigate(
                              `${location.pathname}?${queryParams.toString()}`
                            );
                          }}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {selectedArea.map((area) => (
                      <div
                        key={area}
                        className="flex items-center bg-[#EED98B] px-2 py-1 rounded-full shrink-0"
                      >
                        <span className="text-sm">{area}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => {
                            const newAreas = selectedArea.filter(
                              (a) => a !== area
                            );
                            setSelectedArea(newAreas);

                            const queryParams = new URLSearchParams(
                              location.search
                            );
                            if (newAreas.length > 0) {
                              queryParams.set("area", newAreas.join(","));
                            } else {
                              queryParams.delete("area");
                            }
                            navigate(
                              `${location.pathname}?${queryParams.toString()}`
                            );
                          }}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    ))}
                    <input
                      type="text"
                      placeholder={
                        windowWidth < 768
                          ? "Search by Locality or Area..."
                          : "Search by Locality or Area..."
                      }
                      value={searchQuery}
                      onClick={(e) => {
                        if (!city) {
                          toast.error("Please select a city first", {
                            position: "top-center",
                          });
                          return;
                        }
                      }}
                      onChange={(e) => {
                        handleSearch(e);
                      }}
                      className="outline-none bg-transparent text-black placeholder-gray-500 min-w-[100px] flex-1 text-xs lg:text-xl"
                    />
                  </div>

                  {showSearchPanel &&
                    (searchResults.localities.length > 0 ||
                      searchResults.areas.length > 0) && (
                      <div
                        ref={searchPanelRef}
                        className="absolute top-20 left-36 mt-2 lg:w-[32%] w-[52%] xs:w-[59%] bg-white rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto"
                      >
                        {[
                          ...searchResults.localities,
                          ...searchResults.areas,
                        ].map((item, index) => {
                          const isLocality =
                            searchResults.localities.includes(item);
                          return (
                            <div
                              key={`${
                                isLocality ? "locality" : "area"
                              }-${index}`}
                              className="px-2 py-2 hover:bg-gray-100 cursor-pointer text-black flex items-center justify-between"
                              onClick={() =>
                                handleSearchSelection(
                                  item,
                                  isLocality ? "locality" : "area"
                                )
                              }
                            >
                              <span className="text-black">{item}</span>
                              <span className="text-gray-500 min-w-[60px] text-end">
                                {isLocality ? "Locality" : "Area"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                </div>

                {/* Filter and sort in desktop */}
                <div className="hidden lg:flex md:flex">
                  <div className="relative group flex items-center gap-2 border-l px-3 border-black shrink-0 cursor-pointer">
                    {/* Filters button */}
                    <div className="flex items-center gap-2 hover:cursor-pointer">
                      <span className="text-sm md:text-lg whitespace-nowrap">
                        Filters
                      </span>
                      <img src={drop} alt="Dropdown" />
                    </div>

                    {/* Dropdown: appears right below the button */}
                    <div className="absolute top-full -left-1 hidden group-hover:block hover:block mt-0.5 z-50">
                      <Filters
                        SetIsOpen={SetIsOpen}
                        setProperties={setProperties}
                        city={city}
                        fetchAndFilterProperties={fetchAndFilterProperties}
                        updateFilterCount={updateFilterCount}
                        filterCount={filterCount}
                        filters={filters}
                        setFilters={setFilters}
                        resetFilters={resetFilters}
                        selectedArea={selectedArea}
                        selectedLocality={selectedLocality}
                      />
                    </div>
                  </div>

                  <div className="relative group flex items-center gap-2 border-l pl-3 lg:px-12 border-black shrink-0 cursor-pointer">
                    <span className="text-sm md:text-lg whitespace-nowrap hover:cursor-pointer">
                      {selectedSort}
                    </span>
                    <img
                      src={drop}
                      alt="Dropdown"
                      className={`${
                        mode ? "rotate-180" : "rotate-0"
                      } cursor-pointer`}
                    />
                    <div className="absolute top-full hidden group-hover:block hover:block z-50 text-sm lg:text-lg -left-1">
                      <div className="block bg-white shadow-lg rounded-lg text-center w-40 py-3 top-[30px] left-[-150px] sm:top-[36px] sm:left-[-113px]">
                        <p
                          className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSortClick(
                              "price-low-high",
                              "Price Low to High"
                            );
                          }}
                        >
                          Price Low to High
                        </p>
                        <p
                          className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSortClick(
                              "price-high-low",
                              "Price High to Low"
                            );
                          }}
                        >
                          Price High to Low
                        </p>
                        {/* <p
                          className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            handleSortClick("most-trending", "Most Trending");
                          }}
                        >
                          Most Trending
                        </p> */}
                        <p
                          className="py-2 font-medium cursor-pointer hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSortClick("date-uploaded", "Date Uploaded");
                          }}
                        >
                          Date Uploaded
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

       
<div className="lg:hidden md:hidden flex flex-wrap justify-between w-[96%] mx-[2%] ">
  <div
    className="flex items-center gap-4 border-l pl-4 justify-center border-black shrink-0 cursor-pointer text-black bg-white rounded-lg py-2 "
    onClick={handleMode}
  >
    <span className="text-sm md:text-lg whitespace-nowrap">
      {selectedSort}
    </span>
    <img
      src={drop}
      alt="Dropdown"
      className={`${
        mode ? "rotate-180" : "rotate-0"
      } cursor-pointer`}
    />
    <div className="relative text-sm lg:text-lg">
      <div
        className={`${
          mode ? "block" : "hidden"
        } z-50 absolute bg-white shadow-lg rounded-lg text-center w-40 py-3 top-[30px] lg:left-[-150px] left-[-85px] sm:top-[36px] sm:left-[-110px]`}
      >
        <p
          className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            handleSortClick("price-low-high", "Price Low to High");
          }}
        >
          Price: Low to High
        </p>
        <p
          className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            handleSortClick("price-high-low", "Price High to Low");
          }}
        >
          Price High to Low
        </p>
        {/* <p
          className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
          onClick={() => {
            handleSortClick("most-trending", "Most Trending");
          }}
        >
          Most Trending
        </p> */}
        <p
          className="py-2 font-medium cursor-pointer hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            handleSortClick("date-uploaded", "Date Uploaded");
          }}
        >
          Date Uploaded
        </p>
      </div>
    </div>
  </div>

  <div
    className="flex items-center gap-2 border-l py-3  px-3 border-black shrink-0 cursor-pointer text-black bg-white rounded-lg"
    onClick={handleOpen}
  >
    <div className="flex items-center gap-2">
      <span className="text-sm md:text-lg whitespace-nowrap">
        Filters
      </span>
      <img src={drop} alt="Dropdown" className="cursor-pointer" />
    </div>
  </div>
  {isOpen && (
    <div
      onClick={() => SetIsOpen(false)}
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-0 right-0 w-full h-full  text-black shadow-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } sm:relative sm:translate-x-0 sm:shadow-none`}
      >
        <div className="p-4 overflow-y-auto max-h-screen ">
          {/* Add the "X" button here */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button
              className="text-2xl text-black hover:text-gray-600"
              onClick={() => SetIsOpen(false)}
            >
              &times;
            </button>
          </div>
          <Filters
            SetIsOpen={SetIsOpen}
            setProperties={setProperties}
            city={city}
            updateFilterCount={updateFilterCount}
            fetchAndFilterProperties={fetchAndFilterProperties}
            filterCount={filterCount}
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            selectedArea={selectedArea}
            selectedLocality={selectedLocality}
          />
        </div>
      </div>
    </div>
  )}
</div>

            <div className="sm:col-span-4 md:col-span-4 flex w-fit xs:w-[50%]  items-center justify-center lg:justify-between -mt-[76px] ml-[98px] xs:[96px] lg:ml-4 lg:mt-0">
              {compareProperty.length >= 1 && (
                <div className="compare relative w-fit ml-20 md:ml-0">
                  {/* Visit Button */}
                  <button
                    onClick={handleVisit}
                    className={`relative bg-white h-11 sm:h-14 w-20 md:w-32 text-black cursor-pointer rounded-lg flex gap-2 lg:gap-5 text-center items-center px-3 sm:px-7 lg:py-7 text-sm font-medium ${
                      compareProperty.length <= 0
                        ? "opacity-50 grayscale cursor-not-allowed"
                        : ""
                    }`}
                    disabled={compareProperty.length <= 0}
                  >
                    Visit
                    <div className="bg-[#EED98B] rounded-full flex items-center justify-center px-2">
                      {compareProperty.length}
                    </div>
                  </button>

                  {/* Cancel Button outside Visit button */}
                  {compareProperty.length > 0 && (
                    <button
                      onClick={handleClearCompare}
                      className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600 z-10"
                      type="button"
                    >
                      ×
                    </button>
                  )}
                </div>
              )}

              <div className="hidden">
                <a
                  onClick={handleAddPropertybtn}
                  className="bg-white w-30 h-12 sm:h-14 text-black flex items-center justify-center px-5 rounded-lg cursor-pointer"
                >
                  Add a property
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pin Location on Map */}
        <div className="w-full h-[400px] rounded-md border-[1.5px] border-[#C8C8C8]">
          <Map
            defaultZoom={11}
            minZoom={10}
            maxZoom={13}
            defaultCenter={mapCenter}
            mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
            onLoad={(map) => setMapInstance(map)}
          >
            <PoiMarkers pois={availableProperties} />
          </Map>
        </div>

        <div className="pt-3">
          {properties.length === 0 ? (
            <p className="text-center text-lg font-semibold mt-10">
              No properties found
            </p>
          ) : (
            <Cards
              properties={properties.map((property) => ({
                ...property,
                isOwnerOrAdmin:
                  property.userId === currentUserId ||
                  currentUserRole === "admin",
              }))}
              favouriteList={favouriteList}
              setFavouriteList={setFavouriteList}
            />
          )}
        </div>

        {!isOpen && loading && (
          <div className="flex justify-center my-4">
            <ClipLoader color="#6CC1B6" size={50} />
          </div>
        )}
      </section>
      <ToastContainer />
    </>
  );
};

export default Listing;