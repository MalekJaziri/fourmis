import React, { useState, useEffect } from 'react';
import {Footer} from '../../components/footer/Footer.js'
import {Header} from '../../components/header/Header.js'
import {Main} from '../../components/main/Main.js'
import { Link } from "react-router-dom";
import {ProfilCard} from '../../components/profilCard/ProfilCard.js'
import { getAllUsers } from '../../helpers/backend_helper.js'
import { useSelector } from 'react-redux';
import './AllUsers.scss'

export function AllUsers () {
    
    const [Userlist, setUserlist] = useState([])
    
    useEffect(() => {
    
    getAllUsers()
    .then(
        data => {
            setUserlist(data)
        }
    )
    .catch(err => {
        console.log(err)
      })
    }, []);
  

    
    return (
         <>
            <Header/>
            <Main>
                <div className="cardcontainer">
                    {Userlist.map((user) => (
                        <ProfilCard key={user._id} user={user} />
                    ))}
                <Link  to="/Profil">Retour</Link>
                </div>  
            </Main>
            <Footer/>
        </>
        )
}