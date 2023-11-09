// routes.js
import { Route, Routes } from 'react-router-dom';


import {Acceuil} from '../pages/acceuil/Acceuil.js';
import {Connexion} from '../pages/connexion/Connexion.js'
import {Presentation} from '../pages/presentation/Presentation.js'
import {Personnage} from '../pages/personnages/Personnages.js'
import {Profil} from '../pages/profil/Profil.js'
import {AllUsers} from '../pages/profil/AllUsers.js'
import {FormImages} from '../pages/images/FormImage.js'
import {FormCategoriesBatiments} from '../pages/batiments/FormCategoriesBatiments.js'


import {UpdateProfilUser} from '../components/updateprofil/UpdateProfilUser.js'
import {Levels} from '../pages/levels/Levels.js'



import {GameStarter} from '../pages/game/GameStarter.js'
import {InGame} from '../pages/game/InGame.js'






const publicRoutes = [
    { path: '/', element: <Acceuil /> },
  { path: '/Presentation', element: <Presentation /> },
  { path: '/Personnage', element: <Personnage /> },
  { path: '/Connexion', element: <Connexion /> },
]

const privateRoutes = [
    { path: '/Profil', element: <Profil /> },
    { path: '/UpdateProfilUser/:id', element: <UpdateProfilUser /> },
    { path: '/GameStarter', element: <GameStarter /> },
  { path: '/InGame', element: <InGame /> },
    
]

const adminRoutes = [
    { path: '/Profil', element: <Profil /> },
    { path: '/UpdateProfilUser/:id', element: <UpdateProfilUser /> },
    { path: '/AllUsers', element: <AllUsers /> },
  { path: '/FormImages', element: <FormImages /> },
  { path: '/FormCategoriesBatiments', element: <FormCategoriesBatiments /> },
  { path: '/Levels', element: <Levels /> },
]


export {privateRoutes, publicRoutes, adminRoutes}


