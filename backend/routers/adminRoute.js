import express from 'express'
import {getAllUsers, updateProfil, addimages} from '../controllers/adminController.js'
import {createBuildingCategories} from '../controllers/buildingCategoryController.js'

import {deleteProfil} from '../controllers/userController.js'
import {createLevel, getLevels} from '../controllers/levelController.js'



import {createAnt, createWorker, createSoldier, createStartingWorkers} from '../utiles/antGenerator.js';



const router = express.Router()

router.post("/create-soldier", createSoldier);


// gestion des utilisateurs et des profils
router.get("/")
router.get("/get-all-users", getAllUsers)
router.put("/update-profil/:id", updateProfil);
router.delete("/delete-profil/:id", deleteProfil);


//add images
router.post("/add-images", addimages)



//gestion de la fourmillieres
router.post("/create-building-categories", createBuildingCategories)


//gestion de niveux
router.post("/create-level", createLevel)
router.get("/get-levels", getLevels)



export default router