import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import { StorageKeys } from 'constant';

export const register = createAsyncThunk('auth/register', async (payload) => {
  //call API to register
  const { data } = await userApi.register(payload);
  return data;
});

export const login = createAsyncThunk('auth/login', async (payload) => {
  //call API to login
const data = await userApi.login(payload);

  const user = {
    name: data.name,
    id: data.id,
    token: data.token,
  
  }

 
  // //save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(user));

   return data;
});

const initialState = {
  modalIsOpen: false,
  current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || null,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalIsOpen = true;
    },
    closeModal: (state) => {
      state.modalIsOpen = false;
    },
    logout: (state) => {
      state.current = null;
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USER);
    },
    change: (state, action) => {
      state.current = action.payload;
      localStorage.setItem(StorageKeys.USER, JSON.stringify(action.payload));
    },
    refreshToken: (state, action) => {
      // sendToken
      state.current.token= action.payload;
      localStorage.setItem(StorageKeys.USER, JSON.stringify(action.payload));
    },
    addAddressId: (state, action) => {
      const user = {
        ...state.current,
        addressId: action.payload,
      }
      state.current = {...user};
      localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const user = {
        name: action.payload.name,
        id: action.payload.id,
        token: action.payload.token,
      }
      state.current = user;
    },
  },
});

export const { openModal, closeModal, logout, change, refreshToken, addAddressId } = userSlice.actions;

export default userSlice.reducer;
