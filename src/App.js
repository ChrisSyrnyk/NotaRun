
import styles from './styles/styles.css'
import { MapComponent } from './components/MapComponent';
import { HeaderComponent } from './components/HeaderComponent.tsx';
import React, {useState, useEffect} from 'react';

function App() {

  const[currentLocation, setCurrentLocation] = useState([49, -96]);
  const[currentZoom, setCurrentZoom] = useState([3]);
  const[markers, setMarkers] = useState([]);
  const[distance, setDistance] = useState(0);
  
  useEffect(() => {
    totalDistance(); // This is be executed when the state changes
}, [markers]);



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

  function removeLastMarker(){
    let tempMarkers = [... markers];
    tempMarkers.pop();
    setMarkers(tempMarkers);
  }

  function clearAllMarkers(){
    setMarkers([]);
  }

  //calculate distance
  //haversine formula
  function pointToPoint(a,b){
    const radius = 6371; //earths radius
    const lat1 = a[0] * Math.PI/180;
    const lat2 = b[0] * Math.PI/180;
    const deltaLat = (a[0]-b[0]) * Math.PI/180;
    const deltaLng = (a[1]-b[1]) * Math.PI/180;
    const A = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
    const C = 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1-A));
    return radius * C;
  }

  function totalDistance(){
    let i = 0;
    let km = 0;
    while (i+1 < markers.length){
      km += pointToPoint(markers[i],markers[i+1]);
      i++;
    }
    setDistance(km);
    return km;
  }

  return (
    <>
      <div className='header-container'>
        <div className='site-name'>Re<div className='bold-font'>D</div>irect</div>
      </div>
      <MapComponent zoom = {currentZoom} center = {currentLocation} markers={markers} setMarkers = {setMarkers}/>
      <div onClick={()=> removeLastMarker()}>remove last marker</div>
      <div onClick={()=> clearAllMarkers()}>clear All Markers</div>
      <div onClick={()=> console.log(totalDistance())}>log distance</div>
      <div>{distance +' km'}</div>
      
    </>
  );
}

export default App;
