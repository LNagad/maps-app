import { MapState } from '../context/map/MapProvider';

export const clearDirectionPolyLine = ( state: MapState ) => {
   if ( state.map?.getLayer('RouteString') ) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
   } 
};
