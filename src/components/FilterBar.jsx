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
    <div className="flex justify-between px-6 py-4 bg-gray-100">
      <div className="flex">
        {/* Filter By Date Button */}
        <div className="relative">
          <button
            className="bg-blue-950 hover:bg-blue-900 text-white  py-2 px-4 rounded"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            Filter By Date
            <span className="material-symbols-outlined align-middle">
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
                className="absolute top-[50%] text-xs left-[5%] translate-y-[10%] bg-white w-[300px] min-h-[300px] rounded-md"
                onSelectEvent={(e) => onFilterByDate(e)}
              />
            </div>
          )}
        </div>

        {/* Filter By Type Button */}
        <div className="relative">
          <button
            className="bg-blue-950 hover:bg-blue-900 text-white  py-2 px-4 rounded ml-2"
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
              className="absolute top-[50%] left-[5%] translate-y-[5%] bg-blue-100 bg-opacity-50 w-[95%] rounded-md"
            >
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
        value={searchInput}
        placeholder="Search Retreats By Title"
        className="border py-2 px-4 text-lg font-sans w-[40%] rounded-md  bg-blue-950 text-white"
        onChange={(e) => {
          setSearchInput();
          onSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default FilterBar;
