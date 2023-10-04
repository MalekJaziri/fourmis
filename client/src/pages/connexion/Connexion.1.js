import { useEffect, useState } from 'react'
import {REGISTER} from '../../helpers/routes.js'

import {Footer} from '../../components/footer/Footer.js'
import {Header} from '../../components/header/Header.js'
import {Main} from '../../components/main/Main.js'
import {Nav} from '../../components/nav/Nav.js'



export function Connexion (){
      
        async function handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked submit.');
        console.log(e.target.pseudo.value);
        try {
            const response = await fetch(REGISTER, {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                pseudo: e.target.pseudo.value,
                surname: e.target.surname.value,
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value
              })
            });
        
            // Vérifier si la réponse est OK (status 200)
            if (response.ok) {
              const data = await response.json();
              console.log(data);
            } else {
              console.error("Erreur lors de la requête :", response.status, response.statusText);
            }
          } catch (error) {
            console.error("Une erreur inattendue s'est produite :", error);
          }
        }
          
    
    return (
        <>
        
        
            <Header/>
            <Nav/>
            
            <Main>
                <div className="registerForm">
                <h2>Inscription</h2>
                <form  onSubmit={handleSubmit}>
                    <label htmlFor="pseudo">Pseudo:</label>
                    <input type="text" id="pseudo" name="pseudo" required />
                    
        
                    <label htmlFor="surname">Nom:</label>
                    <input type="text" id="surname" name="surname" required />
                    
        
                    <label htmlFor="name">Prénom:</label>
                    <input type="text" id="name" name="name" required/>
                    
        
                    <label htmlFor="email">Adresse e-mail:</label>
                    <input type="email" id="email" name="email" required/>
                    
        
                    <label htmlFor="password">Mot de passe:</label>
                    <input type="password" id="password" name="password" required/>
                    
        
                    <button type="submit">S'inscrire</button>
                </form>
                </div>
             </Main>
            
            <Footer/>
            
        </>
        )
}