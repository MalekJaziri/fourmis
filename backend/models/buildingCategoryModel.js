import mongoose from 'mongoose';


const categoryBuildingModel = new mongoose.Schema ({
    name:{
        type: String,
        required: true
    },
    
    image: 
        {
            type:String
        }
        
    
});


export default mongoose.model('buildingCategory', categoryBuildingModel);