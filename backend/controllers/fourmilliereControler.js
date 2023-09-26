import fourmilliereModel from '../models/fourmilliereModel.js'
import queenModel from '../models/queenModel.js'
import antModel from '../models/antModel.js'
import buildingModel from '../models/buildingModel.js'
import requiredAntsModel from '../models/reqruiredAntsModel.js'
import {createStartingWorkers} from '../utiles/antGenerator.js'

export const createFourmilliere = async (req,res) => {
    try {
        let queen = await queenModel.create({
            name: req.body.queen,
            
        })
        
        const data = await fourmilliereModel.create({
            name: req.body.name,
            owner: req.userId, // id du user
            queen: queen, // id de la queen
            })
            
        
        
        
        
        const init = await requiredAntsModel.create({
            fourmilliere: data.id
            
        })
        const starters = await createStartingWorkers(data._id)
        
        queen = await queenModel.findOneAndUpdate({_id: queen.id}, 
            {
                fourmilliere: data.id,
                laying: queen.laying + starters.length
                
            }
            
        );
        
        
        const fourmilliere = await fourmilliereModel.findById(data._id)
                .populate('owner')
                .populate('queen')
                .populate('workers')
                .populate('soldiers')
                .populate('building');
    
        // Nous renvoyons une réponse JSON au client avec les détails de l'utilisateur nouvellement enregistré
        res.status(201).json(fourmilliere)
        
        console.log(fourmilliere)
        
        
    } catch (err) {
               res.status(400).json({error: err.message})
        
    }
       
}


export const getFourmilliereById = async (req, res) => {
    const fourmilliere = await fourmilliereModel.findOne({_id: req.params.id})
        .populate('owner')
        .populate('queen')
        .populate('workers')
        .populate('soldiers')
        .populate('building');
    
    // on renvoi les infos du user sous format json
    res.status(200).json(fourmilliere);
};


export const deleteFourmilliere = (req, res) => {
    
    
    fourmilliereModel.deleteOne({_id:req.params.id})
        .then(() =>{
         res.status(204).send();
        })
        .catch((err) => res.status(400).send(err.message));

};
