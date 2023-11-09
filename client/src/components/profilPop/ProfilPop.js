import { Link } from 'react-router-dom';
import './ProfilPop.scss'
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../../store/slice/userSlice.js'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export function ProfilPop () {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log(user);
    }, [user]);
    
    
    
    const handleLogout = () => {
        localStorage.removeItem("jwt");
        dispatch(deleteUser());
        navigate("/");
    };
    
    return(
        
        <>
            <div className="Pop">
                {!user.isLogged ? (
                    
                      <Link to="/Connexion">Connexion</Link>
                    
                    ) : null}
                    {user.isLogged ? ( // Utilisez la condition user.isLogged pour afficher le lien "Profil" si l'utilisateur est connecté
                      <>
                        <FontAwesomeIcon icon="fa-solid fa-user" />
                          <li>
                            <Link to="/Profil">Profil</Link>
                          </li>
                          <button onClick={handleLogout}>Déconnexion</button>
                      </>
                    ) : null}
            </div>
        </>
        
        )
}