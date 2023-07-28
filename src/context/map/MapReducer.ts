

//@ts-ignore
import { Map, Marker } from '!mapbox-gl';
import { MapState } from './MapProvider';
import { Distance } from '../../interfaces';

type MapAction = 
| { type: 'setMap', payload: Map }
| { type: 'setMarkers', payload: Marker[] }
| { type: 'setDistance', payload: Distance }
| { type: 'removeDistance' }

export const MapReducer = ( state: MapState, action: MapAction ): MapState => {
    
   switch ( action.type ) {
    
      case 'setMap':
         return {
            ...state,
            isMapReady: true,
            map: action.payload
         };

      case 'setMarkers':
         return {
            ...state,
            markers: action.payload
         };
         
      case 'setDistance':
         return {
            ...state,
            distance: action.payload
         };

      case 'removeDistance':
         return {
            ...state,
            distance: undefined
         };

      default:
         return state;
   }
};
