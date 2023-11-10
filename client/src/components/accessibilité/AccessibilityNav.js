// AccessibilityNav.js
import React from 'react';

import './AccessibilityNav.scss'


export function AccessibilityNav() {
 


 
  return (
    <>
      <ul className="a11y-nav">
        <li>
          <a href="/" >
            page accueil
          </a>
        </li>
        <li>
          <a href="/Presentation" >
            voir presentation
          </a>
        </li>
        <li>
          <a href="/Personnage" >
            voir personnage
          </a>
        </li>
        <li>
          <a href="/Connexion" >
            voir connexion
          </a>
        </li>
      </ul>
    </>
  );
}
