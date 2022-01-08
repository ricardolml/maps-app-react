import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";

export const BtnMyLocation = () => {
    const { userLocation } = useContext(PlacesContext);
    const { map , isMapReady } = useContext(MapContext);

    const handleClick = () => {
        if ( !isMapReady ) throw new Error('El mapa no está listo');
        if ( !userLocation ) throw new Error('No hay ubicacion de usuario');

        map?.flyTo({
            zoom : 14,
            center: userLocation
        });
    }

    return (
        <button 
            className="btn btn-primary"
            onClick={handleClick} 
            style={{
                position:'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999
            }}
        >
            Mi ubicación
        </button>
    )
}
