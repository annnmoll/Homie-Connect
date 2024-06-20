import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))  :null ,
  token : document.cookie ? document.cookie.split("=")[1] : null,
  loading : false 
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : (state , action) =>{} , 
    setToken : (state , action) =>{} ,
    setLoading : (state , action) =>{},
    
  },
})

// Action creators are generated for each case reducer function
export const { setUser , setLoading , setToken } = userSlice.actions

export default userSlice.reducer ; 