import React, { useState } from "react";
import Input from "../../common/Input";
import ToggleTab from "../../common/ToggleTab";
import {useForm } from "react-hook-form"
import TextArea from "../../common/TextArea";
import { MdCancel, MdCurrencyRupee, MdLocationPin } from "react-icons/md";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import Television from "../../../assets/television.png";
import Fridge from "../../../assets/fridge.jpg";
import Kitchen from "../../../assets/kitchen.png";
import Wifi from "../../../assets/wifi.png";
import WashingMachine from "../../../assets/machine.jpg";
import AirCondition from "../../../assets/ac.jpg";
import Cook from "../../../assets/cook.png";
import Parking from "../../../assets/parking.png";
import Select from "react-select"
import { cities } from "../../../utils/cities";
import { useDispatch, useSelector } from "react-redux";
import { createListing } from "../../../services/operations/listings";

const lookingForOptions = ["Male", "Female", "Any"];
const occupancyOptions = ["Single", "Shared", "Any"];
// const pgOptions = ["Yes", "No"];


const highlights = [
  { label: "Attached Washroom", name: "attachedWashroom" },
  { label: "Market Nearby", name: "marketNearby" },
  { label: "Attached Balcony", name: "attachedBalcony" },
  { label: "Close to Metro Station", name: "closeToMetroStation" },
  { label: "Public Transport nearby", name: "publicTransportNearby" },
  { label: "Gated Society", name: "gatedSociety" },
  { label: "Separate Washrooms", name: "separateWashrooms" },
  { label: "Newly Built", name: "newlyBuilt" },
  { label: "Housekeeping", name: "housekeeping" },
  { label: "Gym nearby", name: "gymNearby" },
  { label: "Park Nearby", name: "parkNearby" },
];


const amenities = [
  { label: 'Television', imageSrc:Television , altText: 'Television' , name :"television" },
  { label: 'Fridge', imageSrc: Fridge, altText: 'Fridge' , name : "fridge" },
  { label: 'Kitchen', imageSrc: Kitchen, altText: 'Kitchen' , name : "kitchen" },
  { label: 'Wifi', imageSrc: Wifi, altText: 'Wifi'  , name :"wifi"},
  { label: 'Washing Machine', imageSrc: WashingMachine , altText: 'Washing Machine' , name : "washingMachine" },
  { label: 'AC', imageSrc: AirCondition, altText: 'Air Condition' , name : "ac" },
  { label: 'Cook', imageSrc: Cook, altText: 'Cook'  , name :"cook"},
  { label: 'Parking', imageSrc: Parking, altText: 'Parking' , name : "parking" }
];


function NeedRoommate() {
  const [lookingFor, setLookingFor] = useState("Male");
  const [occupancy, setOccupancy] = useState("Single");
  const {register , handleSubmit , formState} = useForm() ; 
  const {token} = useSelector(state=> state.user)
  const {errors} = formState ; 
  const [selectedCity, setSelectedCity] = useState(null);
  // const [pg, setPg] = useState("Yes");
  const navigate = useNavigate();
const dispatch = useDispatch() ; 

  const submitHandler = async(data) => {
   
    const formObj = {
      type : "Roommate" ,
      title : "Needed Room urgent" , 
      lookingFor ,
      location : selectedCity.value , 
      occupancy , 
      // isInterestedInPg : pg === "Yes" ? true : false   ,
      ...data
   }
  
     dispatch(createListing(formObj , token , navigate));
}
    




  return (
    <div className="w-full min-h-screen bg-gray-700 py-12 px-4">
      <div className=" w-full max-w-5xl   bg-white mx-auto py-10 p-5 rounded-2xl md:px-14 relative ">
        <div className="flex flex-col gap-2  items-center">
          <h1 className="text-3xl font-[600]"> Add your room details</h1>
          <span className="text-sm text-gray-600">
            so that other users can contact you
          </span>
        </div>

        <form onSubmit={handleSubmit(submitHandler)}className="px-4 mt-20 flex flex-col gap-y-7 text-sm">
          {/* location and looking for  */}
          <div className="grid lg:grid-cols-2 gap-y-5 gap-x-8">
          <div><h2 className="font-[500] mb-1 ">
              Select City
            </h2>
          <Select
              isSearchable={true}
              defaultValue={selectedCity}
              onChange={setSelectedCity}
              options={cities}
              placeholder="Select City"
              className="mb-5"
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
          {/* rent and occupancy */}
          <div className="grid lg:grid-cols-2 gap-x-8 gap-y-5">
            <Input
              labelClassName="mb-1"
              label="Approx Rent"
              icon={<MdCurrencyRupee className="icon text-gray-500" />}
              placeHolder="5000"
              {...register("price" , {required : "Location is required" ,  pattern: {
              value: /^[0-9]+$/,
              message: 'Only numbers are allowed'
            }})}
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

          {/* {upload 3 photos of your room } */}
          <Input
            label="Upload 3 photos of your room"
            type="file"
            className="h-[100px] flex items-center justify-center border border-dashed !p-4 border-black"
          />

          {/* highlights for your property */}
          <div className="mb-3">
            <h2 className="font-[500] mb-1 ">
              Choose highlights for your property
            </h2>
            <div className="flex gap-x-4 flex-wrap text-nowrap">
              {highlights.map((option, i) => (
                <Input
                  key={i}
                  type="checkbox"
                  label={option.label}
                  divClassName="flex flex-row-reverse !w-fit items-center gap-x-2 bg-gray-200 p-2 rounded-xl px-3"
                  className="mt-[5px] cursor-pointer"
                  labelClassName="cursor-pointer"
                  {...register(`roommateDetails.highlights[${option.name}]` )}
                />
              ))}
            </div>
          </div>

          {/* amenities */}
          <div>
            <h2 className="font-[500]">Amenities</h2>
            <div className="flex flex-wrap">
            
              {amenities.map((option , index)=>{
                 return <div className=" checkbox w-fit " key={index}>
                <label className="checkbox-wrapper cursor-pointer flex flex-col gap-y-2">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    {...register(`roommateDetails.amenities.${option.name}]`)}
                  />
                  <span className="checkbox-tile">
                    <span className="checkbox-icon">
                      <img src={option.imageSrc} alt={option.altText} />
                      {/* {console.log(option?.altText)} */}
                    </span>
                  </span>
                  <div className="text-center">{option?.label}</div>
                </label>
              </div>
              })}
           
            </div>
            
          </div>

          <TextArea
            label="Description"
            defaultValue=" I am looking for a room with roommate"
            {...register("description" , {required : "Description is required"})} 
            errors={errors?.description}
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

export default NeedRoommate;
