import React, { useState } from "react";
import './SelectPhoto.scss'
import {BASE_URL} from '../../helpers/routes.js'

export function SelectPhoto({ photoList, subfolder, text, onImageSelect, onCancel }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        console.log("click")
        setSelectedImage(image);
        onImageSelect(image); // Appeler la fonction de rappel pour transmettre l'image sélectionnée
    };

    return (
        <div>
            <h2>{text}</h2>
            <div className="image-list">
                {photoList.map((imageName) => (
                  <div className="img-container" key={imageName}>
                    <img
                      src={`${BASE_URL}/images/${subfolder}/${imageName}`}
                      alt={imageName}
                      onClick={() => handleImageClick(imageName)}
                      className={selectedImage === imageName ? "selected" : ""}
                    />
                  </div>
                ))}
            </div>
            
      <button onClick={onCancel}>Annuler</button>
    </div>
        
    );
}
