import { Footer } from '../../components/footer/Footer.js';
import { Header } from '../../components/header/Header.js';
import { Main } from '../../components/main/Main.js';
import { Nav } from '../../components/nav/Nav.js';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getFourmilliere, increaseQueenHealth, createNursery,createBarrack, usergetBuildingCategory, userLevels, getBuildingCategory } from '../../helpers/backend_helper.js';
import { GameDashboard } from './GameDashboard.js';
import { addQueen, updateQueen, deleteQueen } from '../../store/slice/queenSlice.js';
import {ConfirmationPop} from '../../components/ConfirmationPop/ConfirmationPop.js'
import {  addFourmilliere, updateFourmilliere, deleteFourmilliere } from '../../store/slice/fourmilliereSlice.js'
import { addBuildingCategory, deleteBuildingCategory } from '../../store/slice/buildingsCategoryrSlice.js';

export function InGame() {
    const [fourmilliereapi, setFourmilliereapi] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const queen = useSelector((state) => state.queen);
    const fourmilliere =  useSelector((state) => state.fourmilliere);
    
    
    
    const [showNurseryAlert, setShowNurseryAlert] = useState(false);
    const [creerCouveuse, setCreerCouveuse] = useState(false);
    
    const [showBarrackAlert, setShowBarrackAlert] = useState(false);
    
    
    const [healthofqueen, sethealthofqueen ] = useState(0)
    const [workerMultipleOf20, setWorkerMultipleOf20] = useState(0);
    const [soldierMultipleOf20, setSoldiersMultipleOf20] = useState(0);
    
    const [categorylist, setCategorylist] = useState([]);
    const [levelsList, setLevelsList] = useState([]);
    
    const nursery = "6548fbceceac681e7cc41d01"
    const barrack = "6548fbedceac681e7cc41d04"
    
    
    
    
    
    const fourmillereID = user.fourmilliere;
    const workers = fourmilliere.workers.length
    const soldiers = fourmilliere.soldiers.length
    console.log(soldiers)
    
    console.log(fourmillereID)
    
      useEffect(() => {
            // Récupérez les données de la fourmilière si l'ID est disponible
            if (fourmillereID) {
              getFourmilliere(fourmillereID)
                .then(data => {
                  console.log(data);
                  setFourmilliereapi(data);
                  dispatch(updateFourmilliere(data))
                  dispatch(updateQueen(data.queen));
                  
                })
                .catch(err => {
                  console.log(err);
                  
                });
            }
      }, [ ]);

    
    // recuperation des données 
    useEffect(() => {
        console.log(user);
        console.log(user.fourmilliere);
    }, [user]);

console.log(fourmilliere.workers.length)
    

    
    const loadFourmilliereData = () => {
        getFourmilliere(fourmillereID)
            .then(data => {
              
                console.log(data);
                setFourmilliereapi(data);
                dispatch(updateFourmilliere(data))
                //console.log(fourmilliere.workers.length)
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
        //increaseQueenHealth(data);
        sethealthofqueen(healthofqueen + 20)
        if (healthofqueen >= 100) {
          increaseQueenHealth(data)
          loadFourmilliereData()
          sethealthofqueen(0)
        }
    }
    
    
    //construction de batiment
    
    // si la valeur des worker attein 20 on affiche qu'on peut commencer a construire des batiment
      
   useEffect(() => {
    if (workers >= workerMultipleOf20 + 20) {
      setWorkerMultipleOf20(workerMultipleOf20 + 20);
      setShowNurseryAlert(true);
    }
  }, [workers, workerMultipleOf20]);
  
  
  
  const handleNursery = () => {
    const data = {   
              category: nursery,
             fourmilliere: fourmillereID
            };
    createNursery(data)
    setShowNurseryAlert(false);
    loadFourmilliereData()
    
  } 
  
  
  useEffect(() => {
    if (soldiers >= soldierMultipleOf20 + 20) {
      setSoldiersMultipleOf20(soldierMultipleOf20 + 20);
      setShowBarrackAlert(true);
    }
  }, [soldiers, soldierMultipleOf20]);



    const handleBarrack = () => {
      const data = {   
              category: barrack,
             fourmilliere: fourmillereID
            };
    createNursery(data)
    setShowBarrackAlert(false);
    loadFourmilliereData()
      
    }
    



    
     
    

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
                            value={healthofqueen}
                            className="health-bar"
                            readOnly
                        />
                        <span>{healthofqueen}%</span>
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
                   nombre de d'ouvrière {workers} 
                </div>
                {showNurseryAlert && (
                    <ConfirmationPop
                        message="Vous avez la possibilité de créer une Couveuse"
                        confirmText="Créer"
                        cancelText="Plus tard"
                        onConfirm={ handleNursery }
                        onCancel={() => setShowNurseryAlert(false) }
                    />
                )}
                {showBarrackAlert && (
                    <ConfirmationPop
                        message="Vous avez la possibilité de créer une caserne"
                        confirmText="Créer"
                        cancelText="Plus tard"
                        onConfirm={ handleBarrack }
                        onCancel={() => setShowBarrackAlert(false) }
                    />
                )}
                
                
                
                
                
            </Main>
            <Footer />
        </>
    );
}
