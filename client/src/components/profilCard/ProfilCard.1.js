import React from "react";
import './ProfilCard.scss'
import { Link, useNavigate } from "react-router-dom";
import {LetteredAvatar} from "../lettredAvatar/LettredAvatar.js"
import {userGetPhoto} from '../../helpers/backend_helper.js'
import {SelectPhoto} from '../selectPhoto/SelectPhoto.js'
import { useState, useEffect } from "react";
import { updateUser, deleteUser } from "../../store/slice/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import {BASE_URL} from '../../helpers/routes.js'
import { putUserUpdateProfil, } from '../../helpers/backend_helper.js'
import { useParams, useLocation } from "react-router-dom";

export function ProfilCard() {
  
   const user = useSelector((state) => state.user);
    const location = useLocation();
  const { user: userProfile } = location.state;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = user._id
  
   const [photoList, setPhotoList] = useState([]);
   const [showSelectPhoto, setShowSelectPhoto] = useState(false);
   const [selectedProfilePhoto, setSelectedProfilePhoto] = useState(user.image || null);



useEffect(() => {
        console.log(userProfile);
    }, [userProfile]);
useEffect(() => {
    console.log(user);
    console.log(user.image);
  }, [user]);
  useEffect(() => {
    // Effectuez une requête API pour obtenir la liste des noms de fichiers d'images
    // dans le répertoire backend/public/images/photoProfil
    // Assurez-vous que votre backend fournit ces données via une API.

    // Exemple de requête fictive à des fins d'illustration :
    userGetPhoto("photoProfil")
    
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
  
   const handelImageSelect = async (image) => {
  // Construisez l'URL complet de l'image
  const imageUrl = `${BASE_URL}/images/photoProfil/${image}`;
  setSelectedProfilePhoto(imageUrl);

  // Mettre à jour l'utilisateur dans la base de données
  await putUserUpdateProfil(userId, { image: imageUrl })
    .then(() => {
      // La mise à jour sur la base de données a réussi, vous pouvez ajouter un code de gestion de succès si nécessaire

      // Mettre à jour la photo de profil de l'utilisateur en local
      
      setShowSelectPhoto(false);

      // Mettre à jour l'utilisateur dans le store Redux
      const updatedProfile = { ...user, image: imageUrl };
      updateUser(updatedProfile);
      dispatch(updateUser(updatedProfile));
    })
    .catch((error) => {
      // Gérer les erreurs de mise à jour de la base de données, par exemple, afficher un message d'erreur
      console.error("Erreur lors de la mise à jour sur la base de données : ", error);
    });
};



  
  const handleEditProfile = () => {
    navigate(`/UpdateProfilUser/${userId}`, { state: { user } });
  };
  return (
    <>
      
      {user && (
        <div className="profile-card">
       {showSelectPhoto ? (
            <SelectPhoto
              photoList={photoList}
              subfolder="photoProfil"
              text="Texte personnalisé pour h2"
              onImageSelect={handelImageSelect}
            />
          ) : (
            <div onClick={() => setShowSelectPhoto(true)}>
              {user.image && user.image.length > 0 ? (
                <div className ="photo-profil">
                  <img
                    src={user.image}
                    alt="Photo de profil"
                  />
                </div>
              ) : (
                <LetteredAvatar name={user.name} surname={user.surname} />
              )}
            </div>
          )}
          
        
          <p>Pseudo: {user.pseudo}</p>
          <p>Nom d'utilisateur : {user.surname}</p>
          <p>Prénom : {user.name}</p>
          <p>Email : {user.email}</p>
          
          <button className="link" onClick={handleEditProfile}>
            Modifier le profil
          </button>
          {/* Utilisez le composant SelectPhoto en passant les props nécessaires */}
        
        
        </div>
      )}
    </>
  );
}
