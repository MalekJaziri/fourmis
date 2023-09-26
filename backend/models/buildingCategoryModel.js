import mongoose from 'mongoose';


const buildingCategoryModel = new mongoose.Schema ({
    name:{
        type: String,
        required: true
    },
    
    image: [
        {
            type:String
        }
        ]
    
});


export default mongoose.model('buildingCategory', buildingCategoryModel);