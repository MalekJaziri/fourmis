import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/footer/Footer.js";
import { Header } from "../../components/header/Header.js";
import { Main } from "../../components/main/Main.js";
import { Link } from "react-router-dom";
import { getLevels, getBuildingCategory, postCreateLevels, delLevels } from "../../helpers/backend_helper.js";
import './Levels.scss';

export function Levels() {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.buildingCategory.categories);
  const [categorylist, setCategorylist] = useState([]);
  const [levelsList, setLevelsList] = useState([]);
  const [addingCategory, setAddingCategory] = useState(false);

  useEffect(() => {
    getLevels()
      .then((levels) => {
        setLevelsList(levels);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setLevelsList]);

  useEffect(() => {
    getBuildingCategory()
      .then((data) => {
        setCategorylist(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    requirements: [],
  });


  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const isCategoryAlreadySelected = formData.requirements.some(req => req.categoryId === categoryId);

    if (!isCategoryAlreadySelected) {
      setFormData((prevData) => ({
        ...prevData,
        requirements: [...prevData.requirements, { categoryId, quantity: 0 }],
      }));
    }
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
    delLevels(level._id)
      .then(() => {
        setLevelsList((prevLevels) => prevLevels.filter((l) => l._id !== level._id));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du niveau : ", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postCreateLevels(formData)
      .then((response) => {
        setFormData({
          name: "",
          requirements: [],
        });
        setAddingCategory(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteLevel = (levelId) => {
    delLevels(levelId)
      .then(() => {
        setLevelsList((prevLevels) => prevLevels.filter((level) => level._id !== levelId));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du niveau : ", error);
      });
  };

  return (
    <>
      <Header />
      <Main>
        <div className="levels">
          <div className="levels-list">
            <h2>Liste des niveaux disponibles :</h2>
            <ul>
              {levelsList.map((level) => (
                <li className="vignette" key={level._id}>
                  <h3 className="name">{level.name}</h3>
                  <p>Catégories de bâtiment :</p>
                  <ul>
                    {level.requiredBuildingCategory.map((req, index) => {
                      const matchingCategory = categorylist.find(category => category._id === req.category);
                      return (
                        <li key={index}>
                          {matchingCategory ? matchingCategory.name : "Catégorie inconnue"}: {req.quantity}
                        </li>
                      );
                    })}
                  </ul>
                  <button className="button" onClick={() => handleDeleteLevel(level._id)}>Supprimer</button>
                </li>
              ))}
            </ul>
            <button className="button" onClick={handleAddCategory}>Ajouter un nouveau niveau</button>
          </div>

          {addingCategory && (
            <div className="level-creation">
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
                  <button className="button" type="submit">Créer le niveau</button>
                  <button className="button" type="button" onClick={handleCancel}>
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}
          <Link to="/Profil">Retour</Link>
        </div>
      </Main>
      <Footer />
    </>
  );
}
