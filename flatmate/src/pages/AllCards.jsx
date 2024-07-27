import React, { useEffect, useState } from "react";
import {
  MdDelete,
  MdHome,
  MdLocationPin,
  MdOutlineMessage,
  MdPeople,
  MdVapingRooms,
  MdViewAgenda,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteListing, getListings } from "../services/operations/listings";
import Avatar from "../assets/avatar.png";
import { cities } from "../utils/cities";
import Select from "react-select";
import NoResults from "../lotties/No-Result.json";
import Lottie from "react-lottie";
import { setListingInfo } from "../redux/slices/listings";

const lottie1 = {
  loop: true,
  autoplay: true,
  animationData: NoResults,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function AllCards() {
  const { listings } = useSelector((state) => state.listings);
  const {user , token} = useSelector((state => state.user))
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const locationParam= queryParams.get('location');
  const idParam= queryParams.get('id');
  const [filter, setFilter] = useState("All");
  const [filteredListings, setFilteredListings] = useState(listings);

  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getListings(locationParam , idParam ));
  }, [location, dispatch]);

  useEffect(() => {
    if (filter === "All") {
      setFilteredListings(listings);
    } else if (filter === "Rooms") {
      const filtered = listings.filter((item) => item.type === "Roommate");
      setFilteredListings(filtered);
    } else {
      const filtered = listings.filter((item) => item.type === "Room");
      setFilteredListings(filtered);
    }
  }, [filter, listings]);

  return (
    <div className="w-full min-h-[80vh]">
      {/* Top Filters Header */}

      <div className="w-full   md:text-lg border-b-2 flex justify-between items-center max-w-7xl px-5 mx-auto max-sm:flex-col-reverse max-sm:p-4 gap-y-3 ">
      { !idParam && <div className="max-sm:hidden ">
          {/* <Input placeholder="Search Places" className="py-1 px-3" labelClassName="!m-0 !p-0" /> */}
          <Select
            isSearchable={true}
            defaultValue={selectedCity}
            onChange={(e) => {
              setSelectedCity(e);
              navigate(`/all/listing/?location=${e.value}`);
            }}
            options={cities}
            placeholder="Select City"
            className=" ml-3 w-[200px]  "
            required

            //   {...register("city" , {required : "City is required "})}
          />
          {/* <Select /> */}
        </div>}
        <form
          onChange={(e) => setFilter(e.target.value)}
          className="  flex items-center justify-between gap-2 px-3  text-md mt-2  "
        >
          <section>
            <input
              type="radio"
              id="all"
              name="filter"
              value="All"
              className="hidden peer"
              required
              defaultChecked
            />
            <label
              htmlFor="all"
              className="inline-flex items-center justify-between w-full rounded-lg rounded-b-none  text-gray-500 bg-white peer-checked:border-b-2 border-b-gray-200 px-2 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:scale-[1.05] peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center p-2 ">
                <MdViewAgenda className=" text-xl md:text-3xl" />
                <div className="text-nowrap">All Listings</div>
              </div>
            </label>
          </section>

          <section>
            <input
              type="radio"
              id="rooms"
              name="filter"
              value="Rooms"
              className="hidden peer"
              required
              // {...register("filter")}
            />
            <label
              htmlFor="rooms"
              className="inline-flex rounded-lg rounded-b-none items-center justify-between w-full  text-gray-500 bg-white peer-checked:border-b-2 border-b-gray-200 px-2 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:scale-[1.05] peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center p-2">
                <MdHome className=" text-xl md:text-3xl" />
                <div>Rooms</div>
              </div>
            </label>
          </section> 

          <section>
            <input
              type="radio"
              id="roommates"
              name="filter"
              value="Roommates"
              className="hidden peer"
              required
            />
            <label
              htmlFor="roommates"
              className="inline-flex rounded-lg rounded-b-none items-center justify-between w-full  text-gray-500 bg-white peer-checked:border-b-2 border-b-gray-200 px-2 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:scale-[1.05] peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center p-2">
                <MdPeople className=" text-xl md:text-3xl" />
                <div>Roommates</div>
              </div>
            </label>
          </section>
        </form>
       
      </div>

      {filteredListings?.length > 0 && (
        <p className="text-center mt-5 text-2xl font-[600]">
          Here are some results for you!!
        </p>
      )}
      {filteredListings?.length > 0 && (
        <div className="w-full mx-auto grid grid-cols-1  lg:grid-cols-2 gap-5 text-nowrap p-5 py-5 pb-14  mt-5 max-w-[1200px]  ">
          {filteredListings?.map((item, i) => (
            <div
              className=" h-[280px] grid-rows-[85%_15%] shadow-md cursor-pointer w-full grid grid-cols-[40%_60%] lg:grid-cols-[30%_70%] min-width-[800px] gap-2  border-2 rounded-lg overflow-hidden hover:scale-105 transition-all duration-200"
              key={i}
              onClick={()=> { dispatch(setListingInfo(item));  navigate("/listing-info")}}
            >
              <section className="w-full ">
                <img
                  src={item.user.profilePicture || Avatar} alt=""
                  className=" h-full w-full object-cover "
                />
              </section>
              <section className="p-3   border-b-2 border-dashed ">
                <div className="mb-2">
                  <h1 className="text-2xl font-[500]">{item.user.name}</h1>
                  <p className="capitalize flex items-center gap-2 text-gray-400">
                    <MdLocationPin />
                    {item.location}
                  </p>
                </div>

                <div className=" grid lg:grid-cols-[30%_70%]  gap-y-2     ">
                  <div className="">
                    <h3 className="text-xs font-[400] text-gray-400">Rent</h3>
                    <p className="font-[500] ">{item.price}</p>
                  </div>

                  <div className="flex justify-between gap-2 pr-3   ">
                    <div>
                      <h3 className="text-xs font-[400] text-gray-400">
                        Looking For
                      </h3>
                      <p className="font-[500] ">{item.type}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-[400] text-gray-400">
                        Looking For
                      </h3>
                      <p className="font-[500] ">{item.lookingFor}</p>
                    </div>
                  </div>
                </div>

                {/* <div className="col-span-2 flex justify-end p-2 pr-3 pb-0  ">
             <MdMessage className="text-2xl text-gray-400" />
          </div> */}
              </section>
              <section className="col-span-2 flex  justify-end pb-4  px-4 ">
               {item.user._id !== user?._id && <MdOutlineMessage className="text-2xl  text-gray-400" onClick={e => {  }} />}
                {item.user._id === user?._id && <MdDelete className="text-2xl text-red-500"  onClick={(e)=> {e.stopPropagation(); dispatch(deleteListing(item._id, token))}}/>  }
              </section>
            </div>
          ))}
        </div>
      )}

      {filteredListings?.length === 0 && (
        <div className="">
          <Lottie
            options={lottie1}
            // style="object-fit:contain; max-width:500px"
            style={{objectFit : "contain",  maxWidth: "500px" }}
          />

          <p className="text-center text-2xl px-4 -mt-20">
            No Result Found .
          </p>
        </div>
      )}
    </div>
  );
}

export default AllCards;
