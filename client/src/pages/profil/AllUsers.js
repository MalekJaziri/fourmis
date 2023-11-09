import React, { useState, useEffect } from 'react';
import {Footer} from '../../components/footer/Footer.js'
import {Header} from '../../components/header/Header.js'
import {Main} from '../../components/main/Main.js'
import {Nav} from '../../components/nav/Nav.js'
import { Link } from "react-router-dom";
import {ProfilCard} from '../../components/profilCard/ProfilCard.js'
import { getAllUsers } from '../../helpers/backend_helper.js'
import { useSelector } from 'react-redux';
import './AllUsers.scss'

export function AllUsers () {
    
    const [Userlist, setUserlist] = useState([])
    //const user = useSelector((state) => state.user);
    
    useEffect(() => {
    
    getAllUsers()
    .then(
        data => {
            setUserlist(data)
            console.log(Userlist)
        }
        )
    .catch(err => {
        console.log(err)
      })
    
    
    }, [Userlist]);
  
  
    
    
    console.log(Userlist)
    
    
    
    
    
    return (
         <>
            <Header/>
            <Nav/>
            
            <Main>
                <div className="cardcontainer">
                    
                    
                    {Userlist.map((user) => (
                        <ProfilCard key={user._id} user={user} />
                    ))}
                    
                
                </div>
                
                
                <Link className="button" to="/Profil">Retour à la page précédente</Link>
            </Main>
            
            <Footer/>
        </>
        )
}