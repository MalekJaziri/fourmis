import {Footer} from '../../components/footer/Footer.js'
import {Header} from '../../components/header/Header.js'
import {Main} from '../../components/main/Main.js'
import {SignupLoginForm} from '../../components/SignupLoginForm/SignupLoginForm.js'



export function Connexion (){
      
          
    
    return (
        <>
            <Header/>
            <Main>
              <SignupLoginForm /> 
             </Main>
            <Footer/>
            
        </>
        )
}