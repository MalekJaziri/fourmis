import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slice/userSlice.js'
import buildingCategoryReducer from './slice/buildingsCategoryrSlice.js'
import levelReducer from './slice/levelSlice.js'

import fourmilliereReducer from './slice/fourmilliereSlice.js'
import queenReducer from './slice/queenSlice.js'


export default configureStore({
  reducer: {
    user: userReducer,
    buildingCategory: buildingCategoryReducer,
    levels: levelReducer,
    fourmilliere: fourmilliereReducer,
    queen: queenReducer,
    
    
    
  }
})




