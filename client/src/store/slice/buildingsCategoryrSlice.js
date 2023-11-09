import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  error: null,
};

export const buildingCategorySlice = createSlice({
  name: 'buildingCategory',
  initialState,
  reducers: {
    addBuildingCategory: (state, action) => {
      return {
        ...state,
        categories: [...state.categories, action.payload],
        error: null,
      };
    },
    setBuildingCategories: (state, action) => {
      return {
        ...state,
        categories: action.payload,
        error: null,
      };
    },
    deleteBuildingCategory: (state, action) => {
      return {
        ...state,
        categories: state.categories.filter(category => category._id !== action.payload),
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

export const {
  addBuildingCategory,
  setBuildingCategories,
  deleteBuildingCategory,
  setError,
} = buildingCategorySlice.actions;

export default buildingCategorySlice.reducer;
