
import styles from './styles/styles.css'
import { MapComponent } from './components/MapComponent';
import React, {useState, useEffect} from 'react';
import menuIcon from './img/menuIcon.png'
import DropDownMenu from './components/DropDownMenu';

function App() {

  const[currentLocation, setCurrentLocation] = useState([49, -96]);     //current location
  const[currentZoom, setCurrentZoom] = useState([3]);                   //starting zoom lvl
  const[markers, setMarkers] = useState([]);                            //list of markers
  const[distance, setDistance] = useState(0);                           //distance between markers
  const[displayDropDown, setDisplayDropDown] = useState(false);         //dropdown state
  const[units, setUnits] = useState('metric');                          //units displayed
  const[removalAccountedFor, setRemovalAccountedFor] = useState(true);  //removed last marker

  //Drop down menu toggle
  function toggleDropDown(){
    if(displayDropDown == false){
      setDisplayDropDown(true);
    } else {
      setDisplayDropDown(false);
    }
  }
  
  //Markers----------------------------------------------------------
  useEffect(() => {
    totalDistance(); // recalculate distance when markers change
}, [markers]);

  function removeLastMarker(){
    let tempMarkers = [... markers];
    tempMarkers.pop();
    setMarkers(tempMarkers);
    setRemovalAccountedFor(false);
  }

  function clearAllMarkers(){
    setMarkers([]);
  }

  //Distance calculations--------------------------------------------
  //calculate distance between two cord using the haversine formula
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

  //Calculate total distance
  function totalDistance(){
    let i = 0;
    let km = 0;
    while (i+1 < markers.length){
      km += pointToPoint(
        [markers[i]._latlng.lat,markers[i]._latlng.lng], 
        [markers[i+1]._latlng.lat,markers[i+1]._latlng.lng]
      ); //distance between two coord
      i++;
    }
    setDistance(km);
    return km;
  }

  return (
    <>
      <div className='header-container'>
        <img src = {menuIcon} className='burger' onClick={()=>toggleDropDown()}></img>
        <div className='site-name'>Nota<div className='bold-font'>R</div>un</div>
      </div>
      <DropDownMenu 
      displayDropDown = {displayDropDown} 
      setUnits = {setUnits} units = {units}
      />
      <MapComponent 
      zoom = {currentZoom} 
      center = {[49, -96]} 
      markers={markers} 
      setMarkers = {setMarkers} 
      distance = {distance} 
      units = {units} 
      setCurrentLocation = {setCurrentLocation} 
      currentLocation = {currentLocation}
      setRemovalAccountedFor = {setRemovalAccountedFor} 
      removalAccountedFor = {removalAccountedFor}
      />
      <div className='tool-bar'>
        <div className='tool-button' onClick={()=> removeLastMarker()}>Remove Last Marker</div>
        <div className='tool-button' onClick={()=> clearAllMarkers()}>Clear All Markers</div>
      </div>
    </>
  );
}

export default App;
