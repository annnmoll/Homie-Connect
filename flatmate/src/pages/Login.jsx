import React from "react";
import Logo from "../components/common/Logo";
import Lottie from "react-lottie";
import animationData from "../lotties/Animation - 1718078946847.json";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../services/authService";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Login() {
  const { register, handleSubmit, formState } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors } = formState;

  const submitHandler = async (data) => {
   
        const { email, password } = data;
        dispatch(login(email, password, navigate));
      
  
  };
  return (
    <div className="w-full h-screen grid gap-x-5  px-5  md:grid-cols-2  ">
      <div className=" py-10  px-5      flex flex-col justify-start mt-2   gap-5">
        <Logo />
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="text-2xl font-bold">Login</div>
          <span className="mt-5">
            Please enter your credentials to sign-in to your account{" "}
          </span>

          <Input
            placeholder="example@email.com"
            errors={errors?.email}
            className="mt-4"
            {...register("email", { required: "Email is required" })}
          />
          <Input
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
          />
          <Button type="submit" text="Login" className="w-full mt-5"></Button>
        </form>

        <div
          onClick={() => {
            navigate("/forgotpassword");
          }}
          className="text-sm underline cursor-pointer text-gray-600  hover:text-gray-400"
        >
          Forgot Password?
        </div>
        <div className="text-sm text-gray-600">
          New User?{" "}
          <Link to="/signup" className="font-bold underline cursor-pointer">
            Sign Up
          </Link>
        </div>
      </div>

      <div className="  md:px-10 md:py-10 flex items-center ">
        <Lottie
          options={defaultOptions}
          style={{ objectFit : "contain" , height:"auto", maxWidth:"500" }}
        />
      </div>
    </div>
  );
}

export default Login;
