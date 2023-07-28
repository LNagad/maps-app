import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';

// @ts-ignore
import mapboxgl from '!mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoibG5hZ2FkIiwiYSI6ImNsa2sxaHVjNzB2cm4zZW9oNHFyaGdyZ2IifQ.eZsr1_rH5Y60MkEFx3RbjA';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
  
if ( !navigator.geolocation ) {
   alert('Your browser doesn\t have the geolocation option enabled ');
   throw new Error('Your browser doesn\t have the geolocation option enabled ');
}


root.render(
   <MapsApp />
   // <React.StrictMode>
   // </React.StrictMode>
);
