import { MapContext, PlacesContext } from '../context';
import { Feature } from '../interfaces/Places';
import { useContext } from 'react';

interface Props {
    place: Feature,
    handleActiveId: ( id: string ) => void,
    activeId: string
}

export const SearchResultsListItem = ( {  place, activeId, handleActiveId }: Props) => {

   const { map, getRouteBetweenPoints } = useContext( MapContext );
   const { userLocation } = useContext( PlacesContext );

   const btnActive =  activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'; 
   
   const onPlaceClick = () => {
      
      handleActiveId( place.id );

      const [ lng, lat ] = place.center;

      map?.flyTo({
         zoom: 17,
         center: [ lng, lat ]
      });
   };

   const getRoutes = () => {
      if ( !userLocation ) return;
      const [ lng, lat ] = place.center;
  
      getRouteBetweenPoints( userLocation, [ lng, lat ] );
   };

 
   return (
      <li 
         className={`list-group-item list-group-item-action pointer ${ activeId === place.id ? 'active' : '' } `}
         onClick={ onPlaceClick }
      >
         <h6>{ place.text_es }</h6>
         <p className=" fs-6">
            { place.place_name_es }
         </p>
         <button 
            className={`btn ${ btnActive }  btn-sm`}
            onClick={ getRoutes }
         >
            Direcciones
         </button>
      </li>
   );
};
