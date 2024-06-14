import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user : null ,
  token : null ,
  loading : false 
}

export const userSlice = createSlice({
  name: 'suer',
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