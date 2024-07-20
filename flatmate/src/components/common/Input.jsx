import React, {  useId } from "react";

const Input = React.forwardRef(function Input(
  {
    icon,
    label = "",
    type = "text",
    className = "",
    labelClassName = "",
    divClassName ="" , 
    name = "",
    placeholder="" , 
    $id,
    errors ,
    ...props 
  },
  ref
) {
   
  const id = useId();
  return (
    <div className={` relative w-full mb-2 ${divClassName}`}>
      <label
        className={`  md:pl-1  text-sm font-[600] ${labelClassName}  `}
        htmlFor={$id ? $id : id}
      >
        {label}
        {/* {star && <sup>*</sup>} */}
      </label>
      <div className="relative ">
        <input
            placeholder={placeholder}
          name={name}
          type={type}
        //   readOnly= {readOnly}
          // accept={type === "file" ?  "image/jpeg, image/jpg, image/png" : null}
          className={` bg-gray-200 border border-logoColor py-3 p-[8px] px-4 ${
            icon ? "pl-[40px]" : ""
          } rounded-[8px]  w-full hover:border-green-600 outline-none ${className} 
          ${type === "date" ?  "py-[6px]" : ""}    `
          
          }
          ref={ref}
          {...props}
          id={$id ? $id : id}
        />
        {icon && icon}
      </div>{" "}
      {errors  &&  (
        
        <span className="ml-2 text-xs tracking-wide text-red-500 font-[600]">
          {` ${errors?.message}`}
        </span>
      )}
    </div>
  );
});

export default Input;
