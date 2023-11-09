import antModel from '../models/antModel.js'
import buildingModel from '../models/buildingModel.js'
import fourmilliereModel from '../models/fourmilliereModel.js'


export const createAntManellement = async (req, res) => {
    
    const ants = await createAnt(req.body.category, req.body.fourmilliere, req.body.image)
    console.log(ants)
    res.status(201)
}


export const createAnt = async (category, fourmilliere,  //Id de la fourmilliere
) => {
    
      try {
         
        const ant = await antModel.create({
            category: category,
            fourmilliere: fourmilliere, //id de la fourmilliere
            //image: image,
            
        });
        
    
        //console.log(ant); 

        return ant
        
    } catch (err) {
       
        throw err; // Propagez l'erreur en cas d'échec
    }
   
   
} // fonction qui crée des fourmis

export async function createWorker(fourmilliere ) {
    
    return await createAnt('Worker', fourmilliere);
    
    
} // fonction qui crée des fourmis ouvrieres


export async function createSoldier(fourmilliere) {

    return await createAnt('Soldier', fourmilliere);
} // fonction qui crée des fourmis soldats 


export const createStartingWorkers = async (fourmilliere) => {
    const workers = [];
        for (let i = 0; i < 5; i++) {
            const worker = await createWorker(fourmilliere);
            workers.push(worker); // Ajoutez l'identifiant ObjectId du travailleur au tableau
        }
        console.log(workers); // Affichez les identifiants ObjectId des travailleurs
        return workers
    
};



export const createRandomAnts = async (fourmilliere) => {
     
     
     
    const ants = [];
    const categoryChoice = [createSoldier, createWorker]
    const buildings = await buildingModel.find({ fourmilliere: fourmilliere });
    
    console.log(buildings)
            
        for (let i = 0; i < (Math.floor(Math.random() * 6) + 3); i++) {
            if (buildings.length >= 2) {
                const ant = await categoryChoice[Math.floor(Math.random() * 2)](fourmilliere)
                ants.push(ant)
            } else {
                const worker = await createWorker(fourmilliere);
                ants.push(worker); // Ajoutez l'identifiant ObjectId du travailleur au tableau
            }
        }
        console.log(ants); // Affichez les identifiants ObjectId des travailleurs
        return   ants
    
};