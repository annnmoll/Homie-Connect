import React from "react";

function Carousel({ images, selectedImageIndex, setSelectedImageIndex }) {
  const goToNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 w-full px-2 h-full bg-black bg-opacity-80 flex justify-center items-center">
      {/* Previous Arrow */}
      <img
        className="bg-white rounded-full w-6 h-6 md:w-16 md:h-16 object-contain p-1 md:p-4 cursor-pointer"
        src="https://cdn-icons-png.flaticon.com/128/271/271220.png"
        alt="Prev"
        onClick={goToPrev}
      />

      {/* Image Container */}
      <div className="relative w-[90%] gap-2 p-2 h-[70%] sm:w-[75%] sm:h-[75%] md:w-3/4 md:h-3/4 flex justify-center items-center">
        <img
          src={images[selectedImageIndex]}
          className="w-full h-full object-contain"
          alt="Carousel"
        />

        {/* Cross Image  */}
        <img
          src="https://cdn-icons-png.flaticon.com/128/9068/9068699.png"
          className="absolute top-[-20px] sm:top-[-30px] right-0 bg-white p-1 rounded-full cursor-pointer w-[30px]"
          alt="Close"
          onClick={() => setSelectedImageIndex(-1)}
        />
      </div>

      {/* Next Arrow */}
      <img
        className="bg-white rounded-full w-6 h-6 md:w-16 md:h-16 object-contain p-1 md:p-4 cursor-pointer"
        src="https://cdn-icons-png.flaticon.com/128/271/271228.png"
        alt="Next"
        onClick={goToNext}
      />
    </div>
  );
}

export default Carousel;
