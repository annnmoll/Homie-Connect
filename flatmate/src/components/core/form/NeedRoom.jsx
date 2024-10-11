import React, { useState } from "react";
import Input from "../../common/Input";
import ToggleTab from "../../common/ToggleTab";
import TextArea from "../../common/TextArea";
import { MdCancel, MdCurrencyRupee, MdLocationPin } from "react-icons/md";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { cities } from "../../../utils/cities";
import { createListing } from "../../../services/operations/listings";

const lookingForOptions = ["Male", "Female", "Any"];
const occupancyOptions = ["Single", "Shared", "Any"];
const pgOptions = ["Yes", "No"];

const highlights = [
  { label: "Vegetarian", name: "vegetarian" },
  { label: "Working Full Time", name: "workingFullTime" },
  { label: "College Student", name: "collegeStudent" },
  { label: "25+ age", name: "above25" },
  { label: " <25 age", name: "below25" },
  { label: "Working night shifts", name: "workingNightShifts" },
  { label: "Have 2 wheeler", name: "have2Wheeler" },
  { label: "Have 4 wheeler", name: "have4Wheeler" },
  { label: "Will Shift Immediately", name: "willShiftImmediately" },
  { label: "Have pets", name: "havePets" },
  { label: "Need no furnishing", name: "needNoFurnishing" },
];

function NeedRoom() {
  const [lookingFor, setLookingFor] = useState("Male");
  const [selectedCity, setSelectedCity] = useState(null);
  const [occupancy, setOccupancy] = useState("Single");
  const [pg, setPg] = useState("Yes");
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const submitHandler = async (data) => {
    // console.log(selectedCity)
    const formObj = {
      type: "Room",
      title: "Needed Room urgent",
      location: selectedCity.value,
      lookingFor,
      occupancy,

      ...data,
    };
    // console.log(formObj) ;

    formObj.roomDetails = {
      isInterestedInPg: pg === "Yes" ? true : false,
      ...formObj.roomDetails,
    };
    // console.log(formObj)
    dispatch(createListing(formObj, token, navigate));
  };
  return (
    <div className="w-full min-h-screen bg-gray-700 py-12 px-4">
      <div className=" w-full max-w-5xl   bg-white mx-auto py-10 p-5 rounded-2xl md:px-14 relative ">
        <div className="flex flex-col gap-2  items-center">
          <h1 className="text-3xl font-[600]"> Add your requirement</h1>
          <span className="text-sm text-gray-600">
            so that other users can contact you
          </span>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="px-4 mt-20 flex flex-col gap-y-7 text-sm"
        >
          {/* location and looking for  */}
          <div className="grid lg:grid-cols-2 gap-y-5 gap-x-8">
            <div>
              <h2 className="font-[500] mb-1 ">Select City</h2>
              <Select
                isSearchable={true}
                defaultValue={selectedCity}
                onChange={setSelectedCity}
                options={cities}
                placeholder="Select City"
                className="mb-5"
                required
                //   {...register("city" , {required : "City is required "})}
              />
            </div>
            <div className="border py-4 px-4  rounded-md relative">
              <span className="mb-1 absolute -top-4 bg-white px-2 font-[600]">
                Looking For
              </span>
              <ToggleTab
                currentTab={lookingFor}
                setCurrentTab={setLookingFor}
                tabs={lookingForOptions}
                className="w-full "
              />
            </div>
          </div>

          {/* rent and occupancy  */}
          <div className="grid lg:grid-cols-2 gap-x-8 gap-y-5">
            <Input
              labelClassName="mb-1"
              label="Approx Rent"
              icon={<MdCurrencyRupee className="icon text-gray-500" />}
              placeholder="5000"
              {...register("price", {
                required: "Price is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers are allowed",
                },
              })}
              errors={errors?.price}
            />
            <div className="border py-4 px-4  rounded-md relative">
              <span className="mb-1 absolute -top-4 font-[600] bg-white px-2">
                Occupancy
              </span>
              <ToggleTab
                currentTab={occupancy}
                setCurrentTab={setOccupancy}
                tabs={occupancyOptions}
                className="w-full"
              />
            </div>
          </div>

          {/* highlights */}
          <div className="mb-3">
            <h2 className="font-[500] mb-1 ">
              Choose highlights for your property
            </h2>
            <div className="flex gap-x-4 flex-wrap text-nowrap">
              <div className="flex gap-x-4 flex-wrap text-nowrap">
                {highlights.map((option, i) => (
                  <Input
                    key={i}
                    type="checkbox"
                    label={option.label}
                    divClassName="flex flex-row-reverse !w-fit items-center gap-x-2 bg-gray-200 p-2 rounded-xl px-3"
                    className="mt-[5px] cursor-pointer"
                    labelClassName="cursor-pointer"
                    {...register(`roomDetails.highlights[${option.name}]`)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-8">
            {/* <Input labelClassName="mb-1" label="Approx Rent" icon={<MdCurrencyRupee className="icon text-gray-500" />} placeHolder="Add Location..."/> */}
            <div className="border py-4 px-4  rounded-md relative">
              <span className="mb-1 absolute -top-4 font-[600] bg-white px-2">
                Are you interested in PG too ?
              </span>
              <ToggleTab
                currentTab={pg}
                setCurrentTab={setPg}
                tabs={pgOptions}
                className="w-full"
              />
            </div>
          </div>

          <TextArea
            label="Description"
            defaultValue=" I am looking for a room with roommate"
            {...register("description", {
              required: "Description is required ",
            })}
          />

          <Button
            type="submit"
            text="Submit"
            className="w-full max-w-xl mx-auto "
          />
        </form>

        <div
          className="absolute top-5 right-5  cursor-pointer "
          onClick={() => navigate("/listing")}
        >
          <MdCancel className=" text-2xl" />
        </div>
      </div>
    </div>
  );
}

export default NeedRoom;
