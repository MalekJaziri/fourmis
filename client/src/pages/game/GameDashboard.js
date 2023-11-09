// GameDashboard.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getFourmilliere, increaseQueenHealth} from '../../helpers/backend_helper.js'
import { addQueen, updateQueen, deleteQueen } from '../../store/slice/queenSlice.js';

export function GameDashboard() {
  const user = useSelector((state) => state.user);
  const queen = useSelector((state) => state.queen);
  const fourmilliere = useSelector((state) => state.fourmilliere);
  const dispatch = useDispatch();
  
  
  console.log(user)
  console.log(queen)
console.log(fourmilliere)


 const fourmillereID=  user.fourmilliere
    
     useEffect(() => {
    
      // Si l'ID de la fourmilière est disponible dans le state Redux, appelez getFourmilliere
      getFourmilliere(fourmillereID)
        .then(data => {
          // Les données de la fourmilière ont été mises à jour dans le store Redux
          console.log(data);
          dispatch(updateQueen(data.queen))
        })
        .catch(err => {
          console.log(err);
          
          
        });
    
  }, [fourmilliere]);

  useEffect(() => {
    console.log(fourmilliere)
  }, [fourmilliere]); // Listen to changes in fourmilliere

  return (
    <div>
      <h2>Nom de la reine: {queen.name} </h2>
      <img src={queen.image} alt={queen.name} />
      <div>
        État de santé de la reine:
        <input
          type="range"
          min="0"
          max="100"
          value={queen.health}
          className="health-bar"
          readOnly
        />
        <span>{queen.health}%</span>
      </div>
      <div>
        Population: {queen.laying}
      </div>
      <div>
        Niveau du joueur: 
      </div>
      {/* Add your game actions or buttons here */}
    </div>
  );
}
