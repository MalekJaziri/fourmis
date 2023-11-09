import express from 'express'
import {getAllUsers, updateProfil, addimages} from '../controllers/adminController.js'
import {createBuildingCategories, getBuildingCategories , deleteBuildingCategory} from '../controllers/buildingCategoryController.js'

import {deleteProfil} from '../controllers/userController.js'
import {createLevel, getLevels, deleteLevel} from '../controllers/levelController.js'

import {getPhotoList} from '../controllers/photoController.js '

import {createFourmilliere, getFourmilliereByOwner, getFourmilliereById, deleteFourmilliere} from '../controllers/fourmilliereControler.js'



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
router.get("/get-building-categories", getBuildingCategories)
router.delete("/delete-building-categories/:id", deleteBuildingCategory)


//gestion de niveux
router.post("/create-level", createLevel)
router.get("/get-levels", getLevels)
router.delete("/delete-levels/:id", deleteLevel )



router.get("/get-photo-list/:subfolder", getPhotoList)



router.get("/get-fourmilliere-by-owner" , getFourmilliereByOwner )


router.get("/get-fourmilliere/:id", getFourmilliereById);

export default router