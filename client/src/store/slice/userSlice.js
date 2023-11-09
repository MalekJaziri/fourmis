import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pseudo: '',
  surname: '',
  name: '',
  email: '',
  isAdmin: false,
  isLogged: false,
  error: null,
  image: "",
  fourmilliere: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      return {
        ...state,
        _id: action.payload.id,
        pseudo: action.payload.pseudo,
        surname: action.payload.surname,
        name: action.payload.name,
        email: action.payload.email,
        isAdmin: action.payload.isAdmin,
        image: action.payload.image,
        fourmilliere: action.payload.fourmilliere,
        isLogged: true,
        error: null,
        
        
      };
    },
    updateUser: (state, action) => {
      return {
        ...state,
    ...action.payload,
        
      };
    },
    deleteUser: (state) => {
      return {
        initialState,
      };
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
