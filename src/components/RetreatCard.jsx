// src/components/RetreatCard.jsx
import React from "react";

const RetreatCard = ({ image, title, description, date, location, price }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <div className=" overflow-hidden shadow-lg  rounded-md bg-light_Orange px-6 py-4 ">
      <div className=" h-[40%] w-[60%]">
        <img
          className=" w-full h-full object-cover rounded-xl"
          src={image}
          alt={title}
        />
      </div>
      <div className="flex flex-col gap-1 h-fit">
        <div className="font-bold text-sm md:text-lg my-2">{title}</div>

        <div className="text-gray-700  text-xs md:text-base">
          <p className="">
            {!isExpanded && description.split(" ").length > 15
              ? description.split(" ").splice(0, 15).join(" ")
              : description}
          </p>
          {description.split(" ").length > 15 && (
            <button
              className="text-blue-500"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
        <p className="text-gray-600 text-xs md:text-sm">
          Date: {new Date(date).toDateString()}
        </p>
        <p className="text-gray-600  text-xs md:text-sm">
          Location: {location}
        </p>
        <p className="text-gray-600  text-xs md:text-sm">Price: ${price}</p>
      </div>
    </div>
  );
};

export default RetreatCard;
