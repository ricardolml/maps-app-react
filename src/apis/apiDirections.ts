import axios from 'axios';

const apiDirections = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params:{
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token : '', // your access_token
    }
});

export default apiDirections;