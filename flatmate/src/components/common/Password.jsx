import React, { useId, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Password = React.forwardRef(function Password(
  {
    icon,
    label,
    type = "text",
    className = "",
    labelClassName = "",
    name = "",
    $id,
    errors,
    ...props
  },
  ref
) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative  w-full ">
      <label className={`  pl-1  ${labelClassName}`} htmlFor={$id ? $id : id}>
        {label}
      </label>

      <div className="relative">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          className={`  bg-gray-200 border border-logoColor py-3 p-[8px] px-4 ${
            icon ? "pl-[40px]" : ""
          } rounded-[8px]   w-full hover:border-[#838894] ${className} `}
          ref={ref}
          {...props}
          id={$id ? $id : id}
        />
        {icon && icon}
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="w-[20px] h-[20px] absolute top-[12px] right-[12px] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
      </div>
      {errors && (
        <span className="ml-2 text-xs tracking-wide text-red-500">
          {` ${errors.message}`}
        </span>
      )}
    </div>
  );
});

export default Password;
