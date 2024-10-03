import { useEffect, useState } from "react";
import Cards from "./listingComponents/Cards"; // Assuming you already have this component

const ComparePage = () => {
  const [compare, setCompare] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Retrieve data from localStorage
    const compareData = JSON.parse(localStorage.getItem('compare'));
    const propertiesData = JSON.parse(localStorage.getItem('properties'));
    
    if (compareData && propertiesData) {
      setCompare(compareData);
      setProperties(propertiesData);
    }
  }, []);

  // Filter properties that match the ones selected for comparison
  const filteredProperties = properties.filter(property => compare.includes(property._id));

  return (
    <div className="m-10">
      <h1 className="text-3xl font-bold text-yellow-500 m-5">
          Compare with similar properties
          
        </h1>

    <div className="flex">
        <Cards properties={filteredProperties}/>
    </div>

      {/* Comparison Table */}
      <div className="comparison-table mt-10 p-4 border-t bg-white rounded-lg">
  {/* <h2 className="text-xl font-bold mb-4">Property Details Comparison</h2> */}
  <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr>
        <th className="border p-2 text-blue-500">Criteria</th>
        {filteredProperties.map((property, index) => (
          <th className="border p-2 text-black" key={property._id}>
            {`Property ${index+1}`}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border p-2 text-blue-500">Location</td>
        {filteredProperties.map((property) => (
          <td className="border p-2 text-black" key={`${property._id}`}>
            {property.locality}
          </td>
        ))}
      </tr>
      <tr>
        <td className="border p-2 text-blue-500">Space Type</td>
        {filteredProperties.map((property) => (
          <td className="border p-2 text-black" key={`${property._id}-spaceType`}>
            {property.spaceType}
          </td>
        ))}
      </tr>
      <tr>
        <td className="border p-2 text-blue-500">Property Type</td>
        {filteredProperties.map((property) => (
          <td className="border p-2 text-black" key={`${property._id}-propertyType`}>
            {property.propertyType}
          </td>
        ))}
      </tr>
      <tr>
        <td className="border p-2 text-blue-500">Preference</td>
        {filteredProperties.map((property) => (
          <td className="border p-2 text-black" key={`${property._id}-preference`}>
            {property.preference}
          </td>
        ))}
      </tr>
      <tr>
        <td className="border p-2 text-blue-500">If Bachelors</td>
        {filteredProperties.map((property) => (
          <td className="border p-2 text-black" key={`${property._id}-bachelors`}>
            {property.bachelors}
          </td>
        ))}
      </tr>
    </tbody>
  </table>
</div>

    </div>
  );
};

export default ComparePage;
