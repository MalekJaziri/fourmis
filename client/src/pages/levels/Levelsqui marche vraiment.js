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

  console.log(formData);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      requirements: [...prevData.requirements, { categoryId, quantity: 0 }],
    }));
  };

  const handleQuantityChange = (categoryId, quantity) => {
    const updatedRequirements = formData.requirements.map((req) =>
      req.categoryId === categoryId ? { ...req, quantity } : req
    );
    setFormData((prevData) => ({
      ...prevData,
      requirements: updatedRequirements,
    }));
  };

  const handleAddCategory = () => {
    setAddingCategory(true);
  };

  const handleCancel = () => {
    setAddingCategory(false);
    setFormData({
          name: "",
          requirements: [],
        });
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

          <button onClick={handleAddCategory}>Ajouter un nouveau niveau</button>
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
                  value={formData.requirements[formData.requirements.length - 1]?.categoryId || ""}
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
              {formData.requirements.map((req, index) => (
                <div key={index}>
                  <label>Quantité pour la catégorie "{categorylist.find(category => category._id === req.categoryId)?.name}"</label>
                  <input
                    type="number"
                    value={req.quantity}
                    onChange={(e) => handleQuantityChange(req.categoryId, e.target.value)}
                  />
                </div>
              ))}
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
