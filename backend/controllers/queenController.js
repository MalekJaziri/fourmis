import fourmilliereModel from '../models/fourmilliereModel.js'
import queenModel from '../models/queenModel.js'
import {createRandomAnts} from '../utiles/antGenerator.js'




export const increaseQueenHealth = async (req, res) =>{
  try {
        const fourmilliere = await fourmilliereModel.findOne({ _id: req.body.fourmilliere })
            .populate('owner')
            .populate('queen')
            .populate('workers')
            .populate('soldiers')
            .populate('building');

        let queen = await queenModel.findOneAndUpdate(
            { fourmilliere: req.body.fourmilliere }, 
            { health: fourmilliere.queen.health += 50 }
        );

        // Vérifiez si la santé de la reine a atteint 100
        if (fourmilliere.queen.health >= 100) {
            const newAnts = await createRandomAnts(req.body.fourmilliere);

            await queenModel.findOneAndUpdate(
                { fourmilliere: req.body.fourmilliere },
                {
                    laying: fourmilliere.queen.laying + newAnts.length,
                    health: fourmilliere.queen.health = 0
                }, {new: true}
            );

            await fourmilliere.save();
        }

        res.status(201).json({ 
            message: 'Health increased successfully',
            queen: fourmilliere.queen,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }

    
}