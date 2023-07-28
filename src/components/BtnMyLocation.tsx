import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';

import { BiCurrentLocation } from 'react-icons/bi';

export const BtnMyLocation = () => {

   const { isMapReady, map } = useContext( MapContext );
   const { userLocation } = useContext( PlacesContext );
   
   const onClick = () => {
      if ( !isMapReady ) throw new Error('Map is not ready');
      if ( !userLocation ) throw new Error('User location not found');

      map?.flyTo({
         center: userLocation,
         zoom: 18
      });
   };


   return (
      <div className='btn-my-location-container'>
         <BiCurrentLocation 
            className='btn-my-location' 
            size={23} 
            onClick={ onClick }/>
      </div>
   );
};
