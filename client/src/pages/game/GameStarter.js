import {Footer} from '../../components/footer/Footer.js'
import {Header} from '../../components/header/Header.js'
import {Main} from '../../components/main/Main.js'
import {Nav} from '../../components/nav/Nav.js'

import {SelectPhoto} from '../../components/selectPhoto/SelectPhoto.js'
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {userGetPhoto, createFourmilliere, createStartingWorker, putUserUpdateProfil, getFourmilliere} from '../../helpers/backend_helper.js'


import { addQueen, updateQueen, deleteQueen } from '../../store/slice/queenSlice.js';


import { updateUser,  } from '../../store/slice/userSlice.js';
import {  addFourmilliere, updateFourmilliere, deleteFourmilliere } from '../../store/slice/fourmilliereSlice.js'


import {CreateQueen} from '../../components/createQueen/CreateQueen.js'

import { ConfirmationPop } from '../../components/ConfirmationPop/ConfirmationPop.js';

import { useNavigate } from "react-router-dom";

import './GameStarter.scss'




export function GameStarter () {
    
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
   const [fourmiliereName, setFourmiliereName] = useState('');
   const [isQueenSelectionVisible, setIsQueenSelectionVisible] = useState(false);
   const [showConfirmation, setShowConfirmation] = useState(false);
   const [queenName, setQueenName] = useState('');
   const [queenPhoto, setQueenPhoto] = useState('');
   const [queenData, setQueenData] = useState({ name: '', photo: '' });
   
   
   
   


   const user = useSelector((state) => state.user);
  
  
  const owner= user._id
   
   useEffect(() => {
    console.log(user);
  }, [user]);
   
   
   const handleFourmiliereNameChange = (e) => {
    setFourmiliereName(e.target.value);
    console.log(fourmiliereName)
  };
  
  
   
   const handleFourmiliereCreation = () => {
    if (fourmiliereName) {
        console.log(fourmiliereName)
        setIsQueenSelectionVisible(true);
      ;
    }
  };
  
  const handleQueenCreation = (queenName, queenPhoto) => {
    console.log(queenPhoto);
    console.log(queenName)
    console.log(fourmiliereName);
    
    setQueenData({ name: queenName, photo: queenPhoto });
    
   
    dispatch(addQueen({ name: queenName, image: queenPhoto }));
    setIsQueenSelectionVisible(false);
    setShowConfirmation(true)
  };
  
  const handleConfirmation = async (confirmed) => {
    const requestData = {
      queen: queenData.name, // Utilisez le nom de la reine ici
      name: fourmiliereName, // Utilisez le nom de la fourmilière ici
      owner: owner, // Utilisez l'ID de l'utilisateur actif ici
      image: queenData.photo,
    };
    
    let fourmilliere = user.fourmilliere
    console.log(fourmilliere)
    if (confirmed) {
      // L'utilisateur a confirmé, procédez à la création de la fourmilière
      // Utilisez createFourmilliere du backend pour créer la fourmilière
      await createFourmilliere(requestData)
        .then((response) => {
          console.log('Fourmilière créée avec succès:', response);
          // Dispatchez une action Redux pour ajouter la fourmilière si nécessaire
           
           
           const newUser = {                 
             fourmilliere: response._id
            };
           console.log(fourmilliere)
           putUserUpdateProfil(owner, newUser)
           dispatch(updateUser(newUser))
          
          dispatch(addFourmilliere(response));
          dispatch(updateQueen(response.queen))
          
          navigate("/InGame");
          
        })
        .catch((error) => {
          console.error('Erreur lors de la création de la fourmilière:', error);
        });
      setIsQueenSelectionVisible(true);
    } else {
      // L'utilisateur a annulé, réinitialisez l'état
      setFourmiliereName('');
      setShowConfirmation(false);
    }
  };
  
  
  
  
  return (
    <>
      <Header />
      

      <Main>
        <div className="game-starter">
            <h2>C'est ici que tout commence!</h2>
            {isQueenSelectionVisible ? (
              <CreateQueen onQueenCreation={handleQueenCreation}  />
            ) : (
              <form className="game-form">
                <p>Choisissez un nom pour votre fourmilière :</p>
                <input
                  type="text"
                  placeholder="Nom de la fourmilière"
                  value={fourmiliereName}
                  onChange={handleFourmiliereNameChange}
                />
                <button onClick={handleFourmiliereCreation}>
                  Valider le nom de la fourmilière
                </button>
              </form>
            )}
            {showConfirmation && (
            <ConfirmationPop
              message={`Confirmez la création de la fourmilière "${fourmiliereName}" ?`}
              confirmText="Confirmer"
              cancelText="Annuler"
              onConfirm={() => handleConfirmation(true)}
              onCancel={() => handleConfirmation(false)}
            />
          )}
        </div> 
      </Main>

      <Footer />
    </>
  );
}