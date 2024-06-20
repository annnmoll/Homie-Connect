import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email : null ,
  preferences : null ,
  details : null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail : (state , action) =>{state.email = action.payload} , 
    setPreferences : (state , action) =>{state.preferences = action.payload} ,
    setDetails : (state , action) =>{ state.details = action.payload},
    
  },
})

// Action creators are generated for each case reducer function
export const { setEmail , setPreferences , setDetails } = authSlice.actions

export default authSlice.reducer ; 