import React, {useEffect, useRef, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L, { map } from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export const MapComponent = (props) => {
  const mapRef = useRef();
  let lastLocation = [51.505, -0.09]

  function handleSetView(coordinates, zoom){
    mapRef.current.setView(coordinates, zoom);
  }

    useEffect(() => {
      if (mapRef.current != null){
        handleSetView(props.center, props.zoom);
      }
      
    }, props.center); //when location changes


    function leafletLocate(){
      mapRef.current.locate({setView: true})
        .on('locationfound', function(e){
          var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
          var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
              weight: 1,
              color: 'blue',
              fillColor: '#cacaca',
              fillOpacity: 0.2
          });
          mapRef.current.addLayer(marker);
          mapRef.current.addLayer(circle);
        })
        .on('locationerror', function(e){
              console.log(e);
              alert("Location access denied.");
        });
    }

      /*
    function getClickedLanLon(e) {

      var lat,
          lon,
          zoom;
  
      lat = e.latlng.lat;
      lon = e.latlng.lng;
      zoom = map.getZoom();
  
      let marker2 = new L.Marker(new L.LatLng(lat, lon));
      map.addLayer(marker2);
    }
    

    if(mapRef.current!=null){
      mapRef.current.on('click', function(e){
        console.log('click');
      })
    }
    
    */

    function MyComponent() {
      const map = useMapEvents({
        click: (e) => {
          console.log(e.latlng);
          AddMarker(e.latlng);
        }
      })
      return null
    }
    

    function AddMarker(location){
      console.log('ran')
      let tempMarkers = [... props.markers];
      const newMarker = [location.lat, location.lng];
      tempMarkers.push(newMarker);
      props.setMarkers(tempMarkers);
    }
    

    
    
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
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          />
          <MyComponent />
          
          {props.markers.map((position, idx) => 
          <Marker key={`marker-${idx}`} position={position}>
            <Popup>
              <span>Popups</span>
            </Popup>
          </Marker>
          )}
          
          
        </MapContainer>
        <div onClick={()=> leafletLocate()} className='location-button'>{'>'}</div>
        <div onClick={()=> console.log(props.markers)}>{'log markers'}</div>
        </div>

        
    )
    
}