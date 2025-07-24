import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import PropertyBrief from "./PropertyBrief";
import PropertyDetails from "./PropertyDetails";
import { useSelector } from "react-redux";

import { API } from "../../../config/axios";

function ViewProperty() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [isOwnerOrAdmin, setIsOwnerOrAdmin] = useState(false);
  const authState = useSelector((state) => state.auth);
  const currentUserId = authState?.userData?.id;
  const currentUserRole = authState?.userData?.role;

  const fetchProperty = async () => {
      try {
        const response = await API.get(`property/slug/${slug}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const propertyFetched = response.data;
        console.log(propertyFetched);
        setProperty(propertyFetched);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
  useEffect(() => {
    fetchProperty();
  }, [slug]);

  // Separate useEffect for isOwnerOrAdmin validation
  useEffect(() => {
    if (property && property.userId && currentUserId) {
      const isOwner = property.userId.toString() === currentUserId.toString();
      const isAdmin = currentUserRole === "admin";
      setIsOwnerOrAdmin(isOwner || isAdmin);
      console.log("property userId", property.userId);
      console.log("Actual userId", currentUserId);
      console.log("isOwnerOrAdmin", isOwner || isAdmin);
    }
  }, [property, currentUserId, currentUserRole]);

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }

  return (
    <>
      <PropertyBrief property={property} isOwnerOrAdmin={isOwnerOrAdmin} setProperty={setProperty} fetchProperty={fetchProperty} />
      <PropertyDetails property={property} isOwnerOrAdmin={isOwnerOrAdmin} />
    </>
  );
}

export default ViewProperty;