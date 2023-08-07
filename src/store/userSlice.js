import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  userId: '',
  email: '',
  token: '',
  role: ''
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { userId, email, role, token } = action.payload;
      state.userId = userId 
      state.email = email
      state.role = role 
      state.token = token  
    },
    deleteUser: (state) => {
      state.userId = ''
      state.email = ''
      state.role = ''
      state.token = ''
    },
  },
})

export const { addUser, deleteUser } = userSlice.actions
export default userSlice.reducer