import { useEffect, useState } from "react";

// src/components/HeroSection.jsx
const HeroSection = () => {
  const [visble, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 500);
  }, []);

  return (
    <div className="relative  max-sm:hidden px-6 py-4  mx-auto">
      <div className="  flex flex-col gap-4 bg-light_Orange p-6 rounded-md overflow-hidden ">
        <div className="h-[40%] max-h-[400px] overflow-clip  object-cover  rounded-md">
          <img
            loading="lzay"
            src="https://yogaeastwest.com/wp-content/uploads/2017/11/slider_3.jpg"
            alt="Yoga"
            className=""
          />
        </div>
        <div
          className={` text-black h-[40%] translate-y-[100px] opacity-0  ${
            visble
              ? "!ransition-all !translate-y-0 !duration-500 !ease-in-out !opacity-100"
              : "opacity-0"
          }`}
        >
          <h2 className="text-2xl mb-4">Discover Your Inner Peace</h2>
          <p className="text-sm">
            Join us for a series of wellness retreats designed to help you find
            tranquility and rejuvenation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
