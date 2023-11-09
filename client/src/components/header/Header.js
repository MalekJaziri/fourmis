import './Header.css'
import { Link } from 'react-router-dom';
import {ProfilPop} from '../profilPop/ProfilPop.js'
import { useSelector } from 'react-redux';

export function Header () {
     const user = useSelector((state) => state.user);
    
    return(
        <>
            <header>
                <h1>
                    <Link to="/">
                        La Fourmiliere 
                    </Link>
                </h1>
               
            </header>
        </>
        )
}