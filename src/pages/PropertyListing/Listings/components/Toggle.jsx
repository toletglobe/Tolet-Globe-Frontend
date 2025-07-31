import { useState, useEffect } from "react";

import { API } from "../../../../config/axios";

const Toggle = ({ propertyId, currentStatus, propertyUserId }) => {
  const [status, setStatus] = useState(currentStatus);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    console.log("Logged in user:", { role, userId });
    console.log("Property owner ID:", propertyUserId);

    setIsAdmin(role === "admin");
    setIsOwner(userId === propertyUserId);
  }, [propertyUserId]);

  const toggleStatus = async () => {
    if (!isAdmin && !isOwner) return;

    try {
      const newStatus = status === "Available" ? "Rented Out" : "Available";
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
