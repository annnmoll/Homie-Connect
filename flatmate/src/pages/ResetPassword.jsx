import React from "react";
import Logo from "../components/common/Logo";
import Lottie from "react-lottie";
import animationData from "../lotties/Lottie2.json";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/authService";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function ResetPassword() {
  const { register, handleSubmit, formState } = useForm();
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors } = formState;

  const submitHandler = async (data) => {
    dispatch(resetPassword(data, token, navigate));
  };
  return (
    <div className="w-full h-screen grid   md:grid-cols-2  ">
      <div className=" py-10     px-10   flex flex-col justify-start mt-2 md:mb-20  gap-5">
        <Logo />
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="text-2xl font-bold">Reset your password</div>
          <span className="mt-5">
            Please reset your password carefully <br /> so that you do not have
            to reset it again.
          </span>

          <Input
            placeholder="New Password"
            errors={errors?.password}
            className="mt-4"
            {...register("password", { required: "Password is required" })}
          />
          <Input
            placeholder="Confirm New Password"
            errors={errors?.confirmPassword}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
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

      <div className="w-full  cursor-auto  h-auto  -pt:20 pb-10 md:py-10 ">
        <Lottie
          options={defaultOptions}
          style={{ objectFit: "contain", maxWidth: "500px" }}
        />
      </div>
    </div>
  );
}

export default ResetPassword;
