import { ChangeEvent, useContext, useRef } from 'react';
import { PlacesContext } from '../context';
import { SearchResults } from './SearchResults';

export const SearchBar = () => {

   const { searchPlacesByTerm,  } = useContext( PlacesContext );
   const debounceRef =  useRef<NodeJS.Timeout>();

   const onQueryChange = ( { target }: ChangeEvent<HTMLInputElement>  ) => {
      if ( debounceRef.current )
         clearTimeout( debounceRef.current );

      debounceRef.current = setTimeout(() => {
         // todo: ejecutar consulta
         
         searchPlacesByTerm( target.value );

      }, 350);
   };

   return (
      <div className="search-container">
         <input 
            type="text"
            className="form-control" 
            placeholder="Buscar lugar..."
            onChange={ onQueryChange  }
         />
         <SearchResults />
      </div>
   );
};
