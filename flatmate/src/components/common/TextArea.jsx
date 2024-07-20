import React, { useId, useRef, useEffect } from 'react';

const TextArea = React.forwardRef(function Input({
  icon,
  label,
  className = "",
  labelClassName = "",
  name = "",
  $id,
  errors ,
  star , 
  ...props
}, ref) {
  const id = useId();
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height before calculating
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height to match the content
    }
  }, [props.value]); // Update height when the value changes

  return (
    <div className='relative mb-2 w-full'>
      <label
        className={`  md:pl-1 font-[500] ${labelClassName}`}
        htmlFor={$id ? $id : id}>
        {label }
        {star && <sup>*</sup>}
      </label>

      <div className='relative'>
        <textarea
          name={name}
          className={` bg-gray-200 p-4 border border-logoColor  ${
            icon ? "pl-[40px]" : ""
          } rounded-[8px]   w-full hover:border-[#838894] outline-none ${className} `}
          ref={(element) => {
            textareaRef.current = element;
            if (ref) {
              if (typeof ref === "function") {
                ref(element);
              } else {
                ref.current = element;
              }
            }
          }}
          {...props}
          id={$id ? $id : id}
          style={{ resize: "none", overflowY: "hidden" }}
          onInput={() => {
            if (textareaRef.current) {
              textareaRef.current.style.height = "auto"; // Reset the height before calculating
              textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height to match the content
            }
          }}
        />
        {icon && icon}
       
      </div>
      {errors && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {` ${errors.message}`}
        </span>
      )}
    </div>
  );
});

export default TextArea;

