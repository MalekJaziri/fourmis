import express from 'express';

import { getUserById, updateProfil, deleteProfil } from '../controllers/userController.js';
import {createAntManellement, createWorker, createSoldier, createStartingWorkers, createRandomAnts} from '../utiles/antGenerator.js';
import {createFourmilliere, getFourmilliereByOwner, getFourmilliereById, deleteFourmilliere} from '../controllers/fourmilliereControler.js'
import {createNursery, createBarrack} from '../controllers/buildingController.js'
import {increaseQueenHealth} from '../controllers/queenController.js'
import {getPhotoList} from '../controllers/photoController.js '
import { getBuildingCategories } from '../controllers/buildingCategoryController.js'
import { getLevels} from '../controllers/levelController.js'


const router = express.Router();

router.get("/:id", getUserById);
router.put("/update-profil/:id", updateProfil);
router.delete("/delete-profil/:id", deleteProfil);
router.get("/get-photo-list/:subfolder", getPhotoList)


//creation de fourmis 
router.post("/create-ant", createAntManellement);
router.post("/create-worker", createWorker);
router.post("/create-soldier", createSoldier);
router.post("/create-starting-workers", createStartingWorkers);
router.post("/create-random-ants", createRandomAnts);



//creation de la fourmilliere
router.post("/create-fourmilliere", createFourmilliere);
router.get("/get-fourmilliere-by-owner" , getFourmilliereByOwner );
router.get("/get-fourmilliere/:id", getFourmilliereById);
router.delete("/delete-fourmilliere/:id", deleteFourmilliere );


// creation de batiments
router.get("/get-building-categorie", getBuildingCategories)
router.post("/create-nursery", createNursery);
router.post("/create-barrack", createBarrack);


// santé de la reine
router.post("/increase-queen-health", increaseQueenHealth)


//niveaux
router.get("/get-level", getLevels)






export default router;