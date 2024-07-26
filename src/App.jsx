import { useEffect, useRef, useState } from "react";
import "./App.css";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import RetreatCard from "./components/RetreatCard";
import Pagination from "./components/Pagination";
import debounce from "lodash.debounce";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [retreats, setRetreats] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=${currentPage}&limit=5`;

      if (searchTerm) {
        url += `&search=${searchTerm}`;
      } else if (filterType !== "All") {
        url += `&filter=${filterType}`;
      }

      try {
        const filterDataResponse = await fetch(url);
        if (filterDataResponse.status !== 200) {
          setRetreats([]);
          setTotalPages(1);
          throw new Error("Failed to fetch filter data");
        }

        const filterData = await filterDataResponse.json();
        setRetreats(filterData);

        // Get total pages
        let totalPageurl =
          "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats";
        if (searchTerm) {
          totalPageurl += `?search=${searchTerm}`;
        } else if (filterType !== "All") {
          totalPageurl += `?filter=${filterType}`;
        }

        const res = await fetch(totalPageurl);
        if (res.status !== 200) {
          throw new Error("Failed to fetch total pages");
        }

        const completeData = await res.json();
        setTotalPages(Math.ceil(completeData.length / 5));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, filterType]);

  const onPageChange = (page) => setCurrentPage(page);


  const onSearch = debounce((searchTerm) => {
    setCurrentPage(1);
    setSearchTerm(searchTerm);
  }, 300);

  const onFilterChange = (type) => {
    setCurrentPage(1);
    setSearchTerm("");
    setSearchInput("");
    setFilterType(type);
  };
  
  const onFilterByDate=(data)=> setRetreats(retreats.filter((retreat)=>retreat.id===data.id))
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-[1250px] mx-auto">
        <HeroSection />
        <FilterBar
       
      
        retreats={retreats}
          onFilterChange={onFilterChange}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={onSearch}
          onFilterByDate={onFilterByDate}

        />
        {/* Cards */}
        {retreats?.length <= 0 ? (
          <div className=" font-bold text-3xl h-80 flex justify-center items-center">
            Content Not Found
          </div>
        ) : (
          <div className="grid grid-cols-2  md:grid-cols-3 px-6 py-4  grid-rows-2 gap-10">
            {retreats?.map((retreat) => (
              <RetreatCard
                key={retreat.id}
                title={retreat.title}
                description={retreat.description}
                price={retreat.price}
                date={retreat.date}
                location={retreat.location}
                image={retreat.image}
              />
            ))}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default App;
