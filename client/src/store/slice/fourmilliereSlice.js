import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name : "",
  owner: "",
  queen: "",
  workers: [],
  soldiers: [],
  building: [],

  error: null, // Add an error property if needed
};

export const fourmilliereSlice = createSlice({
  name: 'fourmilliere',
  initialState,
  reducers: {
    addFourmilliere: (state, action) => {
       return {
        ...state,
        _id: action.payload._id,
        name: action.payload.name,
        owner: action.payload.owner,
        queen: action.payload.queen,
        workers: action.payload.workers,
        soldiers: action.payload.soldiers,
        building: action.payload.building,
        
        error: null,
      };
    },
    updateFourmilliere: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        owner: action.payload.owner,
        queen: action.payload.queen,
        workers: action.payload.workers,
        soldiers: action.payload.soldiers,
        building: action.payload.building,
        
        error: null,
      };
    },
    deleteFourmilliere: (state) => {
      state.fourmilliere = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addFourmilliere, updateFourmilliere, deleteFourmilliere, setError } = fourmilliereSlice.actions;

export default fourmilliereSlice.reducer;
