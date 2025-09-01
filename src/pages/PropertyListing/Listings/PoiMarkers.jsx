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
               <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="655.359" height="655.359" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd" viewBox="0 0 6.827 6.827"><defs><style>.fil1{fill:none}</style></defs><g id="Layer_x0020_1"><path d="M4.304 2.189a.89.89 0 1 0-1.781 0 .89.89 0 0 0 1.78 0z" style="fill:#000000"/><path class="fil1" d="M0 0h6.827v6.827H0z"/><path class="fil1" d="M.853.853h5.12v5.12H.853z"/><path d="M3.413.853c.776 0 1.405.585 1.405 1.305 0 .485-1.164 3.18-1.405 3.815-.17-.447-1.405-3.298-1.405-3.815 0-.72.63-1.305 1.405-1.305zm0 .446a.89.89 0 1 1 0 1.78.89.89 0 0 1 0-1.78z" style="fill:#FF0000"/></g></svg>
              `),
              scaledSize: new window.google.maps.Size(40, 40),
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
                  padding: "4px",
                  minWidth: "100px",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                <h3
                  style={{
                    margin: 0, // remove default top gap
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {loc.property.area}
                </h3>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  <p style={{ margin: "4px 0" }}>
                    <strong>Type:</strong> {loc.property.propertyType || "N/A"}
                  </p>
                  <p style={{ margin: "4px 0" }}>
                    <strong>BHK:</strong> {loc.property.bhk || "N/A"}
                  </p>
                  {loc.property.rent && (
                    <p style={{ margin: "4px 0" }}>
                      <strong>Rent:</strong> ₹{loc.property.rent}
                    </p>
                  )}
                  {/* {loc.property.ownwerLoation && ( */}
                  <p style={{ margin: "4px 0" }}>
                    <strong>Owner Loc:</strong>
                    {loc.property.ownwerLoation || "Not available"}
                  </p>
                  <p style={{ margin: "4px 0" }}>
                    <strong>Preference:</strong>
                    {loc.property.preference || "Not available"}
                  </p>

                  {/* )} */}
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
