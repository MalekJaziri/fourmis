import { Link } from 'react-router-dom';
import './Nav.scss'
import { useSelector } from 'react-redux';
import { useState } from 'react';


export function Nav () {
  const user = useSelector((state) => state.user);
  
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  
  
  
  
  
  
  
    return (
        <>
        
         
            <nav className={isMenuOpen ? 'active' : ''}>
                <div className="top-menu">
                  <div id="burger" className={`burger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
                </div>
                      
                      
                      
                
                <ul>
                    <li>
                      <Link to="/">Accueil</Link>
                    </li>
                    <li>
                      <Link to="/Presentation">Presentation</Link>
                    </li>
                   
                    {!user.isLogged ? (
                    <li>
                      <Link to="/Connexion">Connexion</Link>
                    </li>
                    ) : null}
                    {user.isLogged ? ( // Utilisez la condition user.isLogged pour afficher le lien "Profil" si l'utilisateur est connecté
                      <li>
                        <Link to="/Profil">Profil</Link>
                      </li>
                      
                      
                     ) : null}
                     
                     {user.isLogged && user.fourmilliere.length === 0 ? (
                        <li>
                          <Link to="/GameStarter">GameStarter</Link>
                        </li>
                      ) : null}
                      
                      {user.isLogged && user.fourmilliere.length >0 ? (
                        <li>
                          <Link to="/InGame">InGame</Link>
                        </li>
                      ) : null}

                  


                </ul>
            </nav>
        </>
        )
}