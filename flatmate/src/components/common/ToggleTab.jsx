import React from "react";

function ToggleTab({
  tabs,
  currentTab,
  setCurrentTab,
  clickHandler,
  className,
  ...props
}) {
  return (
    <div className={`flex  text-center gap-x-4 mb-2`}>
      {tabs.map((element, index) => {
        return (
          <div
            className={` bg-gray-200 justify-center text-[16px] rounded-xl  flex flex-row items-center   gap-2  max-sm:text-sm
                          ${
                            currentTab === element
                              ? "bg-green-600 rounded-[16px] text-[white]  "
                              : "hover:bg-gray-300"
                          } rounded-[16px] transition-all duration-200 cursor-pointer    px-4 md:px-7 py-3 text-center 
                         ${className} `}
            key={index}
            onClick={() => {
              setCurrentTab(element);
              clickHandler && clickHandler();
            }}
          >
            {element}
          </div>
        );
      })}
    </div>
  );
}

export default ToggleTab;
