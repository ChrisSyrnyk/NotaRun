import React, {useEffect, useRef, useMemo} from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Polyline} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L, { map, marker } from 'leaflet';
import markerIcon from '../img/currentLocation.png';
import LocationComponent from './LocationComponent';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export const MapComponent = (props) => {
  const mapRef = useRef();

  useEffect(()=>{
    if(mapRef.current !== null && props.removalAccountedFor !== true){
      let lastMarker = props.markers.length - 1;
      if(lastMarker >= 0){
        let lat = props.markers[lastMarker]._latlng.lat;
        let lng = props.markers[lastMarker]._latlng.lng;
        mapRef.current.panTo([lat,lng]);
      }
      props.setRemovalAccountedFor(true);
    }
  })


  function leafletLocate(_callback){
    mapRef.current.locate({setView: false})
      .on('locationfound', function(e){
        //var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
          mapRef.current.flyTo([e.latitude, e.longitude], 17);
          //wait till fly to has finished by using zoomend event
          mapRef.current.on('zoomend', function () {
            var outerCircle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
              weight: 2,
              color: 'rgb(0,191,255)',
              fillColor: 'white',
              fillOpacity: 0.8
          });
          var innerCircle = L.circle([e.latitude, e.longitude], e.accuracy/6, {
            weight: 2,
            color: 'rgb(0,191,255)',
            fillColor: 'rgb(0,191,255)',
            fillOpacity: 1
          });
          mapRef.current.addLayer(outerCircle);
          mapRef.current.addLayer(innerCircle);
          //update current location
          props.setCurrentLocation([e.latitude, e.longitude])
          _callback(); //call back to location component
        });
      })
      .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
      });
  }

  function centerView(coord){
    console.log(coord);
    mapRef.current.flyTo([coord[0],coord[1]], 17);
  }
    

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        if(props.moveInProgress === false){
          console.log('click registered')
          console.log(e.latlng);
          AddMarker(e.latlng);
        } else {
          props.setMoveInProgress(false);
        }
      }
    })
    return null
  }
    
    

  function AddMarker(location){
      console.log('marker added')
      let tempMarkers = [...props.markers];
      //var newMarker = [location.lat, location.lng];
      var newMarker = L.marker([location.lat, location.lng])
      newMarker.moving = false;
      tempMarkers.push(newMarker);
      props.setMarkers(tempMarkers);
      mapRef.current.panTo(new L.LatLng(location.lat, location.lng))
  }
    
  //styling
  const lineColor = {color: 'red'}
  //Icon
  var iconOptions = {
    iconUrl: markerIcon,
    iconSize: [30, 30],
  }
  var customIcon = L.icon(iconOptions);

  //filter latlng from positions
  function filterLatLng(markerList){
    let latlngList = [];
    markerList.forEach(element => {
      latlngList.push([element._latlng.lat,element._latlng.lng])
    });
    return latlngList;
  }

  function displayDistance(){
    if(props.units === 'metric'){
      return (Math.round(props.distance * 100) /100 + ' km')
    } else {
      return (Math.round((props.distance / 1.609) * 100) /100 + ' mi')
    }
  }

  const eventHandlers = useMemo(() => ({
    dragend(e) {
      console.log(e.target.getLatLng());
      let tempMarkersList = [...props.markers];
      let i = 0;
      while(i<tempMarkersList.length){
        if(tempMarkersList[i].moving == true){
          tempMarkersList[i].moving = false;
          tempMarkersList[i]._latlng = e.target.getLatLng();
          console.log('replaced');
          break;
        };
        i++;
      }
      props.setMarkers(tempMarkersList);
      props.setMoveInProgress(true);
    },
    dragstart(e){
      console.log(e.target.getLatLng());
      let tempMarkersList = props.markers;
      let i = 0;
      while(i<tempMarkersList.length){
        if(tempMarkersList[i]._latlng == e.target.getLatLng()){
          tempMarkersList[i].moving = true;
          console.log('found');
          break;
        };
        i++;
      }
      props.setMarkers(tempMarkersList);
      
    }
  }))


    
  return (
    
      <div className='map-container'>
        <MapContainer  
          ref={mapRef}  
          center={props.center} 
          zoom={props.zoom} 
          style={{height: '100%', width: '100%'}}
          >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            //url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyComponent />
          <Polyline 
          pathOptions={lineColor} 
          positions={filterLatLng(props.markers)} 
          />
          {props.markers.map((position, idx) => 
          <Marker 
            key={`marker-${idx}`} 
            position={position.getLatLng()}
            draggable={true}
            icon= {customIcon}
            eventHandlers={eventHandlers}
          >
          </Marker>
          )}
        </MapContainer>
        
        <LocationComponent 
        leafletLocate = {leafletLocate} 
        centerView = {centerView} 
        currentLocation = {props.currentLocation}
        />
        <div className='km-display' display = 'hidden'>{displayDistance()}</div>
      </div>
  )
}