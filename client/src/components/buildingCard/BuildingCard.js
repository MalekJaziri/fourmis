import './BuildingCard.scss'

export function BuildingCard ({ name, photo }) {
    
    
    return (
        <>
            <div className="building">
                <div className="building-photo">
                    <img src={photo} alt={name} />
                </div>
                <span>{name}</span>
             </div>
        </>
        
        );
    
}