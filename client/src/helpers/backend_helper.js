import {post, get, put} from "./api_helper";

import {
  REGISTER,
  LOGIN,
  GET_USER_BY_TOKEN,
  GET_ALL_USERS,
  ADMIN_UPDATE_PROFIL,
  ADMIN_DELETE_PROFIL,
  ADD_IMAGES,
  CREATE_BUILDING_CATEGORIES,
  CREATE_LEVEL,
  GET_LEVELS,
  GET_USER_BY_ID,
  USER_UPDATE_PROFIL,
  USER_DELETE_PROFIL,
  CREATE_STARTING_WORKERS,
  CREATE_RANDOM_ANTS,
  CREATE_FOURMILLIERE,
  GET_FOURMILLIERE_BY_ID,
  DELETE_FOURMILLIERE,
  CREATE_NURSERY,
  CREATE_BARRACK,
  INCREASE_QUEEN_HEALTH,
} from './routes.js';

// Maintenant, vous pouvez utiliser ces constantes pour importer les fichiers nécessaires.


export const postLogin = (data) => post(LOGIN, data)

export const postRegister = (data) => post(REGISTER, data)

export const getVerifyUserByToken = () => get(GET_USER_BY_TOKEN)

export const putUserUpdateProfil = (id, data) => put(`${USER_UPDATE_PROFIL}/${id}`, data)