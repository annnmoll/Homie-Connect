import React, { useEffect } from "react";
import Logo from "../components/common/Logo";
import Owl from "../assets/Owl.png";
import EarlyBird from "../assets/early-bird.png";
import Vegan from "../assets/vegan.png";
import NonAlcoholic from "../assets/non-alcholic.png"
import NonSmoker from "../assets/non-smoker.png"
import FitnessFreak from "../assets/fitness-freak.png"
import PetLover from "../assets/pet-lover.png"
import Sporty from "../assets/sporty.png"
import Button from "../components/common/Button";
import { useForm } from "react-hook-form";
import { setPreferences } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import { setToken , setUser } from "../redux/slices/userSlice";
 
function Preferences(){

    const {register , handleSubmit } = useForm()
    const {email , details} = useSelector(state => state.auth)
    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;
    
  useEffect(()=>{
    if(!email ){
      toast.error("Session Timeout");
      navigate("/signup")
    }
} , [])


    const submitHandler = async(data)=>{
        dispatch(setPreferences(data)) ; 
         try{
        const {password , gender , name , role , city , age  } = details
        const response = await axios.post("http://localhost:4000/createuser" , {
          email , password  , name , role , age , gender , preferences : data , city 
        })

        console.log(response.data)
        if(response.data.success){  toast.success("Created successfully");
      dispatch(setUser(response.data.user))
      dispatch(setToken(response.data.token))
   
      const expire= new Date(new Date().getTime() + (7*24*60*60*1000));
      document.cookie= `token=${response.data.token}; expires=${expire};`;
      localStorage.setItem("user", JSON.stringify(response.data.user));
   
    }
        
      }catch(error){
        toast.error(error.response.data.message)  ; 
      }
    }
  return (
    <div className="w-full min-h-screen flex items-center justify-start flex-col py-10 gap-y-10">
      <Logo />
      <form className="w-full flex flex-col items-center " onSubmit={handleSubmit(submitHandler)}>
        <fieldset class="checkbox-group ">
          <legend class="checkbox-group-legend text-3xl font-[600]">
            What type of flatmate do you like?
          </legend>
          <div class="checkbox ">
            <label class="checkbox-wrapper cursor-pointer flex flex-col gap-y-2">
              <input type="checkbox" class="checkbox-input" {...register("nightOwl")} />
              <span class="checkbox-tile">
                <span class="checkbox-icon">
                  <img src={Owl} />
                </span>
              </span>
              <div class="text-center">Night Owl</div>
            </label>
          </div>
          <div class="checkbox ">
            <label class="checkbox-wrapper ">
              <input type="checkbox" class="checkbox-input" {...register("earlyBird")} />
              <span class="checkbox-tile">
                <span class="checkbox-icon">
                  <img src={EarlyBird} />
                </span>
              </span>
              <div class="text-center mt-2 ">Early Bird</div>
            </label>
          </div>
          <div class="checkbox">
            <label class="checkbox-wrapper">
              <input type="checkbox" class="checkbox-input" {...register("vegan")}/>
              <span class="checkbox-tile">
                <span class="checkbox-icon">
                  <img src={Vegan} />
                </span>
              </span>
                <div class="text-center mt-2">Vegan</div>
            </label>
          </div>
          <div class="checkbox">
            <label class="checkbox-wrapper">
              <input type="checkbox" class="checkbox-input" {...register("nonAlcoholic")} />
              <span class="checkbox-tile">
                <span class="checkbox-icon">
                  <img src={NonAlcoholic} />
                </span>
              </span>
                <div class="text-center mt-2">Non-Alcoholic</div>
            </label>
          </div>
          <div class="checkbox">
            <label class="checkbox-wrapper">
              <input type="checkbox" class="checkbox-input" {...register("nonSmoker")} />
              <span class="checkbox-tile">
                <span class="checkbox-icon">
                  <img src={NonSmoker}/>
                </span>
              </span>
                <div class=" text-center mt-2">Non-Smoker</div>
            </label>
          </div>
          <div class="checkbox">
            <label class="checkbox-wrapper">
              <input type="checkbox" class="checkbox-input" {...register("fitnessFreak")} />
              <span class="checkbox-tile">
                <span class="checkbox-icon">
                    <img src={FitnessFreak}/>
                </span>
              </span>
                <div class="text-center mt-2">Fitness Freak</div>
            </label>
          </div>
          <div class="checkbox">
            <label class="checkbox-wrapper">
              <input type="checkbox" class="checkbox-input" {...register("petLover")} />
              <span class="checkbox-tile">
                <span class="checkbox-icon">
                  <img src={PetLover} />
                </span>
              </span>
                <div class="text-center mt-2 ">Pet Lover</div>
            </label>
          </div>
          <div class="checkbox">
            <label class="checkbox-wrapper">
              <input type="checkbox" class="checkbox-input" {...register("sporty")}/>
              <span class="checkbox-tile">
                <span class="checkbox-icon">
                  <img src={Sporty} />
                </span>
              </span>
                <div class="text-center mt-2 ">Sporty</div>
            </label>
          </div>
          <br />
        </fieldset>
        <Button type="submit" text="Register" className="mt-14 mx-auto" />

      </form>
    </div>
  );
}

export default Preferences;
