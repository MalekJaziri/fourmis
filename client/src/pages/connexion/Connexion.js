


import {Footer} from '../../components/footer/Footer.js'
import {Header} from '../../components/header/Header.js'
import {Main} from '../../components/main/Main.js'
import {Nav} from '../../components/nav/Nav.js'
import {SignupLoginForm} from '../../components/SignupLoginForm/SignupLoginForm.js'



export function Connexion (){
      
          
    
    return (
        <>
        
        
            <Header/>
            <Nav/>
            
            <Main>
              
              <SignupLoginForm />  
              
             </Main>
            
            <Footer/>
            
        </>
        )
}