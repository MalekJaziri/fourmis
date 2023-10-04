import {Footer} from '../../components/footer/Footer.js'
import {Header} from '../../components/header/Header.js'
import {Main} from '../../components/main/Main.js'
import {Nav} from '../../components/nav/Nav.js'
import './Presentation.css'

export function Presentation () {
    
    return (
        <>
            <Header/>
            <Nav/>
            
            <Main>
                <p>
                Presentation
                </p>
                
            </Main>
            
            <Footer/>
        </>
        )
}