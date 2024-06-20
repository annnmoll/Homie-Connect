import React, { useState } from "react";
import Logo from "../components/common/Logo";
import Lottie from "react-lottie";
import animationData from "../lotties/Animation - 1718078946847.json";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/slices/userSlice";

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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { errors } = formState;

  const submitHandler = async (data) => {
    try{
       const {email, password} = data 
       const response  = await axios.post("http://localhost:4000/login" , {email , password})
       if(response.data.success){
        toast.success(response.data.message)
       dispatch(setUser(response.data.user))
       dispatch(setToken(response.data.token))
      console.log(response)
       const expire= new Date(new Date().getTime() + (7*24*60*60*1000));
       document.cookie= `token=${response.data.token}; expires=${expire};`;
       localStorage.setItem("user", JSON.stringify(response.data.user));
       navigate("/")
      }
       
    }catch(error){
      toast.error(error.response.data.message)
    }
  };
  return (
    <div className="w-full h-screen grid  px-5  md:grid-cols-2  ">
      <div className=" py-10  px-5    md:px-10   flex flex-col justify-start mt-2 md:mb-20  gap-5">
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
        <div className="text-sm text-gray-600">
          New User?{" "}
          <Link to="/signup" className="font-bold underline cursor-pointer">
            Sign Up
          </Link>
        </div>
      </div>

      <div className=" h-auto md:px-10 py-10">
        <Lottie options={defaultOptions} height={"80%"} width={"90%"} />
      </div>
    </div>
  );
}

export default Login;
