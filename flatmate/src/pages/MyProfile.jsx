import React, { useEffect, useState } from "react";
import Input from "../components/common/Input";
import ToggleTab from "../components/common/ToggleTab";
import Avatar from "../assets/avatar.png";
import Button from "../components/common/Button";
import { MdArrowBack, MdArrowLeft, MdBackspace, MdKeyboardArrowLeft, MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "../services/authService";

const genders = ["Male", "Female"];
function MyProfile() {
  const { user, token } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [gender, setGender] = useState(user.gender || "Male");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  useEffect(() => {

    if(user){
    setValue("name", user?.name);
    setValue("email", user?.email);
    setValue("number", user?.number);}
  }, [user]);
  const logoutHandler = async () => {
    if(window.confirm("Are you sure you want to logout")){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setToken(null));
    dispatch(setUser(null));
    toast.success("Logged Out");
    navigate("/");}
  };

  const submitHandler = (data) => {
    
    const formObj = { 
      gender, 
      profilePicture: (data?.image && data.image.length > 0) ? data.image[0] : null, 
      ...data 
    };
    formObj.image = undefined ;
    dispatch(updateProfile(token, formObj, navigate));
  };

  return (
    <div className="w-full h-full py-10 pb-16 px-3 lg:px-5 ">
      <div className="max-w-[1000px] mx-auto mt-5 py-8 p-5 md:p-10 rounded-2xl shadow-2xl border-2 ">
        <h2 className="text-3xl flex gap-2 items-center  border-b-2 pb-8 pl-3 text-gray-600 text-md font-[600]">
          <MdArrowBack className="mt-1 cursor-pointer" onClick={()=>navigate(-1)} /> Your Profile 
        </h2>  

        <form
          className="py-10 pb-16 flex flex-col gap-5 border-b-2 "
          onSubmit={handleSubmit(submitHandler)}
        >
          {isEditing ? (
            <div className="mx-auto w-fit overflow-hidden my-3">
              <Input
                type="file"
                className="w-[200px] h-[200px] text-center mx-auto rounded-lg"
                accept="image/*"
                {...register("image", {
                  required: "Image is required",
                  validate: {
                    // Add your custom validation logic here if needed
                    checkFileType: (value) =>
                      (value[0] &&
                        (value[0].type === "image/jpeg" ||
                          value[0].type === "image/png")) ||
                      "Only JPG/PNG files are allowed",
                  },
                })}
              />
              <p
                className="text-center mt-4 cursor-pointer font-[600] text-blue-500 underline"
                onClick={() => setIsEditing(false)}
              >
                {" "}
                Cancel
              </p>
            </div>
          ) : (
            <div className=" w-[200px]   rounded-lg overflow-hidden mx-auto my-5  ">
              <img
                src={user?.profilePicture || Avatar}
                className=" rounded-lg w-full h-[200px]    object-cover"
              />
              <p
                className="text-center mt-4 cursor-pointer font-[600] text-blue-500 underline"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile Picture
              </p>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-3 md:gap-9">
            <Input
              label="Full Name"
              errors={errors?.name}
              {...register("name", { required: "Name is required" })}
            />
            <Input
              type="number"
              label="Contact Number"
              errors={errors?.number}
              {...register("number", { required: "Number is requrired" })}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-x-9 gap-y-3 ">
            <Input
              label="E-mail"
              className="cursor-not-allowed"
              errors={errors?.email}
              readOnly
              {...register("email", { requried: "Email is required" })}
            />
            <div className="">
              <p className="ml-2 font-[600] text-sm mb-1">Gender</p>
              <ToggleTab
                className="w-full "
                tabs={genders}
                setCurrentTab={setGender}
                currentTab={gender}
              />
            </div>
          </div>

          <Button
            className="w-full max-w-[400px] mx-auto mt-4 py-3"
            text="Save Changes"
            type="submit"
          />
        </form>

        <div className="p-5 w-fit" onClick={logoutHandler}>
          <p>Want to Logout?</p>
          <p className="flex items-center gap-3 text-xl  text-red-500 mt-3 cursor-pointer">
            {" "}
            <MdLogout /> Logout{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
