/* eslint import/no-webpack-loader-syntax: off */
import React from 'react';
import ReactDOM from 'react-dom';

import { MapsApp } from './MapsApp';

//@ts-ignore
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicmljYXJkb2xtbCIsImEiOiJja3BjeDN5MmExYThvMm9vZmFrNzRjc2p3In0.dzA89fCnoXr1Rm7QGqH87A';


if( !navigator.geolocation ){
    const mensaje = 'Tu navegador no tiene opción de Geolocalización'
    alert(mensaje);
    throw new Error(mensaje);
}


ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
);

