
import styles from './styles/styles.css'
import { MapComponent } from './components/MapComponent';
import React, {useState} from 'react';

function App() {

  const[currentLocation, setCurrentLocation] = useState([51.505, -0.09]);
  const[currentZoom, setCurrentZoom] = useState([2]);

  
  
  function success(pos) {
    const crd = pos.coords;
    setCurrentLocation([crd.latitude, crd.longitude]);
  }



  return (
    <>
      <div className='header-container'>
        <div className='site-name'>Re<div className='bold-font'>D</div>irect</div>
      </div>
      <div className='location'>
        <div className='selection-text center'>Location</div>
      </div>
      <button onClick = {()=> navigator.geolocation.getCurrentPosition(success)}>position</button>

      <MapComponent zoom = {currentZoom} center = {currentLocation}/>

      
    </>
  );
}

export default App;
