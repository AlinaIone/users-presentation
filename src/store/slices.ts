import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../services/userData';

interface FetchUsersParams {
  usersNr?: number;
  word?: string;
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ({usersNr, word}: FetchUsersParams) => {
    return getUsers(usersNr, word);
  })

interface UsersState {
    usersInitiallyFetched: [] | null;
    users: Record<string, any>[] | null;
    numberOfUsers: number 
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  const initialState: UsersState = {
    usersInitiallyFetched: null,
    users: null,
    numberOfUsers: 10,
    status: 'idle',
    error: null,
  };

export const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
      setFirstUsersList: (state, action) =>{
            state.usersInitiallyFetched = action.payload;
        },
      setUsersNumber: (state, action) =>{
            state.numberOfUsers = action.payload;
        },
      setUsersList: (state, action) =>{
            state.users = action.payload;
        }
    },
    // Needed to handle actions generated by the thunk(createAsyncThunk)
    extraReducers: (builder) => {
        builder
          .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = action.payload;
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Something went wrong';
          });
      },

})