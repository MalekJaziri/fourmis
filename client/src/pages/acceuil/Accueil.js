import React from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Accueil.scss';

export function Accueil() {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="accueil">
        <div className="accueil_nav">
          <p className="presentation">Presentation</p>
          <p className="mid-screen-text">
            "Sous terre et au-delà, plongez dans l'univers fascinant de notre jeu interactif, une expérience immersive où vous incarnez le héros intrépide chargé de gérer et faire prospérer votre propre colonie de fourmis. Dans ce royaume souterrain, vous serez le maître de la fourmilière, avec pour mission la création d'un écosystème florissant. Créez des tunnels ingénieux, assignez des tâches à différentes catégories de fourmis, et relevez des défis palpitants pour faire évoluer votre colonie. Chaque décision compte, chaque fourmi a son rôle, et avec des niveaux de difficulté, des récompenses alléchantes et des événements aléatoires, votre aventure promet d'être aussi captivante que stratégique. Préparez-vous à explorer un monde souterrain rempli de surprises et à devenir le héros de votre propre royaume miniature. Bienvenue dans le royaume des fourmis, où la grandeur émerge de l'infime."
          </p>

          {!user.isLogged ? (
            <Link to="/Connexion">Connexion</Link>
          ) : null}
          {user.isLogged ? (
            <Link to="/Profil">Profil</Link>
          ) : null}
        </div>

        <h2>Sous Terre et au-delà</h2>
      </div>
    </>
  );
}
