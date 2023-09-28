import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { StatusType, User } from '../../types';

interface AuthState {
  currentUser?: User;
  status: StatusType;
}

const initialState: AuthState = {
  currentUser: undefined,
  status: 'DEFAULT'
};

axios.defaults.withCredentials = true;

export const checkAuthStatus = createAsyncThunk(
  '/authSlice/checkAuthStatus',
  async () => {
    const response = await axios.get('/users/auth/token');
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  '/authSlice/registerUser',
  async (credentials: { name: string; email: string; password: string }) => {
    const response = await axios.post('/users/auth/register', credentials);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  '/authSlice/loginUser',
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post('/users/auth/login', credentials);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  '/authSlice/logoutUser',
  async () => {
    const response = await axios.post('/users/auth/logout');
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.currentUser = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.status = 'ERROR';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'ERROR';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'ERROR';
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'SUCCESS';
        state.currentUser = undefined;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = 'ERROR';
      });
  }
});

export const selectCurrentUser = (state: RootState) =>
  state.authentication.currentUser;
export const selectIsAuthenticated = (state: RootState) =>
  state.authentication.currentUser !== undefined;
export const selectAuthStatus = (state: RootState) =>
  state.authentication.status;

export default authSlice.reducer;
