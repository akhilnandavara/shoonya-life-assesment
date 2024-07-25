import { useEffect, useState } from "react";
import "./App.css";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import RetreatCard from "./components/RetreatCard";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [retreats, setRetreats] = useState([]);
  useEffect(() => {
    fetch(
      "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=1&limit=5"
    )
      .then((response) => response.json())
      .then((response) => {
        setRetreats(response);
      });
  }, [currentPage]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-[1250px] mx-auto">
        <HeroSection />
        <FilterBar />
        {/* Cards */}
        <div className="grid grid-cols-2  md:grid-cols-3 px-6 py-4  grid-rows-2 gap-10">
          {retreats.map((retreat) => (
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
      </div>
    </div>
  );
}

export default App;
