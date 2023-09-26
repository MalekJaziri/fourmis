import categoryBuildingModel from '../models/buildingCategoryModel.js'

export const createBuildingCategories = (req, res) => {
     categoryBuildingModel.create({
        name: req.body.name,
       
    })
   .then((buildingCategory) => {
       
   
    res.status(201).json({
        buildingCategory: {
            
            name: buildingCategory.name,
            
            
        },
        
    })
    console.log(buildingCategory)
       
   }) 
   .catch((err) => {
       res.status(400).json({error: err.message})
   })
   
   
}