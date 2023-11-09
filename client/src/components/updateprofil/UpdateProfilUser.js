import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../../store/slice/userSlice.js";
import { Footer } from '../../components/footer/Footer.js'
import { Header } from '../../components/header/Header.js'
import { Main } from '../../components/main/Main.js'
import { Nav } from '../../components/nav/Nav.js'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { putAdminUpdateUser, putUserUpdateProfil, delUserDeleteProfil,delAdminDeleteProfil } from '../../helpers/backend_helper.js'
import { useParams, useLocation } from "react-router-dom";
import { ConfirmationPop } from "../../components/ConfirmationPop/ConfirmationPop.js";



import './UpdateProfilUser.scss'


export function UpdateProfilUser() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
   const location = useLocation();
  const { user: userProfile } = location.state;
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  useEffect(() => {
        console.log(userProfile);
    }, [userProfile]);
  
  const initialFormData = {
    pseudo: userProfile.pseudo,
    surname: userProfile.surname,
    name: userProfile.name,
    email: userProfile.email,
  };

  const [formData, setFormData] = useState(initialFormData);
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

   try {
      if (user.isAdmin) {
        // L'administrateur peut modifier à la fois son propre profil et le profil d'autres utilisateurs
        if (user._id === userProfile._id) {
          await putAdminUpdateUser(userProfile._id, formData);
        } else {
          await putAdminUpdateUser(userProfile._id, formData);
        }
      } else {
        // Si ce n'est pas un administrateur, utilisez putUserUpdateProfil
        await putUserUpdateProfil(userProfile._id, formData);
      }

      // Mettez à jour l'utilisateur actif dans le Redux store uniquement si c'est son propre profil
      if (user._id === userProfile._id) {
        dispatch(updateUser(formData));
      }

      
      
      navigate("/Profil");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  }
  
  const confirmDelete =  () => {
    try {
    if (user.isAdmin) {
      delAdminDeleteProfil(userProfile._id);
      setShowConfirmation(false);
      navigate("/AllUsers");
    } else {
      delUserDeleteProfil(userProfile._id);
      localStorage.removeItem("jwt");
    dispatch(deleteUser());
    
      navigate("/");
      
      dispatch(deleteUser());
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du profil :", error);
  }
  }

  const cancelDelete = () => {
    // Annulez le démarrage du jeu et redirigez vers /profil
    setShowConfirmation(false);
    
  }

/*const handleDeleteProfile = async () => {
    try {
      if (user.isAdmin) {
        await delAdminDeleteProfil(userProfile._id);
        setShowConfirmation(false);
        navigate("/AllUsers");
        
      } else {
        await delUserDeleteProfil(userProfile._id);
         navigate("/")
            localStorage.removeItem("jwt");
            dispatch(deleteUser());
      }
      
      // Redirigez l'utilisateur vers une page appropriée après la suppression.
      
    } catch (error) {
      console.error("Erreur lors de la suppression du profil :", error);
    }
  }; */

  return (
    <>
      <Header />
      <Nav />

      <Main>
        <div className="update">
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
          <button className="button" type="submit">Enregistrer les modifications</button>
          <button className="button" type="button" onClick={() => setShowConfirmation(true)}>Supprimer le profil</button>
          <Link className="button" to="/Profil">Annuler</Link>
        </form>
        </div>
      </Main>

      <Footer />
      {showConfirmation && (
        <ConfirmationPop
          message="Êtes-vous sûr de vouloir supprimer ce profil ?"
          confirmText="Confirmer"
          cancelText="Annuler"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
}
