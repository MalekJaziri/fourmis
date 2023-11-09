import React, { useEffect, useState } from "react";
import { postCreateLevels, getLevels, getBuildingCategory } from "../../helpers/backend_helper.js";


export function BuildingForm({ formData, handleChange, handleQuantityChange, index, categorylist }) {
    
    
    
     
  return (
    <div key={index}>
      <div>
        <label>Catégorie de bâtiment :</label>
        <select
          name={`requirements[${index}].categoryId`}
          value={formData.requirements[index].categoryId}
          onChange={(e) => handleChange(e, index)}
        >
          <option value="">Sélectionnez une catégorie</option>
          {categorylist.map((category, idx) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {formData.requirements[index].categoryId && (
        <div>
          <label>{`Quantité de ${categorylist.find(category => category._id === formData.requirements[index].categoryId).name} requis:`}</label>
          <input
            type="number"
            name={`requirements[${index}].quantity`}
            value={formData.requirements[index].quantity}
            onChange={(e) => handleQuantityChange(e, index)}
          />
        </div>
      )}
    </div>
  );
}