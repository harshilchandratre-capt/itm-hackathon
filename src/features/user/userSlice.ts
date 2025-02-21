import { authServices } from "@/services/authServices";
import dbServices from "@/services/dbServices";
import { User } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserSlice {
  user: User | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: UserSlice = {
  user: null,
  error: null,
  isLoading: false,
};

// Async thunks
export const getCurrentUser = createAsyncThunk<
  User,
  void,
  {
    rejectValue: string;
  }
>("user/getCurrentUser", async (_, thunkAPI) => {
  try {
    const user = await dbServices.getUserFromDb();
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

export const logOut = createAsyncThunk<
  void,
  void,
  {
    rejectValue: string;
  }
>("user/logOut", async (_, thunkAPI) => {
  try {
    await authServices.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "Logout failed"
    );
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getCurrentUser
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
      })
      // logout
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
