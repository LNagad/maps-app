import { useContext, useLayoutEffect, useRef } from 'react';

//@ts-ignore
import { Map } from '!mapbox-gl';

import { MapContext, PlacesContext } from '../context';

import { Loading } from './';

export const MapView = () => {

   const { setMap } = useContext( MapContext );
   const { isLoading, userLocation } = useContext( PlacesContext );

   const mapDiv = useRef<HTMLDivElement>(null);

   useLayoutEffect(() => {
      if ( !isLoading ) {
         const map = new Map({
            container: mapDiv.current!,
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: userLocation,
            zoom: 15, // starting zoom
         });

         setMap( map );
      }
   }, [ isLoading ]);

   if ( isLoading ) {
      return <Loading />;
   }
    
   return (
      <div 
         ref={ mapDiv }
         style={{
            height: '100dvh',
            width: '100dvw',
            position: 'fixed',
         }}
      >
          
      </div>
   );
};
