import mongoose from 'mongoose';


const fourmilliereModel = new mongoose.Schema ({
    name:{
        type: String,
        required: [true, 'Nommer votre fourmilliere est obligatoire'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    queen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Queen',
      required: true
    },
    workers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ant',
          required: true
        }
    ],
    soldiers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ant',
          required: true
        }
    ],
    building: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Building',
          required: true
        }
    ],
    
    
    
    
});










export default mongoose.model('Fourmilliere', fourmilliereModel);