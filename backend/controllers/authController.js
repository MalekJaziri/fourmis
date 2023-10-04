import fs from 'fs';
import jwt from "jsonwebtoken";

import userModel from '../models/userModel.js';

export const register = (req, res) => {
   
    
   userModel.create({
        pseudo: req.body.pseudo,
        surname: req.body.surname,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
    })
   .then((user) => {
       
    // creer token pour l'utilisateur via la fonction dans userModel   
    const jwt = user.createJWT();
    
    // Nous renvoyons une réponse JSON au client avec les détails de l'utilisateur nouvellement enregistré, sans le mdp pet le token JWT.
    res.status(201).json({
        user: {
            id: user.id,
            pseudo: user.pseudo,
            surname: user.surname,
            name: user.name,
            email: user.email
        },
        jwt
    })
    
       
   }) 
   .catch((err) => {
       res.status(400).json({error: err.message})
   })
   
   

} // fonction qui permet de s'enregistrer

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        // cherche le user dans la base de données (fineOne() est une fonction interne qui permet de trouver un en particulier) 
        // "await" parce qu'il doit attendre de trouver le user avant de passer a la suite
        const user = await userModel.findOne({email});
        
        // comparer le mdp du user via une fonction crée dans user model 
        user.comparePassword(password, async (err, isMatch) =>{
             if (err) throw err;
             
             // Si le mot de passe est correct (isMatch est vrai), 
             if (isMatch) {
                //   générer un nouveau token JWT pour la session en cours
                 const jwt = user.createJWT();
                 res.status(200).json({
                     message: "login successful",
                     user: {
                        id: user.id,
                        pseudo: user.pseudo,
                        surname: user.surname,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin
                            
                     },
                     jwt
                 });
             } else {
                res.status(400).json({message: "User no found"});
            }
        });
        
    } catch (e) {
        res.status(400).json({message: "user not found"});
    }
}; // gerer l'athentification a la connexion


export const getUserByToken = async (req,res) =>{
    let token; 
    
   // Vérifier si le token est inclus dans les en-têtes d'autorisation.
    if (req.headers['authorization'] !== undefined) {
        token = req.headers['authorization'].split(' ')[1]
         
    }
    
    //  si pas de token, renvoyer un message d'erreur
    if (!token) {
        return res.status(403).send({message: "No token provided!"});
    }
    
    // il faut maintenant verifier le token, s'il existe ou s'il n'a pas perimé
    jwt.verify(token, process.env.KEY_JWT, async (err, decoded ) => {  
        if (err) {
            return res.status(403).send({message: "Unauthorized!"});
        }
        
        // une fois le jeton verifié, on cherche le user, via son id dans le cas present (l'id ) id etant celui de l'objet decodé
        const user = await userModel.findOne({_id: decoded.id})
        //  renvoie une réponse avec le statut HTTP 200 (OK) et un objet JSON contenant les informations de l'utilisateur extraites de la base de données.
        res.status(200).json({
            user: {
                id: user.id,
                        pseudo: user.pseudo,
                        surname: user.surname,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin
                // renvoyer user pour pouvoir, avoir tout le contenu du user
            }
        })
        
    })

    
} // récupérer les détails d'un utilisateur authentifié à partir d'un token JWT 
