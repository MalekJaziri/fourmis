import React, { useState, useEffect } from 'react';
import {SelectPhoto} from '../selectPhoto/SelectPhoto.js';
import {userGetPhoto, } from '../../helpers/backend_helper.js'
import {BASE_URL} from '../../helpers/routes.js'


export function CreateQueen({ onQueenCreation }) {
  const [queenName, setQueenName] = useState('');
  const [selectedQueenPhoto, setSelectedQueenPhoto] = useState('');
  
   const [photoList, setPhotoList] = useState([]);
   
   
   
   
    useEffect(() => {
    // Effectuez une requête API pour obtenir la liste des noms de fichiers d'images
    // dans le répertoire backend/public/images/photoProfil
    // Assurez-vous que votre backend fournit ces données via une API.

    // Exemple de requête fictive à des fins d'illustration :
    userGetPhoto("fourmis")
    
      .then(
        data => {
            setPhotoList(data)
            console.log(data)
        }
        )
    .catch(err => {
        console.log(err)
      })
      
      
  }, []);

    const handleNameChange = (e) =>{
        setQueenName(e.target.value)
    }
    
    const handleCategoryImageSelect = (image) => {
        const imageUrl = `${BASE_URL}/images/photoProfil/${image}`;
        console.log(imageUrl)
        setSelectedQueenPhoto(imageUrl);
    };
    
    
    const handelQueenSetting = () => {
        console.log(queenName,selectedQueenPhoto)
        onQueenCreation(queenName, selectedQueenPhoto);
    }
    

  return (
    <div>
      <h2>Sélectionnez un nom et une photo pour la reine :</h2>
      <input
        type="text"
        placeholder="Nom de la reine"
        value={queenName}
        onChange={(handleNameChange)}
      />
      <SelectPhoto
          photoList={photoList}
          subfolder="fourmis" // Spécifiez le sous-dossier
          text="Choisissez un avatar pour Votre Reine" // Personnalisez le texte <h2> si nécessaire
          onImageSelect={handleCategoryImageSelect}
        />
      <button
        onClick={ handelQueenSetting}  
      >
        Créer la reine
      </button>
    </div>
  );
}


