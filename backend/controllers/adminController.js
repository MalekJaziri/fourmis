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



export const addimages = (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, function (err, fields, files) {
        if (err) {
            console.error("Erreur lors de l'analyse du formulaire :", err);
            res.status(500).json({ error: "Erreur lors de l'analyse du formulaire" });
            return;
        }
        
        const subfolder = fields.subfolder
        console.log(subfolder)

        const selectedFolder = `public/images/${subfolder}`; // Utilisez un dossier par défaut si aucun n'est sélectionné`
        console.log(selectedFolder)

        let oldpath = files["file"][0].filepath;
        let newpath = selectedFolder + '/' + files["file"][0].originalFilename;

        fs.copyFile(oldpath, newpath, function (err) {
            if (err) {
                console.error("Erreur lors de la copie du fichier :", err);
                res.status(500).json({ error: "Erreur lors de la copie du fichier" });
            } else {
                // Le fichier a été copié avec succès, renvoyer une confirmation
                res.status(200).json({ message: "Fichier téléchargé avec succès" });
            }
        });
    });
};
