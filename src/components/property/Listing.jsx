import React from 'react';
import { CiHeart, CiShare2 } from 'react-icons/ci';
import { FaLocationDot, FaRegImage, FaVideo } from 'react-icons/fa6';
import { IoAdd, IoBedOutline } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { PiGridFour } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import p1 from '../../assets/property/property-1.jpg';
import p2 from '../../assets/property/property-2.jpg';
import p3 from '../../assets/property/property-3.jpg';
import p4 from '../../assets/property/property-4.png';
import p5 from '../../assets/property/property-5.jpg';
import p6 from '../../assets/property/property-6.jpg';
import p7 from '../../assets/property/property-7.jpg';
import p8 from '../../assets/property/property-8.jpg';
import a3 from '../../assets/property/author3.jpg'
import a2 from '../../assets/property/author2.jpg'
import a4 from '../../assets/property/author4.jpg'
import a5 from '../../assets/property/author5.jpg'
import a6 from '../../assets/property/author6.jpg'
import a7 from '../../assets/property/author7.jpg'
import a8 from '../../assets/property/author8.jpg'
import author from "../../assets/property/author.jpg"
import './listing.css';

const Listing = () => {
  const navigate = useNavigate();
  const properties =
    [
      {
        "id": 1,
        "image": p1,
        "title": "Flat For Rent",
        "price": "Rs. 12,000 (negotiable)",
        "address": "D 801 the woods apartment, Lucknow",
        "description": "Semi Furnished, 4th floor",
        "beds": 2,
        "baths": "Both",
        "author": author,
        "area":"1352 ft2",
        "authorName": "Deepti Rastogi",
        "badgeRight": "For Rent",
        "badgeLeft": "Featured",
        "location": "/flow"
      },
  
      {
          "id": 2,
          "image": p2,
          "title": "House for rent",
          "price": "Rs. 10,000/Month",
          "address": "Munshipulia opposite Ishwar Dham Mandir, Lucknow",
          "description": "Semi Furnished, Ground floor",
          "beds": 2,
          "baths": "3",
          "author": a2,
          "area":"1352 ft2",
          "authorName": "Vindhya Vikram",
          "badgeRight": "For Rent",
          "badgeLeft": "Featured",
          "location": "/flow"
        },
    
    
        {
          "id": 3,
          "image": p3,
          "title": "House for rent",
          "price": "Rs. 14,000/Month",
          "address": "Chinnat sarik road, Lucknow",
          "description": "Semi Furnished, Ground floor",
          "beds": 2,
          "baths": "Both",
          "author": a3,
          "area":"1352 ft2",
          "authorName": "Rajesh kumar",
          "badgeRight": "For Rent",
          "badgeLeft": "Featured",
          "location": "/flow"
        },
    
    
        {
          "id": 4,
          "image": p4,
          "title": "House For Rent",
          "price": "Rs. 8,500",
          "address": "Keshav Nagar, Lucknow",
          "description": "Semi Furnished, 4th floor",
          "beds": 2,
          "baths": "Both",
          "author": a4,
          "area":"1352 ft2",
          "authorName": "Aman Saxena",
          "badgeRight": "For Rent",
          "badgeLeft": "Featured",
          "location": "/flow"
        },
    
    
        {
          "id": 5,
          "image": p5,
          "title": "Flat For Sale",
          "price": "Rs. 30,50,000",
          "address": "Chinhat satrik road, Lucknow",
          "description": "Semi Furnished, 4th floor",
          "beds": 2,
          "baths": "Both",
          "author": a5,
          "area":"1352 ft2",
          "authorName": "Gupta property",
          "badgeRight": "For Rent",
          "badgeLeft": "Featured",
          "location": "/flow"
        },
    
    
        {
          "id": 6,
          "image": p6,
          "title": "House For Rent",
          "price": "Rs. 2,20,000",
          "address": "Sarojini Nagar Kanpur highway and Bijnor road  ,Lucknow",
          "description": "Semi Furnished, 2nd floor",
          "beds": 2,
          "baths": "Both",
          "author": a6,
          "area":"1352 ft2",
          "authorName": "Anurag",
          "badgeRight": "For Rent",
          "badgeLeft": "Featured",
          "location": "/flow"
        },
    
    
        {
          "id": 7,
          "image": p7,
          "title": "House For Rent",
          "price": "Rs. 4,500/Month",
          "address": "Panchmukhi Mandir, Alambagh, Lucknow",
          "description": "Semi Furnished, 2nd floor",
          "beds": 2,
          "baths": "Both",
          "author": a7,
          "area":"1352 ft2",
          "authorName": "Sanjeev",
          "badgeRight": "For Rent",
          "badgeLeft": "Featured",
          "location": "/flow"
        },
    
    
        {
          "id": 8,
          "image": p8,
          "title": "Shop For Rent",
          "price": "Rs. 3,500",
          "address": "Pinkcity Colony, Lucknow",
          "description": "Non Furnished, Ground floor",
          "beds": 2,
          "baths": "Both",
          "author": a8,
          "area":"1352 ft2",
          "authorName": "Devendra Kumar",
          "badgeRight": "For Rent",
          "badgeLeft": "Featured",
          "location": "/flow"
        }
    ]

  return (
    <>
      <section className="property py-24" id="property">
        <div className="container mx-auto px-10">
          <ul className="property-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(property => (
              <li key={property.id} className="property-card bg-white border border-gray-200 shadow-lg">
                <figure className="card-banner relative aspect-w-2 aspect-h-1.5 overflow-hidden">
                  <a href="#">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  </a>
                  <div className={`card-badge-right ${property.badgeRight.toLowerCase().replace(' ', '-')} absolute top-6 right-6 text-white text-xs uppercase px-3 py-1`} style={{ backgroundColor: '#c8a217' }}>{property.badgeRight}</div>
                  <div className={`card-badge-left ${property.badgeLeft.toLowerCase().replace(' ', '-')} absolute top-6 left-6 text-white text-xs uppercase px-3 py-1`} style={{ backgroundColor: '#137a60' }}>{property.badgeLeft}</div>
                  <div className="banner-actions absolute bottom-4 left-4 right-4 flex gap-4 justify-between">
                    <div>
                    <button className="banner-actions-btn flex items-center gap-1 text-white">
                      <FaLocationDot className="text-xl" />
                      <address>{property.address}</address>
                    </button>  
                    </div>
                    <div className="flex gap-4">
                      <button className="banner-img_video-btn flex items-center gap-2 text-white">
                      <FaVideo className="text-xl" />
                    </button>
                    <button className="banner-img_video-btn flex items-center gap-2 text-white">
                      <FaRegImage className="text-xl" />
                      6
                    </button>
                    </div>
                    
                  </div>
                </figure>
                <div className="card-content p-6">
                  <div className="name_icon flex justify-between items-center">
                    <h3 className="h3 card-title text-xl font-semibold">
                      <a href="#">{property.title}</a>
                    </h3>
                    <div className="card_icons flex space-x-2">
                      <a href='#'>
                        <CiShare2 className='card_icon text-lg border p-1' />
                      </a>
                      <a href='#'>
                        <IoAdd className='card_icon text-lg border p-1' />
                      </a>
                      <a href='#'>
                        <CiHeart className='card_icon text-lg border p-1  ' />
                      </a>
                    </div>
                  </div>
                  <div className="card-price text-gray-700 text-sm mt-1">{property.price}</div>
                  <p className="card-text text-gray-800 text-sm mt-4">
                    {property.description}
                  </p>
                  <ul className="card-list flex  items-center justify-evenly mt-4">
                    <li className="card-item flex items-center text-gray-800 text-base">
                      <IoBedOutline className='text-xl' />
                      &nbsp;
                      {property.beds}
                    </li>
                    <li className="card-item flex items-center text-gray-800 text-base">
                      <LuBath className='text-xl' />
                      &nbsp;
                      {property.baths}
                    </li>
                    <li className="card-item flex items-center text-gray-800 text-base">
                      <PiGridFour className='text-xl' />
                      &nbsp;
                      {property.area}
                    </li>
                  </ul>
                </div>
                <div className="card-footer p-6 flex justify-between items-center">
                  <div className="card-author flex items-center gap-4">
                    <figure className="author-avatar w-10 h-10 overflow-hidden rounded-full">
                      <img src={property.author} alt={property.authorName} className="w-full h-full object-cover" />
                    </figure>
                    <div>
                      <p className="author-name text-gray-900 text-sm font-medium">
                        <a href="#">{property.authorName}</a>
                      </p>
                    </div>
                  </div>
                  <div className="card-footer-actions">
                  {/* onClick={() => navigate(property.location)} */}
                    <button  onClick={() => navigate(property.location)} className="card-footer-actions-btn bg-gray-200 text-gray-900 w-28 h-9 grid place-items-center text-sm" >
                      SHOW MORE
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Listing;
