import { apis } from "../apis";
import axios from "axios";
import { setLoading } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { setListings } from "../../redux/slices/listings";

const { CREATE_LISTING, GET_LISTING_BY_LOCATION, DELETE_LISTING } = apis;

export function createListing(formObj, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(CREATE_LISTING, formObj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setLoading(false));

        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      dispatch(setLoading(false));
    }
    dispatch(setLoading(false));
  };
}

export function getListings(location, id) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      let response;
      if (location && id) {
        response = await axios.get(
          GET_LISTING_BY_LOCATION + "?location=" + location + "?id=" + id
        );
      } else if (location) {
        response = await axios.get(
          GET_LISTING_BY_LOCATION + "?location=" + location
        );
      } else {
        response = await axios.get(GET_LISTING_BY_LOCATION + "?id=" + id);
      }
      console.log(response.data.listings);
      dispatch(setListings(response.data.listings));
      if (response.data.success) {
        //   navigate("/details") ;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("Logout error", error.message);
      toast.error("Failed to get listings");
    }
    dispatch(setLoading(false));
  };
}

export function deleteListing(id, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      let response;

      response = await axios.delete(DELETE_LISTING + "/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      if (response.data.success) {
        //   navigate("/details") ;
        dispatch(setListings(response.data.listings));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("Logout error", error.message);
      toast.error("Failed to get listings");
    }
    dispatch(setLoading(false));
  };
}
