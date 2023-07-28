import { BtnMyLocation, DistanceStats, MapView, ReactLogo, SearchBar } from '../components';

export const HomeScreen = () => {
   return (
      <div>
         <MapView />
         <BtnMyLocation />
         <ReactLogo />
         <SearchBar />
         <DistanceStats />
      </div>
   );
};
