import { PlaceProvider } from "./context"
import { HomeScreen } from './screen';
import './styles.css'
import { MapProvider } from './context/map/MapProvider';

export const MapsApp = () => {
    return (
        <PlaceProvider >
            <MapProvider >
                <HomeScreen />
            </MapProvider>
        </PlaceProvider>
    )
}
