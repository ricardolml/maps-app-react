import axios from 'axios';

const apiSearch = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params:{
        limit : 5,
        language: 'es',
        access_token : '', // your access_token
    }
});

export default apiSearch;