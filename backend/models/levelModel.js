import mongoose from 'mongoose';


const levelModel = new mongoose.Schema ({
    name: {
      type: String,
      required: true,
      unique: true,
      message: 'Niveau exisantant, il faut changer le nom du nouveau niveau a creer ',
      match: /Niveau\s\d+/,

    },
    
    requiredCategoryBuilding: [
        {
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CategoryBuilding',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});








export default mongoose.model('Level', levelModel);