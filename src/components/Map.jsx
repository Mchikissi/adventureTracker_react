import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import styles from './Map.module.css';
import {useCities} from '../contexts/CitiesContext';
import { useEffect } from 'react';
import { useGeolocation } from '../Hooks/useGeolocation';
import Button from './Button';
import { useURLPosition } from '../Hooks/useURLPosition';

export default function Map() {

  const [position, setPosition] = useState([-1.11, 37.07]);
  const {cities} = useCities();
  const {isLoading: isLoadingPosition, position:geolocationPosition, getPosition } = useGeolocation();

  const [lat, lng] = useURLPosition();

  useEffect(function (){
    if( lat && lng) setPosition([lat, lng])
  }, [lat, lng])

  useEffect(function(){
    if(geolocationPosition)
    setPosition([geolocationPosition.lat, geolocationPosition.lng])
  }, [geolocationPosition])

  return (
    <div className={styles.mapContainer} >
      {!geolocationPosition && <Button type='position' onClick={getPosition}>
        {isLoadingPosition? 'Loading...' : 'Use your position'}
      </Button>}
    <MapContainer 
    center={position} 
    zoom={13} 
    scrollWheelZoom={true} 
    className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map( city => <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span><span>{city.cityName}</span>
      </Popup>
    </Marker>)}
      <DetectClick/>
    <ChangeCenter position={position}/>
  </MapContainer>
    </div>
  )
}

function ChangeCenter({position}){
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick(){
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  })
}
