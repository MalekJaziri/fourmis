import { useState, useEffect } from 'react';
import { REGISTER, LOGIN } from '../../helpers/routes.js';
import { addUser } from '../../store/slice/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import './SignupLoginForm.scss';
import {useNavigate} from "react-router-dom";







export function SignupLoginForm() {
  
  
  const [isSignUp, setIsSignUp] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  
  const [formData, setFormData] = useState({
    pseudo: '',
    surname: '',
    name: '',
    email: '',
    password: '',
  });
  
  const handleChange = (event) => {
        const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value,
  });
        
    };
    
    useEffect(() => {
      console.log(user)
    },[user]);
      
  

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  };




  async function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
    
    
    

    try {
      if (isSignUp) {
        // Si c'est une inscription (register)
        const response = await fetch(REGISTER, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("jwt", data.jwt);
          console.log("Inscription réussie:", data);
          dispatch(addUser(data.user));
        navigate("/Profil")
        } else {
          console.error("Erreur lors de l'inscription :", response.status, response.statusText);
        }
      } else {
        // Code pour la connexion (login)
        const response = await fetch(LOGIN, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("jwt", data.jwt);
          console.log("Connexion réussie:", data);
          dispatch(addUser(data.user));
          
          navigate("/Profil");
          // Gérer la réponse de connexion réussie ici
        } else {
          console.error("Erreur lors de la connexion :", response.status, response.statusText);
          // Gérer l'erreur de connexion ici
        }
      }
    } catch (error) {
      console.error("Une erreur inattendue s'est produite :", error);
    }
  }

  return (
    <div className="formContainer">
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
