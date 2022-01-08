/* eslint import/no-webpack-loader-syntax: off */
//@ts-ignore
import { Map, Marker } from "!mapbox-gl";
import { MapState } from "./MapProvider";

type MapAction = 
| { type : 'setMap' , payload : Map }
| { type : 'setMarkets' , payload : Marker[] }

export const mapReducer = ( state: MapState ,action: MapAction ): MapState => {
    
    switch (action.type) {
        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            };
        case 'setMarkets':
            return {
                ...state,
                markers :  action.payload
            }
        default:
            return state;
    }
}
