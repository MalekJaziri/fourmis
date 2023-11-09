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


const handleChange = (e, index) => {
  const { value, checked } = e.target;

  // Copiez l'état actuel dans un nouvel objet
  const updatedFormData = { ...formData };

  // Mettez à jour la categoryId de l'élément spécifique en utilisant l'index
  if (checked) {
    // Si la case à cocher est cochée, mettez à jour la categoryId de l'élément spécifique
    updatedFormData.requirements[index].categoryId = value;
  } else {
    // Si la case à cocher est décochée, réinitialisez la valeur à une chaîne vide
    updatedFormData.requirements[index].categoryId = "";
  }

  // Mise à jour de l'état avec le nouvel objet
  setFormData(updatedFormData);
  
  setSelectedCategory(value);

  // Affichez la mise à jour de la categoryId dans la console
  console.log("Updated categoryId:", updatedFormData.requirements[index].categoryId);
};









 
 const handleQuantityChange =(e, index) => {
   const { name, value } = e.target;

    // Copiez l'état actuel dans un nouvel objet
    const updatedFormData = { ...formData };

  updatedFormData.requirements[index][name] = value;
    // Mise à jour de la categoryId dans l'array requirements à l'index spécifié
   

    // Mettez à jour l'état avec le nouvel objet
    setFormData(updatedFormData);

    // Affichez la valeur mise à jour dans la console
    console.log("Updated quantity:", value);
   
 }
 
 
 
 const handleCheckboxChange = (e, categoryId, index) => {
  const { checked } = e.target;

  // Copiez l'état actuel dans un nouvel objet
  const updatedFormData = { ...formData };

  // Obtenez l'index de la catégorie dans le tableau requirements
  const categoryIndex = updatedFormData.requirements[index].categoryId.indexOf(categoryId);

  if (checked) {
    // Si la case à cocher est cochée et la catégorie n'est pas encore présente, ajoutez-la
    if (categoryIndex === -1) {
      updatedFormData.requirements[index].categoryId.push(categoryId);
    }
  } else {
    // Si la case à cocher est décochée et la catégorie est présente, retirez-la
    if (categoryIndex !== -1) {
      updatedFormData.requirements[index].categoryId.splice(categoryIndex, 1);
    }
  }

  // Mettez à jour l'état avec le nouvel objet
  setFormData(updatedFormData);

  // Affichez les catégories mises à jour dans la console
  console.log("Updated categories:", updatedFormData.requirements[index].categoryId);
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
          
          
          <button onClick={handleAddCategory}>Ajouter nouvelle catégorie</button>
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
                <label>Catégorie de bâtiment :</label>
               {categorylist.map((category, index) => (
                  <div key={category._id}>
                    <input
                      type="checkbox"
                      id={`categoryCheckbox_${category._id}`}
                      value={category._id}
                      checked={formData.requirements[selectedIndex].categoryId}
                      onChange={(e) => handleChange(e, selectedIndex)}
                    />
                    <label htmlFor={`categoryCheckbox_${category._id}`}>{category.name}</label>
                  </div>
                ))}

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
              <div>
                <button type="submit">Créer le niveau</button>
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
