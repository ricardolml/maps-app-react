/* eslint import/no-webpack-loader-syntax: off */
//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl';
import { MapContext } from './MapContext';
import { useContext, useEffect, useReducer } from 'react';
import { mapReducer } from './MapReducer';
import { PlacesContext } from '../';
import { apiDirections } from '../../apis';
import { DirectionResponse } from '../../interfaces/direction';

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map : undefined,
    markers: []
}

interface Props{
    children: JSX.Element | JSX.Element[];
}
export const MapProvider = ({ children } : Props ) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE );

    const { places } = useContext(PlacesContext);

    useEffect(() => {
        state.markers.forEach( marker => marker.remove() );
        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [lng , lat ] = place.center;
            const poput = new Popup().setHTML(`
                <h6>${place.text_es}</h6>
                <p>${place.place_name_es}</p>
            `);
            const newMarket = new Marker()
            .setPopup(poput)
            .setLngLat( [lng , lat] )
            .addTo( state.map! );

            newMarkers.push(newMarket);
        }

        //TODO: limpiar polyline

        dispatch( { type:'setMarkets', payload: newMarkers } );
        
    }, [places])

    const setMap = ( map: Map ) => {
        
        const myLocationPopup =  new Popup()
        .setHTML(`
            <h4>Aquí estoy</h4>
            <p>En algún lugar del mundo</p>
        `);

        new Marker({
            color: '#61DAFB'
        })
        .setLngLat( map.getCenter() )
        .setPopup( myLocationPopup )
        .addTo( map );
        

        dispatch( { type : 'setMap' , payload: map }  );
    }

    const getRouteBetweenPoints = async ( start: [number , number] , end: [number, number] ) => {

        const resp = await apiDirections.get<DirectionResponse>(`/${start.join(',')};${end.join(',')}`);
        const { distance, duration , geometry } = resp.data.routes[0];
        const { coordinates: coords } = geometry;
        let kms = distance / 1000;
        kms = Math.round( kms * 100 );
        kms /= 100;

        const minutes = Math.floor( duration / 60 );

        const bound = new LngLatBounds(
            start,
            start
        );

        for (const coord of coords) {
            const newCoord: [number, number] = [ coord[0] , coord[1] ] ;
            bound.extend( newCoord );
        }

        state.map?.fitBounds(bound, {
            padding: 200
        });

        //Polyline

        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        if( state.map?.getLayer('RouteString') ){
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData );
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                "line-color" : 'black',
                "line-width" : 3
            }
        });
        console.log(kms , minutes);
    }

    return (
        <MapContext.Provider value={{
            ...state,

            //Methods
            setMap,
            getRouteBetweenPoints
        }}>
            { children }
        </MapContext.Provider>
    )
}
