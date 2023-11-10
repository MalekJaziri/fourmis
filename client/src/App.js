

import react,{  useEffect, useState } from 'react';
import {getVerifyUserByToken} from './helpers/backend_helper.js'
import { addUser, updateUser } from './store/slice/userSlice.js';
import { useDispatch, useSelector } from 'react-redux'

import {adminRoutes, privateRoutes, publicRoutes} from "./router/routes";
import  {Route, Routes,BrowserRouter, useNavigate} from "react-router-dom";

import {AuthMiddleware} from "./router/AuthMiddleware.js";
import {AdminMiddleware} from "./router/AdminMiddleware.js";

import {AccessibilityNav} from './components/accessibilité/AccessibilityNav.js'

import './App.scss'

import './fonts/Rockybilly.ttf';









function App() {
  
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fourmilliere =  useSelector((state) => state.fourmilliere);
  const [accessibleMode, setAccessibleMode] = useState(false);
 
  
  
  
  
  useEffect(() => {
    console.log(localStorage.getItem('jwt'))
    console.log(!user.isLogged)
    if (localStorage.getItem('jwt') && !user.isLogged) {
      const userTokenPromise = getVerifyUserByToken();
      userTokenPromise
      .then(data => {
        console.log(data)
        dispatch(addUser(data.user))
      })
      .catch(err => {
        console.log(err)
      })
    }
  },[] )
  
 
  
  
  
  const toggleAccessibleMode = () => {
    setAccessibleMode(!accessibleMode);
    console.log('Accessible mode toggled:', accessibleMode);
  };
  
  
 
  
  return (
    <>
     

     
      
      <BrowserRouter>
              
        <AccessibilityNav />
        
        
        
        <div id="dislexie" className={` ${accessibleMode ? 'accessible-mode' : ''}`}>
          <button  onClick={toggleAccessibleMode}></button>
        </div>
        
        <div className={` ${accessibleMode ? 'accessible-mode' : ''}`}>
          <Routes>
            {publicRoutes.map((route, i) => (
             
                <Route path={route.path} element={route.element} key={i} exact={true} />
            ))}
            {privateRoutes.map((route, idx) => (
                <Route path={route.path} element={<AuthMiddleware>{route.element}</AuthMiddleware>} key={idx} exact={true} />
            ))}
            {adminRoutes.map((route, idx) => (
                <Route path={route.path} element={<AdminMiddleware>{route.element}</AdminMiddleware>} key={idx} exact={true} />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
