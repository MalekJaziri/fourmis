import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  levels: [], // Tableau pour stocker les niveaux
  error: null,
};

export const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    addLevel: (state, action) => {
      return {
        ...state,
        levels: [...state.levels, action.payload], // Ajouter le nouveau niveau à la liste
        error: null,
      };
    },
    setLevels: (state, action) => {
      return {
        ...state,
        levels: action.payload, // Remplacer la liste des niveaux par celle reçue
        error: null,
      };
    },
    setError: (state, action) => {
      return {
        ...state,
        error: action.payload, // Gérer les erreurs
      };
    },
  },
});

export const { addLevel, setLevels, setError } = levelSlice.actions;


export default levelSlice.reducer;
