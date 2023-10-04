import { Route, BrowserRouter, Routes } from 'react-router-dom';
import {Acceuil} from './pages/acceuil/Acceuil.js';
import {Connexion} from './pages/connexion/Connexion.js'
import {Presentation} from './pages/presentation/Presentation.js'
import {Personnage} from './pages/personnages/Personnages.js'
import {Profil} from './pages/profil/Profil.js'


import {UpdateProfilUser} from './components/updateprofil/UpdateProfilUser.js'


import {  useEffect } from 'react';
import {getVerifyUserByToken} from './helpers/backend_helper.js'
import { addUser } from './store/slice/userSlice.js';
import { useDispatch, useSelector } from 'react-redux'



function App() {
  
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (localStorage.getItem('jwt') && !user.isLogged) {
      const userTokenPromise = getVerifyUserByToken();
      userTokenPromise
      .then(data => {
        dispatch(addUser(data.user))
      })
      .catch(err => {
        console.log(err)
      })
    }
  },[] )
  
  
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Acceuil/>} />
          <Route path="/Presentation" element={<Presentation/>} />
          <Route path="/Personnage" element={<Personnage/>} />
          <Route path="/Connexion" element={<Connexion/>} />
          <Route path="/Profil" element={<Profil/>} />
          
          <Route path="/UpdateProfilUser" element={<UpdateProfilUser/>} />
          
          
          
          
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
