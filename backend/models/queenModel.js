import mongoose from 'mongoose';

const queenModel = new mongoose.Schema ({
    name:{
        type: String,
    },
    laying :{
        type: Number,
        default: 0
    },
    health :{
        type: Number,
        default: 0
    },
    fourmilliere: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Fourmilliere',
          
        }
});

export default mongoose.model('Queen', queenModel);