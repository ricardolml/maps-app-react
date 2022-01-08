import { ChangeEvent, useContext, useRef } from "react";
import { SearchResults } from ".";
import { PlacesContext } from '../context/places/PlaceContext';

export const SearchBar = () => {

    const debouncerRef = useRef<NodeJS.Timeout>();
    const { searchPlacesByTerm } = useContext(PlacesContext)

    const onQueryChanged = ( event : ChangeEvent<HTMLInputElement> ) => {

        if ( debouncerRef.current ) 
            clearTimeout( debouncerRef.current );
        
        debouncerRef.current = setTimeout(() => {
            // console.log();
            searchPlacesByTerm(event.target.value); 
        }, 350);
    
    }

    return (
        <div className="search-container">
            <input
                type='text'
                className="form-control"
                placeholder="Buscar lugar..."
                onChange={ onQueryChanged }
            />

            <SearchResults />
        </div>
    )
}
