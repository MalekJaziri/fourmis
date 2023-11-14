import { Footer } from '../../components/footer/Footer.js';
import { Header } from '../../components/header/Header.js';
import { Main } from '../../components/main/Main.js';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../store/slice/userSlice.js';
import { postAddImages } from '../../helpers/backend_helper.js';
import './FormImage.scss';

export function FormImages() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSubfolder, setSelectedSubfolder] = useState('photoProfil');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubfolderChange = (event) => {
    setSelectedSubfolder(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (selectedFile) {
      formData.append('file', selectedFile);
      formData.append('subfolder', selectedSubfolder);
      postAddImages(formData);
    } else {
      console.log('Aucun fichier sélectionné.');
    }
  };

  return (
    <>
      <Header />
      <Main>
        <div className="form-image">
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label>Sélectionnez un fichier :</label>
              <input type="file" name="file" onChange={handleFileChange} />
            </div>
            <label>Sélectionnez le type de photo :</label>
            <select name="subfolder" onChange={handleSubfolderChange}>
              <option value="photoProfil">Photo de profil</option>
              <option value="fourmis">Photo de fourmis</option>
              <option value="photoBatiment">Photos de batiments</option>
            </select>

            <div>
              <button className="button" type="submit">
                Envoyer
              </button>
            </div>
          </form>

          <Link to="/Profil">Retour </Link>
        </div>
      </Main>
      <Footer />
    </>
  );
}
