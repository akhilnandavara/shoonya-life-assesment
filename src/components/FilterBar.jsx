// src/components/FilterBar.jsx
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "react-big-calendar/lib/css/react-big-calendar.css"; // calender css
import { Calendar, momentLocalizer, Views } from "react-big-calendar"; // calender component
import moment from "moment"; // date library

const FilterBar = ({
  retreats,
  onFilterChange,
  searchInput,
  setSearchInput,
  onSearch,
  onFilterByDate,
}) => {
  // Prop validation
  FilterBar.propTypes = {
    retreats: PropTypes.array.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    searchInput: PropTypes.string.isRequired,
    setSearchInput: PropTypes.func.isRequired,
    onFilterByDate: PropTypes.func.isRequired,
  };

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);
  const localizer = momentLocalizer(moment);
  const datePickerRef = useRef(null);
  const optionsRef = useRef(null);

  const options = [
    "All",
    "Relaxation",
    "Meditation",
    "Weekend",
    "Flexibility",
    "Yoga",
    "Workshop",
    "Fitness",
    "Camp",
    "Detox",
    "Diet",
    "Spiritual growth",
    "Pre-natal",
  ];
  //  events for calender
  const events = retreats.map((retreat) => {
    return {
      title: retreat.title,
      start: retreat.date,
      end: retreat.date,
      id: retreat.id,
    };
  });

  useEffect(() => {
    const clickOutHandler = (e) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setShowDatePicker(false);
      }
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    if (showDatePicker || showOptions) {
      document.addEventListener("mousedown", clickOutHandler);
    } else {
      document.removeEventListener("mousedown", clickOutHandler);
    }

    return () => {
      document.removeEventListener("mousedown", clickOutHandler);
    };
  }, [showDatePicker, showOptions]);

  return (
    <div className="flex flex-row max-sm:flex-col  justify-between px-6 py-4 bg-gray-100">
      <div className="flex flow-row max-sm:flex-col ">
        {/* Filter By Date Button */}
        <div className="relative max-sm:my-2 ">
          <button
            className="sm:bg-blue-950 sm: hover:bg-blue-900 sm:text-white  text-gray-400 w-full bg-gray-200  flex justify-between py-2 px-4 rounded"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <span> Filter By Date</span>
            <span className="material-symbols-outlined align-middle ">
              keyboard_arrow_down
            </span>
          </button>
          {showDatePicker && (
            <div ref={datePickerRef}>
              <Calendar
                localizer={localizer}
                events={events}
                defaultDate={new Date(1970, 0, 1)}
                startAccessor="start"
                endAccessor="end"
                views={[Views.MONTH, Views.AGENDA]}
                messages={{ agenda: "Programs" }}
                selectable={false}
                className="absolute z-[1000]  top-[50%] text-xs  translate-y-[10%] bg-white w-full h-60 sm:w-[300px] sm:min-h-[300px] rounded-md"
                onSelectEvent={(e) => {
                  setShowDatePicker(!showDatePicker);
                  onFilterByDate(e);
                }}
              />
            </div>
          )}
        </div>

        {/* Filter By Type Button */}
        <div className="relative max-sm:my-2">
          <button
            className="sm:bg-blue-950 hover:bg-blue-900 sm:text-white bg-gray-200 text-gray-400  flex justify-between py-2 px-4 w-full rounded md:ml-2"
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
            <div
              ref={optionsRef}
              className="absolute top-[50%] left-0 sm:left-[5%] translate-y-[5%] bg-gray-200  bg-opacity-75 w-full  rounded-md"
            >
              {options.map((option, i) => (
                <div
                  className="p-2 cursor-pointer hover:bg-blue-200 hover:bg-opacity-50 transition-all duration-100 rounded-md"
                  key={i}
                  value={option}
                  onClick={() => {
                    setShowOptions(!showOptions);
                    onFilterChange(option);
                  }}
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
        value={searchInput}
        placeholder="Search Retreats By Title"
        className="border py-2 px-4 text-lg font-sans   sm:w-[40%] rounded-md  sm:bg-blue-950 sm:text-white"
        onChange={(e) => {
          setSearchInput();
          onSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default FilterBar;
