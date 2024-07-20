import React from "react";
import Logo from "../components/common/Logo";
import Lottie from "react-lottie";
import animationData from "../lotties/Forgot.json";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../services/authService";



const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

function ForgotPassword() {
    const { register, handleSubmit, formState } = useForm();
    const navigate = useNavigate()
    const { errors } = formState;
    const dispatch = useDispatch();
  
    const submitHandler = async (data) => {
      dispatch(forgotPassword(data , navigate))
    };
    return (
      <div className="w-full h-screen grid   md:grid-cols-2  ">
        <div className=" py-10     px-10   flex flex-col justify-start mt-2 md:mb-20  gap-5">
          <Logo />
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="text-2xl font-bold">Enter your email address</div>
            <span className="mt-5">
              Please enter your credentials so that we can send you a mail with reset password URL{" "}
            </span>
  
            <Input
              placeholder="example@email.com"
              errors={errors?.email}
              className="mt-4"
              {...register("email", { required: "Email is required" })}
            />
            {/* <Input
              placeholder="********"
              className=""
              errors={errors?.password}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be 8 characters long",
                },
                maxLength: {
                  value: 15,
                  message: "Password can be upto 15 characters long",
                },
              })}
            /> */}
            <Button type="submit" text="Confirm" className="w-full mt-5"></Button>
          </form>
          <div className="text-sm text-gray-600">
            
            <Link to="/login" className="font-bold underline cursor-pointer">
              Back to Login
            </Link>
          </div>
        </div>
  
        <div className="w-full  cursor-auto  h-auto  py-10 max-md:hidden">
          <Lottie options={defaultOptions}  width={"80%"} />
        </div>
      </div>)
}

export default ForgotPassword
