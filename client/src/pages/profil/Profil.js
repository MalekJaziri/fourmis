import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../../store/slice/userSlice.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Footer } from "../../components/footer/Footer.js";
import { Header } from "../../components/header/Header.js";
import { Main } from "../../components/main/Main.js";
import { Nav } from "../../components/nav/Nav.js";
import { ProfilCard } from "../../components/profilCard/ProfilCard.js";
import { ConfirmationPop } from "../../components/ConfirmationPop/ConfirmationPop.js";

import './Profil.scss';

export function Profil() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const handleLogout = () => {
    setConfirmationOpen(true);
  };

  const confirmLogout = () => {
    
    localStorage.removeItem("jwt");
    dispatch(deleteUser());
    navigate("/");
    setConfirmationOpen(false);
  };

  const cancelLogout = () => {
    setConfirmationOpen(false);
  };

  useEffect(() => {
    console.log(user);
    console.log(user.image);
  }, [user]);

  const adminContent = (
    <div className="dash">
      <Link className="link" to="/AllUsers">Voir les utilisateurs</Link>
      <Link className="link" to="/FormCategoriesBatiments">Créer batiments</Link>
      <Link className="link" to="/Levels">Créer niveaux</Link>
      <Link className="link" to="/FormImages">Ajouter Photo</Link>
    </div>
  );

  return (
    <>
      <Header />
      
      <Main>
        {user.isAdmin ? (
          <>
            <h2>Salut admin</h2>
            <ProfilCard user={user} />
            {adminContent}
          </>
        ) : (
          <>
            <h2>Salut {user.pseudo}</h2>
            <ProfilCard user={user} />
          </>
        )}
        <button className="logout" onClick={handleLogout}>
          Déconnexion
        </button>
        {isConfirmationOpen && (
          <ConfirmationPop
            message="Êtes-vous sûr de vouloir vous déconnecter ?"
            confirmText="Valider la déconnexion"
            cancelText="Annuler"
            onConfirm={confirmLogout}
            onCancel={cancelLogout}
          />
        )}
      </Main>
      <Footer />
    </>
  );
}