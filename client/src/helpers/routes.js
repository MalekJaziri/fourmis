const BASE_URL = "http://malekjaziri.ide.3wa.io:3001";




// Route Auth
export const REGISTER = `${BASE_URL}/auth/register`;
export const LOGIN = `${BASE_URL}/auth/login`;
export const GET_USER_BY_TOKEN = `${BASE_URL}/auth/get-user-by-token`;





// Routes Admin//

// Gestion des utilisateurs et des profils
export const GET_ALL_USERS = `${BASE_URL}/admin/get-all-users`;
export const ADMIN_UPDATE_PROFIL = `${BASE_URL}/admin/update-profil/:id`;
export const ADMIN_DELETE_PROFIL = `${BASE_URL}/admin/delete-profil/:id`;

// Ajouter des images
export const ADD_IMAGES = `${BASE_URL}/admin/add-images`;

// Gestion de la fourmilière
export const CREATE_BUILDING_CATEGORIES = `${BASE_URL}/admin/create-building-categories`;

// Gestion des niveaux
export const CREATE_LEVEL = `${BASE_URL}/admin/create-level`;
export const GET_LEVELS = `${BASE_URL}/admin/get-levels`;





// Routes Utilisateur//

// Gestion de profil
export const GET_USER_BY_ID = `${BASE_URL}/user/:id`;
export const USER_UPDATE_PROFIL = `${BASE_URL}/user/update-profil`;
export const USER_DELETE_PROFIL = `${BASE_URL}/user/delete-profil`;

// Création de fourmis
export const CREATE_STARTING_WORKERS = `${BASE_URL}/user/create-starting-workers`;
export const CREATE_RANDOM_ANTS = `${BASE_URL}/user/create-random-ants`;

// Gestion de la fourmilière
export const CREATE_FOURMILLIERE = `${BASE_URL}/user/create-fourmilliere`;
export const GET_FOURMILLIERE_BY_ID = `${BASE_URL}/user/get-fourmilliere/:id`;
export const DELETE_FOURMILLIERE = `${BASE_URL}/user/delete-fourmilliere/:id`;

// Création de bâtiments
export const CREATE_NURSERY = `${BASE_URL}/user/create-nursery`;
export const CREATE_BARRACK = `${BASE_URL}/user/create-barrack`;

// Santé de la reine
export const INCREASE_QUEEN_HEALTH = `${BASE_URL}/user/increase-queen-health`;
