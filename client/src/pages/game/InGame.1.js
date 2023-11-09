import { Footer } from '../../components/footer/Footer.js';
import { Header } from '../../components/header/Header.js';
import { Main } from '../../components/main/Main.js';
import { Nav } from '../../components/nav/Nav.js';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getFourmilliere, increaseQueenHealth } from '../../helpers/backend_helper.js';
import { GameDashboard } from './GameDashboard.js';
import { addQueen, updateQueen, deleteQueen } from '../../store/slice/queenSlice.js';
import {ConfirmationPop} from '../../components/ConfirmationPop/ConfirmationPop.js'
import {  addFourmilliere, updateFourmilliere, deleteFourmilliere } from '../../store/slice/fourmilliereSlice.js'

export function InGame() {
    const [fourmilliere, setFourmilliere] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const queen = useSelector((state) => state.queen);
    
    const [showCouveuseAlert, setShowCouveuseAlert] = useState(false);
    const [creerCouveuse, setCreerCouveuse] = useState(false);
    
    const fourmillereID = user.fourmilliere;
    
    
    
      useEffect(() => {
            // Récupérez les données de la fourmilière si l'ID est disponible
            if (fourmillereID) {
              getFourmilliere(fourmillereID)
                .then(data => {
                  console.log(data);
                  setFourmilliere(data);
                  dispatch(updateQueen(data.queen));
                })
                .catch(err => {
                  console.log(err);
                });
            }
      }, [fourmillereID, dispatch]);

    
    // recuperation des données 
    useEffect(() => {
        console.log(user);
        console.log(user.fourmilliere);
    }, [user]);

    

    
    const loadFourmilliereData = () => {
        getFourmilliere(fourmillereID)
            .then(data => {
                console.log(data);
                setFourmilliere(data);
                
                console.log(fourmilliere.workers.length)
                dispatch(updateQueen(data.queen));
            })
            .catch(err => {
                console.log(err);
            });
    }

    
    
    
    
    // action de jeu
    
    // chouchouter la reine, ca augement sa health
    const handleclick = () => {
        const data = {
            fourmilliere: fourmillereID
        };
        increaseQueenHealth(data);
        
        loadFourmilliereData()
    }
    
    
    //construction de batiment
    
    // si la valeur des worker attein 20 on affiche qu'on peut commencer a construire des batiment
      
   


    
    
    

    return (
        <>
            <Header />
            <Nav />

            <Main>
                <p>InGame</p>
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
                <button onClick={handleclick}>
                    chouchouter la reine
                </button>
                
                <div>
                   nombre de travailleuse {fourmilliere.workers.length}
                </div>
                {showCouveuseAlert && (
                    <ConfirmationPop
                        message="Vous avez la possibilité de créer une Couveuse"
                        confirmText="Créer"
                        cancelText="Plus tard"
                        onConfirm={() => {
                            // Mettez ici la logique pour créer la Couveuse
                            // Si la Couveuse est créée avec succès, vous pouvez réinitialiser setShowCouveuseAlert(false);
                        }}
                        onCancel={() => setShowCouveuseAlert(false), setCreerCouveuse(true) }
                    />
                )}
                {creerCouveuse && (
                  <button >
                    creerCouveuse
                  </button> 
                )}
                
            </Main>
            <Footer />
        </>
    );
}
