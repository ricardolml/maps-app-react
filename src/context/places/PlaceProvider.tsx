import { useEffect, useReducer } from 'react';
import { apiSearch } from '../../apis';
import { getUserLocation } from '../../helpers';
import { Feature, PlacesResponse } from '../../interfaces/places';
import { PlacesContext } from './PlaceContext';
import { PlaceReducer } from './PlaceReducer';

export interface PlacesState{
    isLoading: boolean;
    userLocation? : [ number, number ];
    isLoadingPlaces: boolean;
    places: Feature[];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
}

interface Props{
    children: JSX.Element | JSX.Element[];
}

export const PlaceProvider = ( { children } : Props ) => {

    const [state, dispatch] = useReducer(PlaceReducer, INITIAL_STATE);

    useEffect(() => {
        getUserLocation()
        .then( lngLat => dispatch( { type: 'setUserLocation' , payload : lngLat  } ) );
    }, []);

    const searchPlacesByTerm = async( q : string): Promise<Feature[]> => {
        if( q.length === 0 ){
            dispatch( { type : 'setPlaces', payload: [] } );
            return [] ; 
        } 
        if( !state.userLocation ) throw new Error( 'No hay ubicación del usuario' );

        dispatch( { type:'setLoadingPlaces' } );

        const resp = await apiSearch.get<PlacesResponse>(`/${q}.json?`, {
            params : {
                proximity: state.userLocation.join(',')
            }
        });
        dispatch( { type:'setPlaces', payload: resp.data.features } );
        return resp.data.features;
    }

    return (
        <PlacesContext.Provider value={{
            ...state,

            //methods

            searchPlacesByTerm
        }}>
            { children }
        </PlacesContext.Provider >
    )
}