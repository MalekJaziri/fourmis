import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addBuildingCategory, deleteBuildingCategory } from '../../store/slice/buildingsCategoryrSlice.js';
import { Header } from '../../components/header/Header.js';
import { Main } from '../../components/main/Main.js';
import { Nav } from '../../components/nav/Nav.js';
import { Footer } from '../../components/footer/Footer.js';
import { postCreateBuildingCategory, getBuildingCategory, delBuildingCategory } from '../../helpers/backend_helper.js';
import { Link } from "react-router-dom";
import { ConfirmationPop } from "../../components/ConfirmationPop/ConfirmationPop.js";
import {SelectPhoto} from "../../components/selectPhoto/SelectPhoto.js"
import {BASE_URL} from '../../helpers/routes.js'
import {adminGetPhoto} from '../../helpers/backend_helper.js'

export function FormCategoriesBatiments() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.buildingCategory.categories);
    const [categorylist, setCategorylist] = useState([]);
    const [addingCategory, setAddingCategory] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [selectedCategoryImage, setSelectedCategoryImage] = useState(null);
    const [photoList, setPhotoList] = useState([]);
    
    const [showSelectPhoto, setShowSelectPhoto] = useState();



    useEffect(() => {
        getBuildingCategory()
            .then(data => {
                console.log(data)
                setCategorylist(data);
                dispatch(addBuildingCategory(data));
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    
    useEffect(() => {
    // Effectuez une requête API pour obtenir la liste des noms de fichiers d'images
    // dans le répertoire backend/public/images/photoProfil
    // Assurez-vous que votre backend fournit ces données via une API.

    // Exemple de requête fictive à des fins d'illustration :
    adminGetPhoto("photoBatiment")
    
      .then(
        data => {
            setPhotoList(data)
            console.log(data)
        }
        )
    .catch(err => {
        console.log(err)
      })
      
      
  }, []);
    
    
    const handleDeleteCategory = (category) => {
        setCategoryToDelete(category);
        setShowDeleteConfirmation(true);
    }
    
    const handleConfirmDeleteCategory = () => {
        // Call your API to delete the category
        delBuildingCategory(categoryToDelete._id)
            setShowDeleteConfirmation(false);
    }
    
    
    const handleCancelDeleteCategory = () => {
        // Clear the categoryToDelete and hide the confirmation pop-up
        setCategoryToDelete(null);
        setShowDeleteConfirmation(false);
    }



    const handleAddCategory = () => {
        setAddingCategory(true);
        setShowSelectPhoto(true);
    };

    const handleCancel = () => {
        setAddingCategory(false);
    };
    
    const handleCategoryImageSelect = (image) => {
        const imageUrl = `${BASE_URL}/images/photoProfil/${image}`;
    console.log(imageUrl)
      setSelectedCategoryImage(imageUrl);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        
        const categoryName = event.target.elements.categoryName.value; // Récupérez le nom de la catégorie
    const imageUrl = selectedCategoryImage; // Récupérez l'URL de l'image

        // Envoyer la requête au backend pour créer une nouvelle catégorie
        postCreateBuildingCategory({ name: categoryName, image: imageUrl })
            .then(response => {
                console.log(response)
                if (response && response.data) {
                    // Ajouter la nouvelle catégorie à l'état Redux
                    dispatch(addBuildingCategory(response.data));
                    setShowSelectPhoto(false);
                    setAddingCategory(false);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <Header />
           
            <Main>
            {showDeleteConfirmation && (
                <ConfirmationPop
                    message={`Confirmez la suppression de la catégorie "${categoryToDelete.name}" ?`}
                    confirmText="Confirmer"
                    cancelText="Annuler"
                    onConfirm={handleConfirmDeleteCategory}
                    onCancel={handleCancelDeleteCategory}
                />
            )}
                <div>
                    <h2>Liste des catégories de bâtiments :</h2>
                    <ul>
                        {categorylist.map((category) => (
                        <div key={category._id}>
                          <li>
                            {category.name}
                            {category.image && (
                                <img src={category.image} alt={category.name} style={{ width: '100px', height: '100px' }} />
                            )}   
                          </li>
                          <button onClick={() => handleDeleteCategory(category)}>Supprimer la catégorie</button>
                        </div>
                        ))}
                    </ul>
                    <button onClick={handleAddCategory}>Ajouter nouvelle catégorie</button>
                </div>

                {addingCategory && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nom de la catégorie de bâtiment :</label>
                            <input
                                type="text"
                                name="categoryName" // Utilisez le nom pour récupérer la valeur dans handleSubmit
                            />
                        </div>
                        {showSelectPhoto && (
                            <SelectPhoto
                              photoList={photoList} // Remplacez par la liste de vos images
                              subfolder="photoBatiment" // Remplacez par le sous-dossier approprié
                              text="Sélectionnez une photo pour la catégorie"
                              onImageSelect={handleCategoryImageSelect}
                              onCancel={handleCancel}
                            />
                        )}
                        <div>
                            <button type="submit">Créer la catégorie de bâtiment</button>
                            <button type="button" onClick={handleCancel}>Annuler</button>
                        </div>
                    </form>
                )}
                <Link to="/Profil">Retour à la page précédente</Link>
            </Main>
            <Footer />
        </>
    );
}
