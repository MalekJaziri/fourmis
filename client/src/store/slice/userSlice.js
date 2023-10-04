import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pseudo: '',
  surname: '',
  name: '',
  email: '',
  isAdmin: false,
  isLogged: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      return {
        ...state,
        id: action.payload.id,
        pseudo: action.payload.pseudo,
        surname: action.payload.surname,
        name: action.payload.name,
        email: action.payload.email,
        isAdmin: action.payload.isAdmin,
        isLogged: true,
        error: null,
      };
    },
    deleteUser: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
