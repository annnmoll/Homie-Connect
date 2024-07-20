import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 listings: null ,
 listingInfo : null 
}

export const listingSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setListings : (state , action) =>{ state.listings = action.payload} , 
    setListingInfo : (state , action)=>{ state.listingInfo = action.payload}
 
  },
})

// Action creators are generated for each case reducer function
export const { setListings , setListingInfo} = listingSlice.actions

export default listingSlice.reducer ; 