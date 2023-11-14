import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/slice/userSlice.js';
import { useNavigate } from "react-router-dom";
import './SignupLoginForm.scss';
import { ConfirmationPop } from '../../components/ConfirmationPop/ConfirmationPop.js';
import { REGISTER, LOGIN } from '../../helpers/routes.js';
import {postLogin} from '../../helpers/backend_helper.js'

export function SignupLoginForm() {
  const [isSignUp, setIsSignUp] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pseudo: '',
    surname: '',
    name: '',
    email: '',
    password: '',
    

  });

  const [showGameConfirmation, setShowGameConfirmation] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  useEffect(() => {
  }, [user]);

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  }

  const showConfirmationDialog = () => {
    setShowGameConfirmation(true);
  }

  const confirmGameStart = () => {
    // Effectuez les actions pour commencer une partie ici
    setShowGameConfirmation(false);
    
    navigate("/GameStarter");
  }

  const cancelGameStart = () => {
    // Annulez le démarrage du jeu et redirigez vers /profil
    setShowGameConfirmation(false);
    navigate("/profil");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        // Code pour l'inscription (register)
        const response = await fetch(REGISTER, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("jwt", data.jwt);
          dispatch(addUser(data.user));
          showConfirmationDialog();
        } else {
          console.error("Erreur lors de l'inscription :", response.status, response.statusText);
        }
      } else {
        postLogin(formData)
            .then(response => {
                dispatch(addUser(response.user))
                localStorage.setItem("jwt", response.jwt) 
                navigate("/profil")
            })
            .catch((err) => {
                console.error(err.message)
            })
        
      }
    } catch (error) {
      console.error("Une erreur inattendue s'est produite :", error);
    }
  }

  return (
    <div className="formContainer">
    {showGameConfirmation && (
          <ConfirmationPop
            message="Voulez-vous commencer une partie ?"
            confirmText="Commencer"
            cancelText="Plus tard"
            onConfirm={confirmGameStart}
            onCancel={cancelGameStart}
          />
        )}
      <div className={`message ${isSignUp ? 'signup' : 'login'}`}>
        <div className="btn-wrapper">
          <button className={`button ${isSignUp ? 'active' : ''}`} onClick={() => setIsSignUp(true)}>
            Sign Up
          </button>
          <button className={`button ${!isSignUp ? 'active' : ''}`} onClick={() => setIsSignUp(false)}>
            Login
          </button>
        </div>
      </div>
      <div className={`form ${isSignUp ? 'signup' : 'login'} `}>
        <div className="form--heading">
          {isSignUp ? 'Welcome! Sign Up' : 'Welcome back!'}
        </div>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Pseudo"
              name="pseudo"
              value={formData.pseudo}
              onChange={handleChange}
              required
            />
          )}
          {isSignUp && (
            <input
              type="text"
              placeholder="Nom"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          )}
          {isSignUp && (
            <input
              type="text"
              placeholder="Prénom"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            placeholder="Adresse e-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="button" type="submit">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        
      </div>
    </div>
  );
}
