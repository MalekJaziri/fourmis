import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/footer/Footer.js";
import { Header } from "../../components/header/Header.js";
import { Main } from "../../components/main/Main.js";
import { Nav } from "../../components/nav/Nav.js";
import { getLevels, getBuildingCategory, postCreateLevels } from "../../helpers/backend_helper.js";

export function Levels() {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.buildingCategory.categories);
  const [categorylist, setCategorylist] = useState([]);
  const [levelsList, setLevelsList] = useState([]);
  const [addingCategory, setAddingCategory] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // Ajout d'un état pour la catégorie sélectionnée

  useEffect(() => {
    getLevels()
      .then((levels) => {
        console.log('levels', levels);
        setLevelsList(levels);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getBuildingCategory()
      .then((data) => {
        console.log('categories', data);
        setCategorylist(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    requirements: [], // Utilisez un tableau pour collecter les catégories et les quantités
  });

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId); // Mettre à jour la catégorie sélectionnée
  };

  const handleQuantityChange = (categoryId, quantity) => {
    // Mettre à jour la quantité pour la catégorie sélectionnée
    const updatedRequirements = formData.requirements.slice(); // Créer une copie du tableau
    const categoryIndex = updatedRequirements.findIndex((item) => item.categoryId === categoryId);

    if (categoryIndex !== -1) {
      updatedRequirements[categoryIndex].quantity = quantity;
    } else {
      updatedRequirements.push({ categoryId, quantity });
    }

    setFormData({ ...formData, requirements: updatedRequirements });
  };

  const handleAddCategory = () => {
    setAddingCategory(true);
  };

  const handleCancel = () => {
    setAddingCategory(false);
  };

  const handleDeleteCategory = (level) => {
    // Ajoutez ici la logique pour supprimer le niveau (vous devrez implémenter cette fonction)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postCreateLevels(formData)
      .then((response) => {
        // Gérer la réponse du backend si nécessaire
        // Réinitialisez le formulaire après la création
        setFormData({
          name: "",
          requirements: [],
        });
        setAddingCategory(false);
      })
      .catch((error) => {
        // Gérer les erreurs s'il y en a
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
                <label>Catégories de bâtiment :</label>
                <select
                  name="categoryId"
                  value={selectedCategoryId}
                  onChange={handleCategoryChange}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categorylist.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedCategoryId && (
                <div>
                  <label>Quantité pour la catégorie sélectionnée :</label>
                  <input
                    type="number"
                    value={
                      formData.requirements.find(
                        (req) => req.categoryId === selectedCategoryId
                      )?.quantity || ""
                    }
                    onChange={(e) =>
                      handleQuantityChange(selectedCategoryId, e.target.value)
                    }
                  />
                </div>
              )}
              <div>
                {formData.requirements.map((req) => (
                  <div key={req.categoryId}>
                    <label>{`Quantité pour ${categorylist.find(category => category._id === req.categoryId).name}:`}</label>
                    <input
                      type="number"
                      value={req.quantity}
                      onChange={(e) =>
                        handleQuantityChange(req.categoryId, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <div>
                <button type="submit">Créer le niveau</button>
                <button type="button" onClick={handleCancel}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}
      </Main>
      <Footer />
    </>
  );
}
