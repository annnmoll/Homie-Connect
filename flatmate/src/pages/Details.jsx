import React, { useEffect, useState } from "react";
import Logo from "../components/common/Logo";
import Input from "../components/common/Input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import ToggleTab from "../components/common/ToggleTab";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import Password from "../components/common/Password";

const options = [
  { value: "delhi", label: "Delhi" },
  { value: "noida", label: "Noida" },
  { value: "gurugram", label: "Gurugram" },
  { value: "hyedrabad", label: "Hyedrabad" },
  { value: "banglore", label: "Banglore" },
  { value: "pune", label: "Pune" },
  { value: "mumbai", label: "Mumbai" },
  { value: "greater noida", label: "Greater Noida" },
  { value: "others", label: "Others" },
];

const roles = [
  { value: "tenant", label: "You're looking for a Flat/PG/Room" },
  { value: "flatOwner", label: "Flat Owner" },
  { value: "pgOwner", label: "PG Owner" },
];

const genders = ["Male", "Female"];

function Details() {
  const { email } = useSelector((state) => state.auth);
  const [selectedCity, setSelectedCity] = useState(null);
  const [role, setRole] = useState(null);
  const [gender, setGender] = useState("Male");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  useEffect(() => {
    if (!email) {
      toast.error("Session Timeout");
      navigate("/signup");
    }
  }, [email]);

  const submitHandler = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.warn("Confirm Password again");
    } else {
      const formObj = {
        role: role.value,
        gender,
        city: selectedCity?.value,
        ...data,
      };
      // console.log(formObj);
      dispatch(setDetails(formObj));
      navigate("/preferences");
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center px-5 md:px-10 py-5">
      <div className="w-full max-w-4xl  mx-auto flex justify-center items-center flex-col gap-5  py-5">
        <Logo />

        <div className="border  rounded-xl  w-full  px-5 md:px-10 py-10 pb-16  ">
          <h1 className="text-3xl font-[600] text-center mb-8 ">
            You are Almost Done!!
            <br />
            <span className="text-sm text-center  ">
              Please fill below details to continue
            </span>
          </h1>

          <form onSubmit={handleSubmit(submitHandler)}>
            <Input
              label="Your Name"
              errors={errors?.name}
              placeHolder="John Doe"
              divClassName="mb-[2px]"
              {...register("name", { required: "Name is required" })}
            />

            <div className="text-sm mt-5 ml-1 mb-1 font-[600]">
              Please select what describes you best
            </div>
            <Select
              //   isSearchable={true}
              defaultValue={role}
              onChange={setRole}
              options={roles}
              placeholder="Select what describes you best"
              className="mb-5"
              required
              //   {...register("city" , {required : "City is required "})}
            />

            <Input
              errors={errors?.age}
              label="Your Age"
              placeHolder="18"
              type="number"
              className=""
              {...register("age", { required: "Age is required" })}
            />
            <div className="text-sm mt-5 ml-1 mb-1 font-[600]">Your Gender</div>
            <ToggleTab
              tabs={genders}
              currentTab={gender}
              setCurrentTab={setGender}
              className="w-full h-[40px]"
            />

            <div className="text-sm mt-5 ml-1 mb-1 font-[600]">
              Please select the city where you are searching{" "}
            </div>
            <Select
              isSearchable={true}
              defaultValue={selectedCity}
              onChange={setSelectedCity}
              options={options}
              placeholder="Select City"
              className="mb-5"
              required
              //   {...register("city" , {required : "City is required "})}
            />

            {/* <Input type="file" label="Add a profile picture" className="mb-5" /> */}
            <Password
              label="Password"
              errors={errors?.password}
              placeHolder="********"
              {...register("password", {
                required: "Password is required is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 8 characters long ",
                },
                maxLength: {
                  value: 15,
                  message: "Password can be upto 15 character long",
                },
              })}
            />

            <Password
              label="Confirm Password"
              errors={errors?.confirmPassword}
              placeHolder="********"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
            />

            <Button type="submit" text="Register" className="w-full mt-7 " />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Details;
