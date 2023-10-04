import {Footer} from '../../components/footer/Footer.js'
import {Header} from '../../components/header/Header.js'
import {Main} from '../../components/main/Main.js'
import {Nav} from '../../components/nav/Nav.js'
import {ProfilAdmin} from '../../components/profils/profilAdmin.js'
import {ProfilUser} from '../../components/profils/profiUser.js'


import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assurez-vous d'importer useNavigate depuis react-router-dom
import { deleteUser } from '../../store/slice/userSlice.js'



export function Profil () {
    const  user  = useSelector((state) => state.user);


    
    return (
        <>
            <Header/>
            <Nav/>
            
            <Main>
            
            
            {user.isAdmin ? <ProfilAdmin /> : <ProfilUser />}
           
                
                
                
            </Main>
            
            <Footer/>
        </>
        )
}