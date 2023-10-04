import './Header.css'
import { Link } from 'react-router-dom';

export function Header () {
    
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