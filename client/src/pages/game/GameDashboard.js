import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFourmilliere, increaseQueenHealth } from '../../helpers/backend_helper.js';
import { addQueen, updateQueen, deleteQueen } from '../../store/slice/queenSlice.js';

export function GameDashboard() {
  const user = useSelector((state) => state.user);
  const queen = useSelector((state) => state.queen);
  const fourmilliere = useSelector((state) => state.fourmilliere);
  const dispatch = useDispatch();

  const fourmillereID = user.fourmilliere;

  useEffect(() => {
    getFourmilliere(fourmillereID)
      .then(data => {
        dispatch(updateQueen(data.queen));
      })
      .catch(err => {
        console.log(err);
      });

  }, [fourmilliere]);

  useEffect(() => {
  }, [fourmilliere]);

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
    </div>
  );
}
