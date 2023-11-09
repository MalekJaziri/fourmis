import buildingCategoryModel from '../models/buildingCategoryModel.js'

export const createBuildingCategories = (req, res) => {
     buildingCategoryModel.create({
        name: req.body.name,
        image: req.body.image,
       
    })
   .then((buildingCategory) => {
       
   
    res.status(201).json({
        buildingCategory: {
            
            name: buildingCategory.name,
            image: buildingCategory.image,
            
            
        },
        
    })
    console.log(buildingCategory)
       
   }) 
   .catch((err) => {
       res.status(400).json({error: err.message})
   })
   
   
}

export const getBuildingCategories = async (req, res) => {
    const categorybuildings = await buildingCategoryModel.find()
    
    res.status(200).json(categorybuildings)
   
}



export const deleteBuildingCategory = (req, res) => {
    
    const id = req.params.id;
    
    buildingCategoryModel.deleteOne({_id:id})
        .then(() =>{
         res.status(204).send()
        })
        .catch((err) => res.status(400).send(err.message))

   
}
