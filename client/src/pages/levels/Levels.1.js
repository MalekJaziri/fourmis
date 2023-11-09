import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../../store/slice/userSlice.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Footer } from "../../components/footer/Footer.js";
import { Header } from "../../components/header/Header.js";
import { Main } from "../../components/main/Main.js";
import { Nav } from "../../components/nav/Nav.js";
import { ProfilCard } from "../../components/profilCard/ProfilCard.js";
import { ConfirmationPop } from "../../components/ConfirmationPop/ConfirmationPop.js";
import { postCreateLevels, getLevels, getBuildingCategory } from "../../helpers/backend_helper.js";

export function Levels() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const categories = useSelector((state) => state.buildingCategory.categories);
  const [categorylist, setCategorylist] = useState([]);
  const [levelsList, setLevelsList] = useState([]);
  const [addingCategory, setAddingCategory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantityValues, setQuantityValues] = useState({});
  const [showAddBuildingButton, setShowAddBuildingButton] = useState(false);
  const [showCategorySelect, setShowCategorySelect] = useState(false)
  
  
  
   const [buildingData, setBuildingData] = useState([{ name: "", requirements: [{ categoryId: "", quantity: 0 }] }]);
  
  
  





  useEffect(() => {
    getLevels()
      .then(levels => {
        console.log('level', levels);
        setLevelsList(levels);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getBuildingCategory()
      .then(data => {
        console.log(data);
        setCategorylist(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    requirements: [{categoryId:"", quantity:0}], // Utilisez un tableau pour collecter les catégories et les quantités
  });
  console.log(formData)
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };


 const handleChange = (e, index ) => {
    const { name, value } = e.target;

    // Copiez l'état actuel dans un nouvel objet
    const updatedFormData = { ...formData };

  updatedFormData.requirements[index][name] = value;
    // Mise à jour de la categoryId dans l'array requirements à l'index spécifié
   

    // Mettez à jour l'état avec le nouvel objet
    setFormData(updatedFormData);
    
    setSelectedCategory(value);

    // Affichez la valeur mise à jour dans la console
    console.log("Updated categoryId:", value);
}

 
 const handleQuantityChange =(e, index) => {
   const { name, value } = e.target;

    // Copiez l'état actuel dans un nouvel objet
    const updatedFormData = { ...formData };

  updatedFormData.requirements[index][name] = value;
    // Mise à jour de la categoryId dans l'array requirements à l'index spécifié
   

    // Mettez à jour l'état avec le nouvel objet
    setFormData(updatedFormData);
    setShowAddBuildingButton(true);

    // Affichez la valeur mise à jour dans la console
    console.log("Updated quantity:", value);
   
 }
 
 const handleAddNewCategory = () => {
    // Lorsque vous cliquez sur "Ajouter un nouveau bâtiment"
    setShowCategorySelect(true); // Réglez l'état pour afficher le select des catégories
     // Réglez l'état pour masquer le formulaire de création de niveaux
  };
 
 
 const handleAddNewBuilding = () => {
    // Ajoutez un nouveau formulaire de bâtiment vide au tableau buildingData
    setBuildingData([...buildingData, { name: "", requirements: [{ categoryId: "", quantity: 0 }] }]);
  };
 
 
 
 
 
 
 

  const handleAddCategory = () => {
    setAddingCategory(true);
  };

  const handleCancel = () => {
    setAddingCategory(false);
  };
  
  const handleDeleteCategory = () => {
    
  }

 
  const handleSubmit = (e) => {
    e.preventDefault();
    postCreateLevels(formData)
      .then((response) => {
        // Gérer la réponse du backend si nécessaire
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Header />
      <Nav />
      <Main>
        <div>
          <h2>Liste des niveaux disponibles :</h2>
          
          
          <button onClick={handleAddCategory}>Ajouter un nouveau Niveau</button>
        </div> 
        {addingCategory && (
          <div>
            <h2>Création de Niveaux</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Nom du niveau :</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              
               
      <div>
        <div>
          <label>Catégorie de bâtiment :</label>
          <select
            name="categoryId"
            value={formData.requirements[selectedIndex].categoryId}
            onChange={(e) => handleChange(e, selectedIndex)}
          >
            <option value="">Sélectionnez une catégorie</option>
            {categorylist.map((category, index) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {selectedCategory && (
          <div>
            <label>{`Quantité de ${categorylist.find(category => category._id === selectedCategory).name} requis:`}</label>
            <input
              type="number"
              name="quantity"
              value={formData.requirements[selectedIndex].quantity}
              onChange={(e) => handleQuantityChange(e, selectedIndex)}
            />
          </div>
        )}
         
      </div>
  
              
              
              
              
              
              
              
              {showCategorySelect && ( // Affichez le select des catégories si showCategorySelect est vrai
      <div>
        <div>
          <label>Catégorie de bâtiment :</label>
          <select
            name="categoryId"
            value={formData.requirements[selectedIndex].categoryId}
            onChange={(e) => handleChange(e, selectedIndex)}
          >
            <option value="">Sélectionnez une catégorie</option>
            {categorylist.map((category, index) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {selectedCategory && (
          <div>
            <label>{`Quantité de ${categorylist.find(category => category._id === selectedCategory).name} requis:`}</label>
            <input
              type="number"
              name="quantity"
              value={formData.requirements[selectedIndex].quantity}
              onChange={(e) => handleQuantityChange(e, selectedIndex)}
            />
          </div>
        )}
        
      </div>
    )}
  {showAddBuildingButton && (
                <div>
                  <button type="button" onClick={handleAddNewCategory}>Ajouter un nouveau bâtiment</button>
                </div>
              )}
              <div>
             
                            
                <button type="submit" onClick={handleSubmit} >Créer le niveau</button>
                <button type="button" onClick={handleCancel}>Annuler</button>
              </div>
            </form>
          </div>
        )}
      </Main>
      <Footer />
    </>
  );
}
