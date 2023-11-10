import './Header.scss'
import { Link } from 'react-router-dom';
import {ProfilPop} from '../profilPop/ProfilPop.js'
import { useSelector } from 'react-redux';
import {Nav} from '../nav/Nav.js'

export function Header () {
     const user = useSelector((state) => state.user);
    
    return(
        <>
            <header>
                
                    <h1 >
                        <Link to="/">
                            La Fourmiliere 
                        </Link>
                    </h1>
                    
                    
                <Nav/>
               
            </header>
        </>
        )
}