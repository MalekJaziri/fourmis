import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../store/slice/userSlice.js";
import {Footer} from '../../components/footer/Footer.js'
import {Header} from '../../components/header/Header.js'
import {Main} from '../../components/main/Main.js'
import {Nav} from '../../components/nav/Nav.js'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {putUserUpdateProfil} from '../../helpers/backend_helper.js'


export function UpdateProfilUser() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Utilisez les données actuelles de l'utilisateur pour définir les placeholders
  const initialFormData = {
    pseudo: user.pseudo,
    surname: user.surname,
    name: user.name,
    email: user.email,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit  (e) {
    e.preventDefault();
    
    try {
    // Envoi des données mises à jour à la fonction postUserUpdateProfil
    await putUserUpdateProfil(user.id, formData);
    //dispatch(addUser(formData));
    // Rediriger l'utilisateur vers la page de profil après la mise à jour
    //dispatch(addUser(formData));
    // Vous pouvez utiliser "useNavigate" pour cela.
    navigate("/Profil");
  } catch (error) {
    // Gérer les erreurs ici, par exemple afficher un message d'erreur à l'utilisateur
    console.error("Erreur lors de la mise à jour du profil :", error);
  }
};
    

  return (
      
    <>
        <Header/>
            <Nav/>
            
            <Main>
              <h2>Modifier le profil</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="pseudo">Pseudo</label>
                  <input
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    value={formData.pseudo}
                    onChange={handleChange}
                    placeholder={initialFormData.pseudo}
                  />
                </div>
                <div>
                  <label htmlFor="surname">Nom d'utilisateur</label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder={initialFormData.surname}
                  />
                </div>
                <div>
                  <label htmlFor="name">Prénom</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={initialFormData.name}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={initialFormData.email}
                  />
                  </div>
                  <div>
                  <label htmlFor="password">Password</label>
                 <input
                    type="password"
                    id="password"
                    placeholder="Mot de passe"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  
                />
                </div>
                <button type="submit">Enregistrer les modifications</button>
                <Link to="/Profil">annuler</Link>
              </form>
            </Main>
            
            <Footer/>
        </>
  );
}
