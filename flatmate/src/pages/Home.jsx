import React, { useEffect, useState } from 'react'
import Input from '../components/common/Input'
import { MdKeyboardArrowLeft, MdLocationOn } from "react-icons/md";
import Lottie1 from "../lotties/Lottie1.json"
import Lottie from 'react-lottie';
import Lottie2 from "../lotties/Lottie2.json"
import Lottie3 from "../lotties/Lottie3.json"
import Button from '../components/common/Button';
import { cities } from '../utils/cities';
import Select from "react-select";
import { useNavigate } from 'react-router-dom';


function Home() {
    const lottie1 = {
        loop: true,
        autoplay: true,
        animationData: Lottie1,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
      const lottie2 = {
        loop: true,
        autoplay: true,
        animationData: Lottie2,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
      const lottie3 = {
        loop: true,
        autoplay: true,
        animationData: Lottie3 , 
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };


      const [selectedCity, setSelectedCity] = useState(null);
      const navigate = useNavigate()
  
  return (
    <main className='w-full  '>
      
      {/* SECTION1 */}
      <section className='w-full px-2  min-h-[80vh] pt-10  flex flex-col gap-5   items-center'>
        <span className='bg-pink-200 rounded-xl px-5 py-[1px] mb-3'>Trusted & Loved by million users</span>
        <div className='text-center '>
        <h1 className='  text-3xl md:text-5xl font-[600] text-wrap text-center leading-[40px] md:leading-[60px] mb-1 '>Find compatible Flatmates<br />Rooms and PGs</h1>
        <span className='text-gray-400 text-sm'>Share your room with right roommates</span>
        </div>
        <div className=" w-full  flex flex-col items-center justify-center px-3">
       
        <Select
              isSearchable={true}
              defaultValue={selectedCity}
              onChange={(e)=>{ setSelectedCity(e); navigate(`/all/listing/${e.value}`)}}
              options={cities}
              placeholder="Select City"
              className="mb-2 w-full max-w-lg  "
              required

              //   {...register("city" , {required : "City is required "})}
            />
        <span className='text-sm text-gray-500'>Top Cities : Delhi, Gurgaon, Banglore</span>
        </div>
        <Lottie 
	    options={lottie1}
        height={ "auto"  }
        
        style={{objectFit : "contain",  maxWidth: "500px" }}
      />
      </section>


      {/* SECTION2 */}
      <section className="w-full min-h-[70vh] py-16  px-5  bg-[var(--footer-bg)] flex flex-col gap-x-10 md:flex-row items-center justify-center">
        <div className='flex flex-col gap-4 h-full px-5     '>
            <h1 className='text-3xl font-[650] leading[70px] mb-5  '>Getting Rental Agreement <br />made easy, quick and <br /> affordable</h1>
            <span className='font-[200] mb-5 '>Lowest Price Guaranteed!!Create your rental<br />agreement online in minutes</span>
            <Button text={`Create Now `} className="!w-fit max-md:mx-auto"  ></Button>
        </div>
        <div className='h-full'>
        <Lottie 
	    options={lottie2}
       style={{objectFit : "contain", maxWidth: "500px" }}

      />

        </div>
      </section>

      {/* Section3 */}
      <section className='w-full min-h-[70vh] py-16  px-5 gap-x-10  flex flex-col md:flex-row items-center justify-center'>
      <div className='flex flex-col gap-4 h-full px-5     '>
            <h1 className='text-3xl font-[650] leading[70px] mb-5  '>Connect with us from<br />anywhere </h1>
            <span className='font-[200] mb-5 '>Access our website on laptop  or <br /> your  mobile  phone</span>
            <Button text={`Create Now `} className="!w-fit max-md:mx-auto"  ></Button>
        </div>
        <div className='h-full px-5'>
        <Lottie 
	    options={lottie3}
        style={{objectFit : "contain",  maxWidth: "500px" }}

      /> 
      </div>
      </section>
      
    </main>
  )
}

export default Home
