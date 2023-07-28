import { useContext } from 'react';
import { MapContext } from '../context';

export const DistanceStats = () => {

   const { distance } = useContext( MapContext );
   
   if ( !distance ) return (<></>);

   return (
      <div className="distance-container">
         <p >Distancia: <span>{ distance.kms } kms</span></p>
         <p >Distancia: <span>{ distance.minutes } minutos</span></p>
      </div>
   );
};
