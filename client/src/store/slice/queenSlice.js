import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "",
  laying: "",
  health: "",
  fourmilliere: "",
  image: "",
  error: null,
};

export const queenSlice = createSlice({
  name: 'queen',
  initialState,
  reducers: {
    addQueen: (state, action) => {
      return {
        ...state,
        _id: action.payload._id,
        name: action.payload.name,
        laying: action.payload.laying,
        health: action.payload.health,
        fourmilliere: action.payload.fourmilliere,
        image: action.payload.image,
        isLogged: true,
        error: null,
      };
    },
    updateQueen: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        laying: action.payload.laying,
        health: action.payload.health,
        fourmilliere: action.payload.fourmilliere,
        image: action.payload.image,
        isLogged: true,
        error: null,
      };
    },
    deleteQueen: (state) => {
      return {
        ...state,
        queen: null,
        error: null,
      };
    },
    setError: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const { addQueen, updateQueen, deleteQueen, setError } = queenSlice.actions;

export default queenSlice.reducer;
