import {Footer} from '../../components/footer/Footer.js'
import {Header} from '../../components/header/Header.js'
import {Main} from '../../components/main/Main.js'
import {Nav} from '../../components/nav/Nav.js'


import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assurez-vous d'importer useNavigate depuis react-router-dom
import { deleteUser } from '../../store/slice/userSlice.js'
import { Link } from "react-router-dom";
import {postAddImages} from '../../helpers/backend_helper.js'



export function FormImages () {
   
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedSubfolder, setSelectedSubfolder] = useState("photoProfil");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }
  
  
  const handleSubfolderChange = (event) => {
  setSelectedSubfolder(event.target.value);
  console.log(event.target.value)
};

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData()
    
    

    if (selectedFile) {
        formData.append("file", selectedFile );
        formData.append("subfolder", selectedSubfolder);
        postAddImages(formData)
      // Vous pouvez ajouter ici la logique pour envoyer le fichier au serveur.
      console.log("Fichier sélectionné :", selectedFile);
    } else {
      console.log("Aucun fichier sélectionné.");
    }
  }

    
    return (
        <>
            <Header/>
            <Nav/>
            
            <Main>
            
            <form onSubmit={handleSubmit}>
                <div>
                <label>Sélectionnez un fichier :</label>
                <input type="file" name="file" onChange={handleFileChange} />
                </div>
                <label>Sélectionnez le type de photo :</label>
                <select name="subfolder" onChange={handleSubfolderChange} >
                  <option value="photoProfil">Photo de profil</option>
                  <option value="fourmis">Photo de fourmis</option>
                  <option value="photoBatiment">Photos de batiments</option>
                </select>

                <div>
                <button type="submit">Envoyer</button>
                </div>
            </form>
            
           <Link to="/Profil">Retour à la page précédente</Link>
                
                
                
            </Main>
            
            <Footer/>
        </>
        )
}