import React, {useEffect, useRef, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
    
    return (
      
        <div className='map-container'>
        <MapContainer ref={mapRef} center={props.center} zoom={props.zoom} style={{height: '100%', width: '100%'}}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          />
          <Marker position={props.center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        <div onClick={()=> leafletLocate()} className='location-button'>{'>'}</div>
        </div>
        
    )
    
}