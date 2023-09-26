import userModel from '../models/userModel.js'


import fs from 'fs'
import formidable from "formidable";

export const getAllUsers = async (req, res) => {
    const users = await userModel.find()
    
    res.status(200).json(users)
} // voir tous les utilisateurs!


export const updateProfil = (req, res) => {
    
    const id = req.params.id
    
    userModel.findByIdAndUpdate(id, {
        pseudo: req.body.pseudo,
        
    }, {new:true} )
    .then((user) => {
        
        res.status(201).json({
            id: user.id,
            pseudo: user.pseudo,
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,
        }) 
        
        
    })
    .catch((err) => res.status(400).send(err.message))
    
    
} // permet à l'admin de modifier uniquement le pseudo d'un utilisateur



export const addimages = (req, res) =>{
    const form = formidable();
    form.parse(req, function (err, fields, files){
        
        console.log(fields)
        
        const selectedFolder = `public/images/${fields.folder[0]}` // Utilisez un dossier par défaut si aucun n'est sélectionné`
    
        let oldpath = files.image[0].filepath;
        let newpath = selectedFolder + '/' + files.image[0].originalFilename;
        
        console.log(oldpath)
        console.log(newpath)
        fs.copyFile(oldpath, newpath, function (err){
            if (err) throw err;
            
        })

    })
    
}
