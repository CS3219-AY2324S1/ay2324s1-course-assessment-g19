import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, store } from '../../store';
import { StatusType, User } from '../../types';
import { toast } from 'react-toastify';
import { socket } from '../../socket';

interface AuthState {
  currentUser?: User;
  status: StatusType;
  error?: string;
}

const initialState: AuthState = {
  currentUser: undefined,
  status: 'DEFAULT',
  error: undefined
};

axios.defaults.withCredentials = true;

export const checkAuthStatus = createAsyncThunk(
  '/authSlice/checkAuthStatus',
  async () => {
    const response = await axios.get('/user-api/auth/token');
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  '/authSlice/registerUser',
  async (credentials: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const response = await axios.post('/user-api/auth/register', credentials);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  '/authSlice/loginUser',
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post('/user-api/auth/login', credentials);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  '/authSlice/logoutUser',
  async () => {
    const response = await axios.post('/user-api/auth/logout');
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  '/profileSlice/updateUser',
  async (request: {
    id: string;
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
    confirmPassword: string | undefined;
  }) => {
    const { confirmPassword, ...requestWithoutConfirmPassword } = request;
    if (
      (request.password && !request.confirmPassword) ||
      (!request.password && request.confirmPassword)
    ) {
      throw new Error('Please fill out both password fields');
    } else if (request.password && request.confirmPassword) {
      if (request.password !== request.confirmPassword) {
        throw new Error('Passwords do not match');
      }
    }
    const response = await axios.put(
      '/user-api/user/',
      requestWithoutConfirmPassword
    );
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
        state.error = undefined;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.currentUser = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.status = 'ERROR';
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'LOADING';
        state.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'ERROR';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'LOADING';
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'ERROR';
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'LOADING';
        state.error = undefined;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'SUCCESS';
        state.currentUser = undefined;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'ERROR';
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'LOADING';
        state.error = undefined;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.currentUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'ERROR';
        state.error = action.error.message;
        toast.error(action.error.message);
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
