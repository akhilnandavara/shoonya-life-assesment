import { useEffect, useState } from "react";
import "./App.css";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import RetreatCard from "./components/RetreatCard";
import Pagination from "./components/Pagination";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [retreats, setRetreats] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [filterContent, setFilterContent] = useState([]);
  const totalPages = Math.ceil(22 / 5);

  useEffect(() => {
    fetch(
      `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=${currentPage}&limit=5`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setRetreats(response);
      });
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onFilterChange = (type) => {
    setFilterType(type);
  };

  useEffect(() => {
    if (filterType === "All") {
      setFilterContent(retreats);
    } else {
      setFilterContent(
        retreats.filter((retreat) => retreat.type === filterType)
      );
    }
  }, [filterType]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-[1250px] mx-auto">
        <HeroSection />
        <FilterBar onFilterChange={onFilterChange} />
        {/* Cards */}
        <div className="grid grid-cols-2  md:grid-cols-3 px-6 py-4  grid-rows-2 gap-10">
          {filterContent.map((retreat) => (
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
