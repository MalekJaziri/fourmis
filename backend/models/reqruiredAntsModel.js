import mongoose from 'mongoose';

const requiredAntsModel = new mongoose.Schema ({
    
    
    workersRequiredForNursery: {
        type: Number,
        default: 20
    },
    soldiersRequiredForBarrack: {
        type: Number,
        default: 20
    },
    fourmilliere: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Fourmilliere',
          required: true
        }
    
    
});


export default mongoose.model('RequiredAnts', requiredAntsModel);