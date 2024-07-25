import "./App.css";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-[1250px]">
        <HeroSection />
        <FilterBar />
      </div>
    </div>
  );
}

export default App;
