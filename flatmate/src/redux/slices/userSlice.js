import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))  :null ,
  // token : document.cookie ? document.cookie.split("=")[1] : null,
  token: localStorage.getItem("token") ?  localStorage.getItem("token") : null ,
  loading : false 
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : (state , action) =>{ state.user = action.payload} , 
    setToken : (state , action) =>{ state.token = action.payload} ,
    setLoading : (state , action) =>{ state.loading = action.payload},
    
  },
})

// Action creators are generated for each case reducer function
export const { setUser , setLoading , setToken } = userSlice.actions

export default userSlice.reducer ; 