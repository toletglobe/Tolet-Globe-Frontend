import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import PropertyBrief from "./PropertyBrief";
import PropertyDetails from "./PropertyDetails";

import { API } from "../../../config/axios";

function ViewProperty() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);

  const fetchProperty = async () => {
      try {
        const response = await API.get(`property/slug/${slug}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const propertyFetched = response.data;
        setProperty(propertyFetched);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
  useEffect(() => {
    fetchProperty();
  }, [slug]);

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }

  return (
    <>
      <PropertyBrief property={property} />
      <PropertyDetails property={property} />
    </>
  );
}

export default ViewProperty;
