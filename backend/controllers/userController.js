import userModel from '../models/userModel.js'

export const getUserById = async (req, res) => {
    //permet de trouver un user via son id
    const user = await userModel.findOne({_id: req.params.id})
    
    // on renvoi les infos du user sous format json
    res.status(200).json(user)
    
}


export const updateProfil = (req, res) => {
    
    const id = req.params.id
    
    userModel.findByIdAndUpdate(id, {
        pseudo: req.body.pseudo,
        surname: req.body.surname,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
        fourmilliere: req.body.fourmilliere
        
        
    }, {new:true} )
    .then((user) => {
        
        res.status(201).json({
            id: user.id,
            pseudo: user.pseudo,
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,
            image: req.body.image,
            fourmilliere: user.fourmilliere
        }) 
        
        
    })
    .catch((err) => res.status(400).send(err.message))
    
    
} // permet à l'utilisateur de mettre a jour son profil


export const deleteProfil = (req, res) => {
    const id = req.params.id
    
    userModel.deleteOne({_id:id})
        .then(() =>{
         res.status(204).send()
        })
        .catch((err) => res.status(400).send(err.message))

} // permet à l'utilisateur de supprimer son profil


