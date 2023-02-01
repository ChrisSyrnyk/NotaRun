
import styles from './styles/styles.css'
import { MapComponent } from './components/MapComponent';
import { HeaderComponent } from './components/HeaderComponent.tsx';
import React, {useState} from 'react';

function App() {

  const[currentLocation, setCurrentLocation] = useState([49, -96]);
  const[currentZoom, setCurrentZoom] = useState([3]);

  //geonavigate is slow. Try using ip-api
  //https://ip-api.com/docs/api:json
  //added benefit of returning more information (country, city, zip... )
  
  function retrieveCurrentCoord(){
    fetch('http://ip-api.com/json/')
    .then(function(response){
      return response.json()
    })
    .then(function(response){
      console.log(response);
      setCurrentLocation([response.lat,response.lon])
      setCurrentZoom(10)
    })
  }
  
  //geo locate way
  function success(pos) {
    const crd = pos.coords;
    setCurrentLocation([crd.latitude, crd.longitude]);
    setCurrentZoom(14);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  return (
    <>
      <div className='header-container'>
        <div className='site-name'>Re<div className='bold-font'>D</div>irect</div>
      </div>
      <MapComponent zoom = {currentZoom} center = {currentLocation}/>
    </>
  );
}

export default App;
