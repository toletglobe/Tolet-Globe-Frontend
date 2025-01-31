import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Favorite Properties</h2>
            {favorites.length === 0 ? (
                <p>No favorites yet!</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.map((property) => (
                        <li key={property._id} className="property-card bg-white border shadow-lg p-4">
                            <img src={property.images[0]} alt={property.propertyType} className="w-full h-40 object-cover" />
                            <h3 className="text-lg font-semibold mt-2">{property.bhk} BHK, {property.propertyType}</h3>
                            <p className="text-gray-700">RS. {parseInt(property.rent, 10).toLocaleString("en-IN")}</p>
                            <button onClick={() => navigate("/property/${property.slug }")} className="text-blue-500 mt-2">
                                View Property
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favorites;