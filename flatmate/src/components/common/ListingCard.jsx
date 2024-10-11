import React from "react";
import { MdDelete, MdLocationPin, MdOutlineMessage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setListingInfo } from "../../redux/slices/listings";
import { deleteListing } from "../../services/operations/listings";
import Avatar from "../../assets/avatar.png";
import { createChat } from "../../services/operations/chats";

function ListingCard({ listing }) {
  console.log({ listing });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);
  return (
    <div
      className=" h-[280px]  grid-rows-[85%_15%] shadow-md cursor-pointer w-full grid grid-cols-[40%_60%] lg:grid-cols-[30%_70%] min-width-[800px] gap-2  border-2 rounded-lg overflow-hidden hover:scale-105 transition-all duration-200"
      onClick={() => {
        dispatch(setListingInfo(listing));
        navigate("/listing-info");
      }}
    >
      <section className="w-full ">
        <img
          src={listing.user.profilePicture || Avatar}
          alt=""
          className=" h-full w-full object-cover "
        />
      </section>
      <section className="p-3   border-b-2 border-dashed relative  ">
        <div className="mb-2">
          <h1 className="text-2xl font-[500]">{listing.user.name}</h1>
          <p className="capitalize flex listings-center gap-2 text-gray-400">
            <MdLocationPin />
            {listing.location}
          </p>
        </div>

        <div className=" grid lg:grid-cols-[30%_70%]  gap-y-2     ">
          <div className="">
            <h3 className="text-xs font-[400] text-gray-400">Rent</h3>
            <p className="font-[500] ">{listing.price}</p>
          </div>

          <div className="flex justify-between gap-2 pr-3   ">
            <div>
              <h3 className="text-xs font-[400] text-gray-400">Looking For</h3>
              <p className="font-[500] ">{listing.type}</p>
            </div>
            <div>
              <h3 className="text-xs font-[400] text-gray-400">Looking For</h3>
              <p className="font-[500] ">{listing.lookingFor}</p>
            </div>
          </div>
        </div>

        {/* <div className="col-span-2 flex justify-end p-2 pr-3 pb-0  ">
<MdMessage className="text-2xl text-gray-400" />
</div> */}
        <p className="absolute bottom-4 text-right w-full right-7 text-gray-500 text-sm">
          <span className="font-bold mr-2">Posted on:</span>
          {new Date(listing.createdAt).toDateString()}{" "}
        </p>
      </section>
      <section className="col-span-2 flex  justify-end pb-4  px-4 ">
        {listing.user._id !== user?._id && (
          <MdOutlineMessage
            className="text-2xl  text-green-400"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(createChat(listing.user._id, token, navigate));
              // navigate("/all/chats");
            }}
          />
        )}
        {listing.user._id === user?._id && (
          <MdDelete
            className="text-2xl text-red-400"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteListing(listing._id, token));
            }}
          />
        )}
      </section>
    </div>
  );
}

export default ListingCard;
