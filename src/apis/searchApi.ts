import axios from 'axios';

const searchApi = axios.create({
   baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
   params: {
      limit: 2,
      language: 'es',
      country: 'do',
      access_token: process.env.REACT_APP_MAPBOX_TOKEN
   }
});

export default searchApi;