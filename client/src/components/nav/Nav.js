import { Link } from 'react-router-dom';
import './Nav.scss'
import { useSelector } from 'react-redux';


export function Nav () {
  const user = useSelector((state) => state.user);
  
  
  
    return (
        <>
            <nav>
                <ul>
                    <li>
                      <Link to="/">Acceuil</Link>
                    </li>
                    <li>
                      <Link to="/Presentation">Presentation</Link>
                    </li>
                    <li>
                      <Link to="/Personnage">Perso</Link>
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
                </ul>
            </nav>
        </>
        )
}