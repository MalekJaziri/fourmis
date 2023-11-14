import {Footer} from '../../components/footer/Footer.js'
import {Header} from '../../components/header/Header.js'
import {Main} from '../../components/main/Main.js'

import './Presentation.scss'

export function Presentation () {
    
    return (
        <>
            <Header/>
            
            
            <Main>
            <div className="texte">
                <p>
                "Sous terre et au-delà, plongez dans l'univers fascinant de notre jeu interactif, une expérience immersive où vous incarnez le héros intrépide chargé de gérer et faire prospérer votre propre colonie de fourmis. Dans ce royaume souterrain, vous serez le maître de la fourmilière, avec pour mission la création d'un écosystème florissant. Créez des tunnels ingénieux, assignez des tâches à différentes catégories de fourmis, et relevez des défis palpitants pour faire évoluer votre colonie. Chaque décision compte, chaque fourmi a son rôle, et avec des niveaux de difficulté, des récompenses alléchantes et des événements aléatoires, votre aventure promet d'être aussi captivante que stratégique. Préparez-vous à explorer un monde souterrain rempli de surprises et à devenir le héros de votre propre royaume miniature. Bienvenue dans le royaume des fourmis, où la grandeur émerge de l'infime."
                </p>
            </div>    
            </Main>
            
            <Footer/>
        </>
        )
}