import './Header.scss'
import { Link } from 'react-router-dom';

import {Nav} from '../nav/Nav.js'

export function Header () {
     
    
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