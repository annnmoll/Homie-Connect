import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { createChat } from "../services/operations/chats";
import Carousel from "../components/common/Carousel";
import Avatar from '../assets/avatar.png' ;

function ListingInfo() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { listingInfo } = useSelector((state) => state.listings);
  const { user } = useSelector((state) => state.user);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const preferences = Object.keys(listingInfo?.user?.preferences).filter(
    (key) => listingInfo?.user?.preferences[key]
  );
  const highlights =
    listingInfo?.roommateDetails &&
    Object.keys(listingInfo?.roommateDetails?.highlights).filter(
      (key) => listingInfo?.roommateDetails?.highlights[key]
    );

  const amenities =
    listingInfo?.roommateDetails &&
    Object.keys(listingInfo?.roommateDetails?.amenities).filter(
      (key) => listingInfo?.roommateDetails?.amenities[key]
    );

  const images = listingInfo?.roommateDetails?.images || [];

  const navigate = useNavigate();

  useEffect(() => {
    if (!listingInfo) {
      navigate("/");
    }
  }, [listingInfo]);
  return (
    <div className="w-screen h-full py-10 px-5 overflow-x-hidden  ">
      <div className="w-full h-full max-w-[1200px]  mx-auto justify-center  py-10 rounded-xl grid lg:grid-cols-[28%_68%] gap-3   gap-y-10 ">
        <div className=" h-fit border-2 flex flex-col gap-2  items-center justify-center  shadow-xl rounded-xl p-10 w-full  mx-auto ">
          <img
            src={listingInfo?.user?.profilePicture || Avatar}
            className="w-[250px] h-[250px] object-cover rounded-lg"
          />
          <p className="text-2xl font-[600] text-gray-600">
            {listingInfo?.user?.name}
          </p>
          {user._id != listingInfo?.user._id && (
            <div className=" w-full   grid grid-cols-2  gap-x-5 mt-5 ">
              <Button
                text="Chat"
                className="w-full max-w-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(createChat(listingInfo.user._id, token, navigate));
                  // navigate("/all/chats");
                }}
              >
                Chat
              </Button>

              <a href={`tel:${listingInfo?.user?.number}`}>
                <Button
                  text="Call"
                  className="w-full max-w-xs place-self-start"
                >
                  Call
                </Button>
              </a>
            </div>
          )}
        </div>

        <div className=" flex flex-col gap-2    shadow-xl border-2 rounded-xl p-5 lg:p-10 ">
          {/* Location */}
          <div className="text-left border-b-2 pb-5  px-5 ">
            <h2 className="text-2xl   font-[600]">Location</h2>
            <div className="flex gap-2 text-xl  items-center mt-3 text-gray-500 ">
              <MdLocationPin className="" />
              <p className="capitalize  font-[400] ">{listingInfo?.location}</p>
            </div>
          </div>
          {/* Basic Info */}
          <div className="text-left border-b-2 py-5  px-5 ">
            <h2 className="text-2xl  font-[600]">Basic Info</h2>
            <div className="flex justify-between items-center mt-3  flex-wrap gap-x-8 gap-y-3  ">
              <div>
                <h3 className="text-lg font-[500] text-gray-500">Gender</h3>
                <p className="font-[500]">{listingInfo?.user?.gender}</p>
              </div>
              <div>
                <h3 className="text-lg font-[500] text-gray-500">
                  Approx Rent
                </h3>
                <p className="font-[500]">{listingInfo?.price}</p>
              </div>
              <div>
                <h3 className="text-lg font-[500] text-gray-500">Occupancy</h3>
                <p className="font-[500]">{listingInfo?.occupancy}</p>
              </div>
              <div>
                <h3 className="text-lg font-[500] text-gray-500">
                  Looking For{" "}
                </h3>
                <p className="font-[500]">{listingInfo?.lookingFor}</p>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="text-left border-b-2 py-5  px-5 ">
            <h2 className="text-2xl  font-[600]">Preferences</h2>
            <div className="flex items-center  mt-5  flex-wrap gap-3  ">
              {preferences?.map((preference, i) => (
                <div className="rounded-2xl   bg-gray-200  px-5 py-1 " key={i}>
                  <p className="capitalize ">{preference}</p>
                </div>
              ))}
            </div>
          </div>

          {listingInfo?.roommateDetails &&
            listingInfo?.roommateDetails.images && (
              <div className="text-left border-b-2 py-5  px-5 ">
                <h2 className="text-2xl  font-[600]">Images</h2>
                <div className="flex items-center  mt-5  flex-wrap gap-3  ">
                  {listingInfo?.roommateDetails?.images.map((image, i) => (
                    <div
                      className="rounded-2xl cursor-pointer "
                      key={i}
                      onClick={() => setSelectedIndex(i)}
                    >
                      <img src={image}></img>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {listingInfo?.roommateDetails && (
            <div>
              <div className="text-left border-b-2 py-5  px-5 ">
                <h2 className="text-2xl  font-[600]">Highlights</h2>
                <div className="flex items-center  mt-5  flex-wrap gap-3  ">
                  {highlights?.map((preference, i) => (
                    <div
                      className="rounded-2xl   bg-gray-200  px-5 py-1 "
                      key={i}
                    >
                      <p className="capitalize ">{preference}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-left border-b-2 py-5  px-5 ">
                <h2 className="text-2xl  font-[600]">Amenities</h2>
                <div className="flex items-center  mt-5  flex-wrap gap-3  ">
                  {amenities?.map((preference, i) => (
                    <div
                      className="rounded-2xl   bg-gray-200  px-5 py-1 "
                      key={i}
                    >
                      <p className="capitalize ">{preference}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="text-left border-b-2 py-5  px-5 ">
            <h2 className="text-2xl  font-[600]">Description</h2>
            <p className="mt-3 ">{listingInfo?.description}</p>
          </div>
        </div>
      </div>

      {selectedIndex > -1 && (
        <Carousel
          images={images}
          selectedImageIndex={selectedIndex}
          setSelectedImageIndex={setSelectedIndex}
        />
      )}
    </div>
  );
}

export default ListingInfo;
