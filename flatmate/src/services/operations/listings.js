import { apis } from "../apis"
import axios from "axios" 
import {setLoading} from "../../redux/slices/userSlice" 
import {toast} from "react-toastify" 
import { setListings } from "../../redux/slices/listings"



const {CREATE_LISTING, GET_LISTING_BY_LOCATION} = apis

export function createListing(data , token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
               console.log(CREATE_LISTING) ; 
            

        } catch (error) {
            console.log("Logout error", error.message);
            toast.error("Failed to logout");
        }
        dispatch(setLoading(false));
    };
}

export function getListingsByLocation(location){
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response =await  axios.get(GET_LISTING_BY_LOCATION +"/"+ location)
            console.log(response.data.listings) ; 
            dispatch(setListings(response.data.listings))    
            if(response.data.success){
            //   navigate("/details") ;
            
            }
            else{
                toast.error(response.data.message)
            }
            

        } catch (error) {
            console.log(error)
            console.log("Logout error", error.message);
            toast.error("Failed to get listings");
        }
        dispatch(setLoading(false));
    };
}

