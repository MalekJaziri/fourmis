import buildingModel from '../models/buildingModel.js'
import mongoose from 'mongoose';
import antModel from '../models/antModel.js';
import requiredAntsModel from '../models/reqruiredAntsModel.js'



export const createNursery = async (req, res) => {
    
    
    const workersRequiredForNursery = (await requiredAntsModel.findOne({fourmilliere: req.body.fourmilliere})).workersRequiredForNursery;
    
    const workerAnts = await antModel.find({ category: 'Worker',fourmilliere: req.body.fourmilliere });
    
    
    
    if (workerAnts.length >= workersRequiredForNursery) {
        try {
            const building = await buildingModel.create({
                category: req.body.category, //id de la categorie
                fourmilliere: req.body.fourmilliere //id de la fourmilliere
            });
            
            await requiredAntsModel.findOneAndUpdate({fourmilliere: req.body.fourmilliere}, {workersRequiredForNursery: workersRequiredForNursery + 20});          
        
            
            return res.status(201).json({
                nursery: {
                    category: building.category,
                    fourmilliere: building.fourmilliere
                },
            });
            
            
        } catch(err) {
            res.status(400).json({ error: err.message });
            
        }
            
    } else {
        return res.status(400).json({ error: 'Le nombre de travailleurs requis n\'est pas atteint.' });
    }
}; // construit des couveuses


export const createBarrack = async (req, res) => {
    
    
    const soldiersRequiredForBarrack = (await requiredAntsModel.findOne({fourmilliere: req.body.fourmilliere})).soldiersRequiredForBarrack;
    
    const workerSoldier = await antModel.find({ category: 'Soldier',fourmilliere: req.body.fourmilliere });
    
    
    
    if (workerSoldier.length >= soldiersRequiredForBarrack) {
        try {
            const building = await buildingModel.create({
                category: req.body.category, //id de la categorie
                fourmilliere: req.body.fourmilliere //id de la fourmilliere
            });
            
            await requiredAntsModel.findOneAndUpdate({fourmilliere: req.body.fourmilliere}, {soldiersRequiredForBarrack: soldiersRequiredForBarrack + 20});          
        
            
            return res.status(201).json({
                barrack: {
                    category: building.category,
                    fourmilliere: building.fourmilliere
                },
            });
            
            
        } catch(err) {
            res.status(400).json({ error: err.message });
            
        }
            
    } else {
        return res.status(400).json({ error: 'Le nombre de soldats requis n\'est pas atteint.' });
    }
}; // construit des casernes

