import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 listings: null
}

export const listingSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setListings : (state , action) =>{ state.listings = action.payload} , 
 
  },
})

// Action creators are generated for each case reducer function
export const { setListings} = listingSlice.actions

export default listingSlice.reducer ; 