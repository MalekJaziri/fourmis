import {Footer} from '../../components/footer/Footer.js'
import {Header} from '../../components/header/Header.js'
import {Main} from '../../components/main/Main.js'
import {Nav} from '../../components/nav/Nav.js'

import {SelectPhoto} from '../../components/selectPhoto/SelectPhoto.js'
import React, { useState, useEffect } from "react";

import {adminGetPhoto} from '../../helpers/backend_helper.js'


import './Acceuil.css'

export function Acceuil () {
    
   
  

  return (
    <>
      <Header />
      

      <Main>
        <p>lorem</p>
       
        
      </Main>

      <Footer />
    </>
  );
}