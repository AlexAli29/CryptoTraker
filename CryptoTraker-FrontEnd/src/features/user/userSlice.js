import { createSlice, } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userId: null, username: null, email: null, role: null, coins: null },
  reducers: {
    setProfile: (state, action) => {
      const { userId, username, email, role, coins } = action.payload.data;

      state.userId = userId;
      state.username = username;
      state.email = email;
      state.role = role;
      state.coins = coins ? coins.split(' ') : [];

    },
    setCoins: (state, action) => {
      const { data } = action.payload
      
      state.coins = data;
     
    }
  }
})

export const { setProfile, setCoins } = userSlice.actions;

export const selectCurrentUser = (state) => state.user;

export default userSlice.reducer;

