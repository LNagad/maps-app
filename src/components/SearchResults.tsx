import { useContext, useState } from 'react';
import { PlacesContext } from '../context';
import { LoadingPlaces } from './LoadingPlaces';
import { SearchResultsListItem } from './SearchResultsListItem';

export const SearchResults = () => {

   const { places, isLoadingPlaces } = useContext( PlacesContext );
   const [activeId, setActiveId] = useState('');

   const handleActiveId = ( id: string ) => {
      setActiveId( id );
   };
   
   if ( isLoadingPlaces ) {
      return (
         <LoadingPlaces />
      );
   }

   if ( places.length === 0 ) return (<></>);

   return (
      <ul className="list-group mt-3">
         { places.map( place => (
            <SearchResultsListItem 
               key={ place.id } 
               place={ place }
               activeId={ activeId }
               handleActiveId={ handleActiveId } />
         )) }        
      </ul>
   );
};
