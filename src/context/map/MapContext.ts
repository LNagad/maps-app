
//@ts-ignore
import { Map } from '!mapbox-gl';
import { createContext } from 'react';
import { Distance } from '../../interfaces';


interface MapContextProps {
    isMapReady: boolean;
    map?: Map;
    distance?: Distance;

    // Methods

    setMap: ( map: Map ) => void;
    getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>;
}

export const MapContext = createContext({} as MapContextProps);