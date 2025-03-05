// // import { useState, useEffect } from "react";

// // const Toggle = ({ propertyId }) => {
// //   const [status, setStatus] = useState("Available");
// //   const [isAdmin, setIsAdmin] = useState(false);
// //   const [isOwner, setIsOwner] = useState(false);

// //   // Check localStorage for role and ownership on mount
// //   useEffect(() => {
// //     const role = localStorage.getItem("User");
// //     const userType = localStorage.getItem("userType");
// //     const userId = localStorage.getItem("userId");

// //     setIsAdmin(role === "admin");

// //     // Check if user is an owner and their userId matches the propertyId
// //     if (userType === "owner" && userId === propertyId) {
// //       setIsOwner(true);
// //     }
// //   }, [propertyId]);

// //   const toggleStatus = () => {
// //     if (!isAdmin && !isOwner) return; // Prevent change if not admin or owner

// //     setStatus((prevStatus) => (prevStatus === "Available" ? "Rented Out" : "Available"));
// //   };

// //   return (
// //     <div
// //       className="card-badge-left absolute top-4 left-4 text-white/75 lg:text-white text-xs lg:text-base uppercase px-1 lg:px-3 py-1 rounded-md cursor-pointer transition-all duration-2000"
// //       style={{
// //         backgroundColor: status === "Available" ? "#236b62" : "#c71221",
// //         textTransform: "capitalize",
// //         cursor: isAdmin || isOwner ? "pointer" : "not-allowed", // Allow only if admin or owner
// //       }}
// //       onClick={toggleStatus}
// //     >
// //       {status}
// //     </div>
// //   );
// // };

// // export default Toggle;

// // components/Toggle.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const Toggle = ({ propertyId, currentStatus, propertyUserId }) => {
  const [status, setStatus] = useState(currentStatus);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // useEffect(() => {
  //   const role = localStorage.getItem("User");
  //   const userType = localStorage.getItem("userType");
  //   const userId = localStorage.getItem("userId");

  //   setIsAdmin(role === "admin");
  //   setIsOwner(userId === propertyUserId && userType === "owner");
  // }, [propertyUserId]);
  useEffect(() => {
    const role = localStorage.getItem("User");
    const userType = localStorage.getItem("userType");
    const userId = localStorage.getItem("userId");
    // console.log("Logged in user:", { role, userType, userId });
    // console.log("Property owner ID:", propertyUserId);
  
    setIsAdmin(role === "admin");
    setIsOwner(userId === propertyUserId && userType === "owner");
  }, [propertyUserId]);

  const toggleStatus = async () => {
    if (!isAdmin && !isOwner) return;
    
    try {
      const newStatus = status === "Available" ? "Rented Out" : "Available";
      const token = localStorage.getItem("token");
      
      await axios.put(
        `http://localhost:8000/api/v1/property/${propertyId}/availability`,
        { availabilityStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setStatus(newStatus);
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Failed to update status");
    }
  };

  return (
    <div
      className="card-badge-left absolute top-4 left-4 text-white/75 lg:text-white text-xs lg:text-base uppercase px-1 lg:px-3 py-1 rounded-md cursor-pointer transition-all duration-2000"
      style={{
        backgroundColor: status === "Available" ? "#236b62" : "#c71221",
        textTransform: "capitalize",
        cursor: isAdmin || isOwner ? "pointer" : "not-allowed",
      }}
      onClick={toggleStatus}
    >
      {status}
    </div>
  );
};

export default Toggle;
// const Toggle = ({ propertyId, currentStatus, propertyUserId }) => {
//   const [status, setStatus] = useState(currentStatus);

//   const toggleStatus = async () => {
//     console.log(propertyId);
//     try {
//       const newStatus = status === "Available" ? "Rented Out" : "Available";
//       const token = localStorage.getItem("token");
      
//       const response = await axios.put(
//         //`https://to-let-backend.onrender.com/api/v1/property/${propertyId}/availability`,
//         `http://localhost:8000/api/v1/property/${propertyId}/availability`,
//         { availabilityStatus: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
      
//       setStatus(response.data.availabilityStatus);
//     } catch (error) {
//       console.error("Update failed:", error.response?.data?.message || error.message);
//       alert(error.response?.data?.message || "Update failed");
//       setStatus(currentStatus); // Revert to original status
//     }
//   };

//   return (
//     <div
//       className="card-badge-left absolute top-4 left-4 text-white/75 lg:text-white text-xs lg:text-base uppercase px-1 lg:px-3 py-1 rounded-md cursor-pointer transition-all duration-2000"
//       style={{
//         backgroundColor: status === "Available" ? "#236b62" : "#c71221",
//         cursor: "pointer",
//       }}
//       onClick={toggleStatus}
//       //onClick={console.log(propertyId)}
//     >
//       {status}
//     </div>
//   );
// };
// export default Toggle;