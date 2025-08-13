import React, { useState } from "react";
import { Marker, InfoWindow } from "@vis.gl/react-google-maps";

const PoiMarkers = (locs) => {
  const [hoveredMarker, setHoveredMarker] = useState(null);

  // Filter available properties
  const availableProperties = locs.pois.filter(
    (loc) => loc.property.availabilityStatus.toLowerCase() === "available"
  );

  const handleMarkerMouseOver = (loc) => {
    setHoveredMarker(loc);
  };

  const handleMarkerMouseOut = () => {
    setHoveredMarker(null);
  };

  return (
    <>
      {availableProperties.map((loc) => (
        <React.Fragment key={loc.key}>
          <Marker
            position={loc.location}
            onClick={() => window.open(`/property/${loc.key}`, "_blank")}
            onMouseOver={() => handleMarkerMouseOver(loc)}
            onMouseOut={handleMarkerMouseOut}
            // Custom marker icon (optional)
            icon={{
              url:
                "data:image/svg+xml;base64," +
                btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8" fill="red" stroke="black" stroke-width="2"/>
                  <circle cx="12" cy="12" r="4" fill="white"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(24, 24),
            }}
          />

          {/* InfoWindow that appears on hover */}
          {hoveredMarker && hoveredMarker.key === loc.key && (
            <InfoWindow
              position={loc.location}
              onCloseClick={handleMarkerMouseOut}
              options={{
                pixelOffset: new window.google.maps.Size(0, -30),
                disableAutoPan: true,
              }}
            >
              <div
                style={{
                  padding: "8px",
                  minWidth: "200px",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {loc.property.location || "Property Location"}
                </h3>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  <p style={{ margin: "4px 0" }}>
                    <strong>Type:</strong> {loc.property.type || "N/A"}
                  </p>
                  <p style={{ margin: "4px 0" }}>
                    <strong>BHK:</strong> {loc.property.bhk || "N/A"}
                  </p>
                  {loc.property.price && (
                    <p style={{ margin: "4px 0" }}>
                      <strong>Price:</strong> ₹{loc.property.price}
                    </p>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default PoiMarkers;
