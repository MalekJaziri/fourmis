import mongoose from 'mongoose';
import fourmilliereModel from './fourmilliereModel.js'


const buildingModel = new mongoose.Schema ({
    
    fourmilliere: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Fourmilliere',
          required: true
        }
    ,
    category:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buildingCategory',
        required: true 
    },
   
    status:{ 
        type: String,
        enum: ['occupé', 'libre'],
        default: 'libre', 
        
    },
    
    
});


buildingModel.post('save', async function (doc) {
    // doc représente le bâtiment qui vient d'être créé
    if (doc.fourmilliere) {
        // Mettez à jour la fourmillière associée
        await fourmilliereModel.findByIdAndUpdate(doc.fourmilliere, {
            $addToSet: { building: doc._id },
        });
    }
});

export default mongoose.model('Building', buildingModel);