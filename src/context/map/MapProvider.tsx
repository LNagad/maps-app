
import { useContext, useEffect, useReducer } from 'react';

//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl';

import { directionsApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/Directions';
import { PlacesContext, MapContext, MapReducer } from '../';
import { clearDirectionPolyLine } from '../../helpers';
import { Distance } from '../../interfaces';

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[],
    distance?: Distance
}

const INITIAL_STATE: MapState = {
   isMapReady: false,
   map: undefined,
   markers: [],
   distance: undefined
};

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const MapProvider = ({ children } : Props) => {

   const [state, dispatch] = useReducer( MapReducer, INITIAL_STATE);
   const { places } = useContext( PlacesContext );
   
   useEffect(() => {
    
      //* Cleaning markers in case exists

      state.markers.forEach( marker => marker.remove() );

      //* Cleaning direction polyline in case exists
      clearDirectionPolyLine( state ); 
      
      //* Cleaning direction distance stats
      dispatch({ type: 'removeDistance'});


      const newMarkers: Marker[] = [];

      for (const place of places) {
         const [ lng, lat ] = place.center;
     
         const popup = new Popup()
            .setHTML(`
               <h6>${ place.text_es }</h6>
               <p>${ place.place_name_es }</p>
            `);
 
         const newMarker = new Marker()
            .setPopup( popup )
            .setLngLat([ lng, lat ])
            .addTo( state.map! );

         newMarkers.push( newMarker );
      }

      dispatch({ type: 'setMarkers', payload: newMarkers });

   }, [ places ]);
   
   const setMap = ( map: Map ) => {
      
      const myLocationPopup = new Popup()
         .setHTML(`
         <h4> Aqui estoy </h4>
         <p>En algun lugar del mundo</p>
         `);

      // agregar marker en la ubicacion del usuario
      new Marker({color: '#61DAFB'})
         .setPopup( myLocationPopup )
         .setLngLat( map.getCenter() )
         .addTo( map );

      dispatch({ type: 'setMap', payload: map });
   };

   const getRouteBetweenPoints = async( start: [number, number], end: [number, number]) => {
      const resp = await directionsApi
         .get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') } `);

      const { distance, duration, geometry } = resp.data.routes[0];
      const { coordinates: coords } = geometry;
      
      let kms = distance / 1000;
      kms = Math.round( kms * 100 );
      kms /= 100;

      const minutes = Math.floor( duration / 60 );

      // * Set Distance
      dispatch({ type: 'setDistance', payload: { kms, minutes } });
   
      const bounds = new LngLatBounds(
         start,
         start
      );

      for (const coord of coords) {
         const newCord: [number, number] = [ coord[0], coord[1] ];
         bounds.extend( newCord );
      }

      state.map?.fitBounds( bounds, {
         padding: 200
      } );

      // Polyline
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
      };


      //? remove layout if already exist
      clearDirectionPolyLine( state ); 

      state.map?.addSource('RouteString', sourceData);
      state.map?.addLayer({
         id: 'RouteString',
         type: 'line',
         source: 'RouteString',
         layout: {
            'line-cap': 'round',
            'line-join': 'round'
         },
         paint: {
            'line-color': '#789ECF',
            'line-width': 8
         }
      });
   };

   
   return (
      <MapContext.Provider value={{
         ...state,

         // Methods
         setMap,
         getRouteBetweenPoints,
      }}>
         { children }
      </MapContext.Provider>
   );
};
