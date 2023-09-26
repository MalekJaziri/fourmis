import levelModel from '../models/levelModel.js'
import buildingCategoryModel from '../models/buildingCategoryModel.js'
import mongoose from 'mongoose';
import fs from 'fs'

export const createLevel = (req, res) => {
    
        const requirements = req.body.requirements || [];

        const requiredBuildingCategory = requirements.map((requirement) => ({
            category: mongoose.Types.ObjectId.createFromHexString(requirement.categoryId), // Convertissez en ObjectId
            quantity: parseInt(requirement.quantity), // Convertissez en valeur numérique
        }));
    
        
    
    
    levelModel.create({
        name: req.body.name,
        requiredWorkers: req.body.requiredWorkers,
        requiredSoldiers: req.body.requiredSoldiers,
        requiredBuildingCategory: requiredBuildingCategory,
    })
   .then((level) => {
       
    res.status(201).json({
        level: {
            id: level.id,
            name: level.name,
            requiredWorkers: level.requiredWorkers,
            requiredSoldiers: level.requiredSoldiers,
            requiredBuildingCategory: level.requiredBuildingCategory
            
            
        },
        
    })
    console.log(level)
       
   }) 
   .catch((err) => {
       res.status(400).json({error: err.message})
   })
} // creer les niveaux


export const getLevels = async (req, res) => {
    
    const levels = await levelModel.find()
    
    res.status(200).json(levels)
} // voir tous les utilisateurs!

