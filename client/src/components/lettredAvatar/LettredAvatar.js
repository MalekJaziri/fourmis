import React from "react";
import "./LettredAvatar.scss"


export function LetteredAvatar({ name, surname }) {
  function getInitials(name, surname) {
      // Use the first character of the name and surname for initials
    const firstNameInitial = name ? name[0] : "";
    const lastNameInitial = surname ? surname[0] : "";
    return `${firstNameInitial}${lastNameInitial}`;
    
  }

  function generateBackground(name, surname) {
    const colors = ["#606c38", "#283618", "#dda15e", "#bc6c25"];
    const fullName = name;
    
    let hash = 0;
    for (let i = 0; i < fullName.length; i += 1) {
    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const randomIndex = Math.abs(hash) % colors.length; // Utiliser la valeur du hachage pour choisir une couleur dans le tableau
    
    return colors[randomIndex];
    }

 

  let initials = getInitials(name, surname);
  let color = generateBackground(name, surname);
  
  const customStyle = {
   
    background: color, // Call the function to generate a random background color
    
  };

  return (
    <div className="custom-avatar" style={customStyle}>
      <span className="spanStyle" > {initials} </span>
    </div>
  );
}