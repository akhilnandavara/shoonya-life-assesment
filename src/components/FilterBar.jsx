// src/components/FilterBar.jsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterBar = ({ onFilterChange, onSearch }) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const options = ["Signature", "Standalone", "All"];

  return (
    <div className="flex justify-between px-6 py-4 bg-gray-100">
      <div className="flex">
        {/* Filter By Date Button */}
        <div className="relative">
          <button
            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            Filter By Date
            <span className="material-symbols-outlined align-middle">
              keyboard_arrow_down
            </span>
          </button>
          {showDatePicker && (
            <div className="absolute top-[50%] left-[5%] translate-y-[15%] bg-blue-100 bg-opacity-50 w-[95%] rounded-md">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                inline
              />
            </div>
          )}
        </div>

        {/* Filter By Type Button */}
        <div className="relative">
          <button
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => setShowOptions(!showOptions)}
          >
            Filter By Type
            <span
              className={`${
                showOptions && "rotate-180"
              } material-symbols-outlined align-middle`}
            >
              keyboard_arrow_down
            </span>
          </button>
          {showOptions && (
            <div className="absolute top-[50%] left-[5%] translate-y-[15%] bg-blue-100 bg-opacity-50 w-[95%] rounded-md">
              {options.map((option, i) => (
                <div
                  className="p-2 cursor-pointer hover:bg-blue-200 hover:bg-opacity-50 transition-all duration-100 rounded-md"
                  key={i}
                  value={option}
                  onClick={() => onFilterChange(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search retreats by title"
        className="border rounded py-2 px-3"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default FilterBar;
