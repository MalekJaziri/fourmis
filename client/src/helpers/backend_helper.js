import {post, get, put, del, postImage} from "./api_helper";

import {
  REGISTER,
  LOGIN,
  GET_USER_BY_TOKEN,
  GET_ALL_USERS,
  ADMIN_UPDATE_PROFIL,
  ADMIN_DELETE_PROFIL,
  ADD_IMAGES,
  ADMIN_GET_PHOTO_LIST,
  USER_GET_PHOTO_LIST,
  CREATE_BUILDING_CATEGORIES,
  ADMIN_GET_BUILDING_CATEGORIES,
  USER_GET_BUILDING_CATEGORIES,
  DELETE_BUILDING_CATEGORY,
  CREATE_LEVEL,
  GET_LEVELS,
  USER_LEVELS,
  DELETE_LEVELS,
  GET_USER_BY_ID,
  USER_UPDATE_PROFIL,
  USER_DELETE_PROFIL,
  CREATE_STARTING_WORKERS,
  CREATE_RANDOM_ANTS,
  CREATE_FOURMILLIERE,
  GET_FOURMILLIERE_BY_OWNER,
  GET_FOURMILLIERE_BY_ID,
  DELETE_FOURMILLIERE,
  CREATE_NURSERY,
  CREATE_BARRACK,
  INCREASE_QUEEN_HEALTH,
} from './routes.js';

// Maintenant, vous pouvez utiliser ces constantes pour importer les fichiers nécessaires.


export const postLogin =  (data) =>  post(LOGIN, data)

export const postRegister = (data) => post(REGISTER, data)

export const getVerifyUserByToken = () => get(GET_USER_BY_TOKEN)

export const putUserUpdateProfil = (id, data) => put(`${USER_UPDATE_PROFIL}/${id}`, data)
export const delUserDeleteProfil = (id, data) => del(`${USER_DELETE_PROFIL}/${id}`, data)

export const putAdminUpdateUser = (id, data) => put(`${ADMIN_UPDATE_PROFIL}/${id}`, data)
export const delAdminDeleteProfil = (id, data) => del(`${ADMIN_DELETE_PROFIL}/${id}`, data)


export const getAllUsers = async () => await get(GET_ALL_USERS)

export const postAddImages =  (data) =>  postImage(ADD_IMAGES, data,  true)

export const getUserById = () => get(GET_USER_BY_ID)



export const postCreateBuildingCategory= (data) => post(CREATE_BUILDING_CATEGORIES, data)
export const getBuildingCategory = async () => await get(ADMIN_GET_BUILDING_CATEGORIES)
export const usergetBuildingCategory = async () => await get(USER_GET_BUILDING_CATEGORIES)



export const delBuildingCategory = (id, data) => del(`${DELETE_BUILDING_CATEGORY}/${id}`, data)

export const postCreateLevels = (data) => post(CREATE_LEVEL, data)
export const getLevels =  () =>  get(GET_LEVELS)
export const userLevels =  () =>  get(USER_LEVELS)
export const delLevels = (id, data) => del(`${DELETE_LEVELS}/${id}`, data)

export const userGetPhoto = (subfolder) => get(`${USER_GET_PHOTO_LIST}/${subfolder}`)
export const adminGetPhoto = (subfolder) => get(`${ADMIN_GET_PHOTO_LIST}/${subfolder}`)


export const createFourmilliere =  (data) =>   post(CREATE_FOURMILLIERE, data)
export const createStartingWorker =  () =>   post(CREATE_STARTING_WORKERS)

export const getFourmilliere = async (id) =>  await get(`${GET_FOURMILLIERE_BY_ID}/${id}`)


export const increaseQueenHealth =  (data) =>  post(INCREASE_QUEEN_HEALTH, data)

export const createNursery =  (data) =>  post(CREATE_NURSERY, data)
export const createBarrack =  (data) =>  post(CREATE_BARRACK, data)


