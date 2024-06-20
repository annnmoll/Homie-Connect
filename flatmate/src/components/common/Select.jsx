import React, { useId, useState } from "react";

function Select(
  {
    options,
    label,
    placeholder = "",
    className,
    destinations,
    labelClassName,
    icon,
    errors,
    star,
    custom = false,
    type = "text",
    divClassName = "",

    // onChange  = null, 

    ...props
  },
  ref
) {
  const id = useId();
  const [isInput, setIsInput] = useState();
  // const handleSelectBlur = (e) => {
  //   if (e.target.value === "Custom") {
  //     setIsInput(true);
  //   } else {
  //     setIsInput(false);
  //   }
  // };

  // console.log(props.onChange);
  const changeHandler = (e) => {
   
    if(e.target.value === "Custom"){
      setIsInput(true)
    } 
   
  };

  return (
    <div className={`w-full mb-2 ${divClassName} `}>
      <label htmlFor={id} className={` md:pl-1 ${labelClassName} `}>
        {label}
        {star && <sup>*</sup>}
      </label>
      <div className="relative">
        {!isInput ? (
          <select
            ref={ref}
            id={id}
            {...props}
            // onChange={changeHandler}
            // onBlur={handleSelectBlur}
            // onDoubleClick={handleSelectBlur}
            className={` bg-[--input-background] border border-logoColor p-[8px] py-[9px] ${
              icon ? "pl-[40px]" : ""
            } rounded-[8px]   w-full hover:border-[#838894] outline-none ${className} `}
          >
            <option value="">
              {placeholder ? placeholder : "Select  " + label || "Select"}
            </option>
            {options?.map((option, i) => (
              <option key={i} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
            {destinations?.map((destination, i) => (
              <option key={i} value={destination.name}>
                {destination.name}
              </option>
            ))}

            {custom && !isInput && (
              <option value="Custom" >
                Custom
              </option>
            )}
          </select>
        ) : (
          <input
            type={type}
            id={id}
            onChange={(e) => console.log(e.target.value)}
            // accept={type === "file" ?  "image/jpeg, image/jpg, image/png" : null}
            className={`  bg-[--input-background] border border-logoColor p-[7px]  ${
              icon ? "pl-[40px]" : ""
            } rounded-[8px]   w-full hover:border-[#838894] outline-none ${className} `}
            ref={ref}
            {...props}
          />
        )}

        {icon && icon}
      </div>

      {errors && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {` ${errors.message}`}
        </span>
      )}
    </div>
  );
}

export default React.forwardRef(Select);
