import mongoose from 'mongoose';
import fourmilliereModel from './fourmilliereModel.js'


const antModel = new mongoose.Schema ({
    
    category:{ 
        type: String,
        enum:['Worker', 'Soldier']
    },
    status: {
        type: String,
        enum: ['Travail', 'Repos'],  // enum fonctionnalité mongoose qui permet de verifier si la valeur de "status" est un element valide de l'array qui lui comporte les valeurs autorisés
        default: 'Repos',
    },
    fourmilliere: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Fourmilliere',
          required: true
        },
    image: 
        {
            type:String
        }
    
    
});

// Middleware pour antModel
antModel.post('save', async function (doc) {
    // doc représente l'entité (par exemple, le travailleur ou le soldat) qui vient d'être créée
    if (doc.fourmilliere) {
        if (doc.category === 'Worker') {
            // Mettez à jour la fourmillière associée en ajoutant le travailleur
            await fourmilliereModel.findByIdAndUpdate(doc.fourmilliere, {
                $addToSet: { workers: doc._id },
            });
        } else if (doc.category === 'Soldier') {
            // Mettez à jour la fourmillière associée en ajoutant le soldat
            await fourmilliereModel.findByIdAndUpdate(doc.fourmilliere, {
                $addToSet: { soldiers: doc._id },
            });
        }
    }
});



export default mongoose.model('Ant', antModel);