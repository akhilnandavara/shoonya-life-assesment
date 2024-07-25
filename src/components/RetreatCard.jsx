// src/components/RetreatCard.jsx
import React from 'react';


const RetreatCard = ({ image, title, description, date, location, price }) => {
  return (
    <div className=" overflow-hidden shadow-lg  rounded-md bg-light_Orange px-6 py-4 ">
      <div className=' h-[40%] w-[60%]'><img className=" w-full h-full object-cover rounded-xl" src={image} alt={title} /></div>
      <div className='flex flex-col gap-1'>
        <div className="font-bold text-sm md:text-lg my-2">{title}</div>
        <p className="text-gray-700  text-xs md:text-base">{description}</p>
        <p className="text-gray-600 text-xs md:text-sm">Date: {(new Date(date).toDateString())}</p>
        <p className="text-gray-600  text-xs md:text-sm">Location: {location}</p>
        <p className="text-gray-600  text-xs md:text-sm">Price: ${price}</p>
      </div>
    </div>
  );
};

export default RetreatCard;
