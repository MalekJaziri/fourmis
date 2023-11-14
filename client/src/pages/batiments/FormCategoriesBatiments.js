import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addBuildingCategory, deleteBuildingCategory } from '../../store/slice/buildingsCategoryrSlice.js';
import { Header } from '../../components/header/Header.js';
import { Main } from '../../components/main/Main.js';
import { Nav } from '../../components/nav/Nav.js';
import { Footer } from '../../components/footer/Footer.js';
import { postCreateBuildingCategory, getBuildingCategory, delBuildingCategory } from '../../helpers/backend_helper.js';
import { Link } from 'react-router-dom';
import { ConfirmationPop } from '../../components/ConfirmationPop/ConfirmationPop.js';
import { SelectPhoto } from '../../components/selectPhoto/SelectPhoto.js';
import { BASE_URL } from '../../helpers/routes.js'
import { adminGetPhoto } from '../../helpers/backend_helper.js'
import './FormCategoriesBatiments.scss'

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
                setCategorylist(data);
                dispatch(addBuildingCategory(data));
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        adminGetPhoto("photoBatiment")
            .then(data => {
                setPhotoList(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const handleDeleteCategory = (category) => {
        setCategoryToDelete(category);
        setShowDeleteConfirmation(true);
    }

    const handleConfirmDeleteCategory = () => {
        delBuildingCategory(categoryToDelete._id)
        setShowDeleteConfirmation(false);
    }

    const handleCancelDeleteCategory = () => {
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
        setSelectedCategoryImage(imageUrl);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const categoryName = event.target.elements.categoryName.value;
        const imageUrl = selectedCategoryImage;

        postCreateBuildingCategory({ name: categoryName, image: imageUrl })
            .then(response => {
                if (response && response.data) {
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
                <div className="cat-bat">
                    {showDeleteConfirmation && (
                        <ConfirmationPop
                            message={`Confirmez la suppression de la catégorie "${categoryToDelete.name}" ?`}
                            confirmText="Confirmer"
                            cancelText="Annuler"
                            onConfirm={handleConfirmDeleteCategory}
                            onCancel={handleCancelDeleteCategory}
                        />
                    )}
                    <div className="liste-bat">
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
                                    <button className="button" onClick={() => handleDeleteCategory(category)}>Supprimer la catégorie</button>
                                </div>
                            ))}
                        </ul>
                        <button className="button" onClick={handleAddCategory}>Ajouter nouvelle catégorie</button>
                    </div>

                    {addingCategory && (
                        <form onSubmit={handleSubmit}>
                            <div className="name">
                                <label>Nom de la catégorie de bâtiment :</label>
                                <input
                                    type="text"
                                    name="categoryName"
                                />
                            </div>
                            {showSelectPhoto && (
                                <SelectPhoto
                                    photoList={photoList}
                                    subfolder="photoBatiment"
                                    text="Sélectionnez une photo pour la catégorie"
                                    onImageSelect={handleCategoryImageSelect}
                                    onCancel={handleCancel}
                                />
                            )}
                            <div>
                                <button className="button" type="submit">Créer la catégorie de bâtiment</button>
                                <button className="button" type="button" onClick={handleCancel}>Annuler</button>
                            </div>
                        </form>
                    )}
                    <Link className="retour" to="/Profil">Retour</Link>
                </div>
            </Main>
            <Footer />
        </>
    );
}
