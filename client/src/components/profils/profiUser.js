
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assurez-vous d'importer useNavigate depuis react-router-dom
import { deleteUser } from '../../store/slice/userSlice.js'
import { Link } from "react-router-dom";



export function ProfilUser () {
    const  user  = useSelector((state) => state.user);

    useEffect(() => {
        console.log(user);
    }, [user]);
    
    const navigate = useNavigate();
      const dispatch = useDispatch();
    
      const handleLogout = () => {
        localStorage.removeItem("jwt");
        dispatch(deleteUser());
        navigate("/");
      };
    
    return (
        <>
            
            <h2> Profil user </h2>
            {user && (
                <div>
                    <p>pseudo: {user.pseudo}</p>
                    <p>Nom d'utilisateur : {user.surname}</p>
                    <p>Prenom: :{user.name} </p>
                    <p>Email : {user.email}</p>
                    
                </div>
                
                
                )}
                <button onClick={handleLogout}>Déconnexion</button>
                
                <Link to="/UpdateProfilUser">Modifier le profil</Link>
                
                
                
        </>
        )
}