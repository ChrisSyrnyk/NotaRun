
import styles from './styles/styles.css'
import { MapComponent } from './components/MapComponent';
import React, {useState} from 'react';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};



function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}



function App() {

  const[currentLocation, setCurrentLocation] = useState([51.505, -0.09])
  
  function success(pos) {
    const crd = pos.coords;
    console.log(pos.coords);
    setCurrentLocation([crd.latitude, crd.longitude]);

  }

  function updateCurrentLocation(){
    console.log(currentLocation)
  }

  return (
    <>
      <div className='header-container'>
        <div className='site-name'>Re<div className='bold-font'>D</div>irect</div>
      </div>
      <div className='location'>
        <div className='selection-text center'>Location</div>
      </div>
      <button onClick = {()=>navigator.geolocation.getCurrentPosition(success, error, options)}>position</button>
      <button onClick = {()=> updateCurrentLocation()}>log location</button>

      <MapComponent zoom = {13} center = {currentLocation}/>

      
    </>
  );
}

export default App;
