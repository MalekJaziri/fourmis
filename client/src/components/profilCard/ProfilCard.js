import React, { useState, useEffect } from "react";
import { LetteredAvatar } from "../lettredAvatar/LettredAvatar.js";
import { userGetPhoto } from "../../helpers/backend_helper.js";
import { SelectPhoto } from "../selectPhoto/SelectPhoto.js";
import { updateUser } from "../../store/slice/userSlice.js";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../helpers/routes.js";
import { putUserUpdateProfil } from "../../helpers/backend_helper.js";
import { useNavigate } from "react-router-dom";
import "./ProfilCard.scss";

export function ProfilCard({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = user._id;

  const [photoList, setPhotoList] = useState([]);
  const [showSelectPhoto, setShowSelectPhoto] = useState(false);
  const [selectedProfilePhoto, setSelectedProfilePhoto] = useState(user.image || null);

  useEffect(() => {
  }, [user]);

  useEffect(() => {
    userGetPhoto("photoProfil")
      .then((data) => {
        setPhotoList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handelImageSelect = async (image) => {
    const imageUrl = `${BASE_URL}/images/photoProfil/${image}`;
    setSelectedProfilePhoto(imageUrl);

    await putUserUpdateProfil(userId, { image: imageUrl })
      .then(() => {
        setShowSelectPhoto(false);
        const updatedProfile = { ...user, image: imageUrl };
        updateUser(updatedProfile);
        dispatch(updateUser(updatedProfile));
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour sur la base de données : ", error);
      });
  };

  const handleCancelSelectPhoto = () => {
    setShowSelectPhoto(false);
  };

  const handleEditProfile = () => {
    navigate(`/UpdateProfilUser/${userId}`, { state: { user } });
  };

  return (
    <>
      {user && (
        <div className="profile-card">
          {showSelectPhoto ? (
            <>
              <SelectPhoto
                photoList={photoList}
                subfolder="photoProfil"
                text="Sléctionnez une image"
                onImageSelect={handelImageSelect}
              />
              <button className="cancel" onClick={handleCancelSelectPhoto}>
                Annuler
              </button>
            </>
          ) : (
            <div className="select-photo" onClick={() => setShowSelectPhoto(true)}>
              {user.image && user.image.length > 0 ? (
                <div className="photo-profil">
                  <img src={user.image} alt="Photo de profil" />
                </div>
              ) : (
                <LetteredAvatar name={user.name} surname={user.surname} />
              )}
              <div className="hover-text">Choisir une photo de profil</div>
            </div>
          )}

          <p>Pseudo: {user.pseudo}</p>
          <p>Nom d'utilisateur : {user.surname}</p>
          <p>Prénom : {user.name}</p>
          <p>Email : {user.email}</p>

          <button className="link" onClick={handleEditProfile}>
            Modifier le profil
          </button>
        </div>
      )}
    </>
  );
}
