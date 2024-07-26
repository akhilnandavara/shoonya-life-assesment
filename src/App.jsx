import { useEffect, useRef, useState } from "react";
import "./App.css";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import RetreatCard from "./components/RetreatCard";
import Pagination from "./components/Pagination";
import debounce from "lodash.debounce";
import Footer from "./components/Footer";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [retreats, setRetreats] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let baseURL = `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats`;
      let pageURL = `${baseURL}?page=${currentPage}&limit=5`;

      if (searchTerm) {
        pageURL += `&search=${searchTerm}`;
        baseURL += `?search=${searchTerm}`;
      } else if (filterType !== "All") {
        pageURL += `&filter=${filterType}`;
        baseURL += `?filter=${filterType}`;
      }

      try {
        const [pageResponse, totalResponse] = await Promise.all([
          fetch(pageURL),
          fetch(baseURL),
        ]);

        if (pageResponse.status !== 200 || totalResponse.status !== 200) {
          setRetreats([]);
          setTotalPages(1);
          throw new Error("Failed to fetch data");
        }

        const pageData = await pageResponse.json();
        const totalData = await totalResponse.json();

        setRetreats(pageData);
        setTotalPages(Math.ceil(totalData.length / 5));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    if (window.scrollY > 100) window.scrollTo({ top: 200, behavior: "smooth" });
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

  const onFilterByDate = (data) =>
    setRetreats(retreats.filter((retreat) => retreat.id === data.id));

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="max-w-[1250px] mx-auto">
        <HeroSection/>
        <FilterBar
          ref={scrollRef}
          retreats={retreats}
          onFilterChange={onFilterChange}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={onSearch}
          onFilterByDate={onFilterByDate}
        />
        {/* Cards */}
        {retreats?.length <= 0 ? (
          <div className=" font-bold  sm:text-3xl h-40 sm:h-80 flex justify-center items-center">
            Content Not Found
          </div>
        ) : (
          <div className="grid   sm:grid-cols-2  md:grid-cols-3 px-6 py-4  grid-rows-2 gap-10">
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
      <Footer />
    </div>
  );
}

export default App;
