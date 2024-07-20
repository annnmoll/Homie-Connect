import React from "react";
import Logo from "../components/common/Logo";
import { MdKeyboardArrowRight } from "react-icons/md";
import House from "../assets/realistic-house.png"
import Friends from "../assets/freinds.png"
import { useNavigate } from "react-router-dom";

function Listing() {
    const navigate = useNavigate()
  return <div className="w-full min-h-screen py-10">
    <div className="w-full flex flex-col gap-y-14 items-center ">
        <Logo />
        <div className="text-center  flex flex-col gap-y-4">
            <h1 className="text-3xl font-[500] ">Post your Requirement</h1>
            <div className="text-sm text-gray-500">Find your perfect roommate or room effortlessly. Just post your  requirement and let the match begin</div>
        </div>
 
        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-16 px-3 " >
            {/* Card 1 */}
            <div className="w-[14rem] h-[15rem] bg-[#FFD5F4] rounded-lg cursor-pointer p-4 overflow-hidden hover:scale-[110%] transition duration-[0.5s]" onClick={()=>{navigate("/listing/needroom")}}>
                <h2 className="text-lg  font-[600]">Need <br /> Room/Flat</h2>
                <span className="text-sm font-[400] flex items-center  " >with roommate {<MdKeyboardArrowRight className="text-lg mt-1" />} </span>
                
                    <img className="  flex "  src={House} alt=""/>
                
            </div>

            {/* Card2 */}
            <div  className="w-[14rem] h-[15rem]  rounded-lg cursor-pointer bg-[#FDEDAB] p-4 hover:scale-[110%] transition duration-[0.5s] " onClick={()=> navigate("/listing/needroommate")}>
                <h2 className="text-lg font-[600]">Need <br /> Roommate</h2>
                <span className="text-sm font-[400] flex items-center  " >for your room{<MdKeyboardArrowRight className="text-lg mt-1" />} </span>
                
                <img  src={Friends} alt=""/>
                
            </div>
        </div>
    </div>
    
  </div>;
}

export default Listing;
