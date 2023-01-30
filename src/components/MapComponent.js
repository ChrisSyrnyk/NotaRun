import React, {useRef} from 'react';
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

  function handleSetView(coordinates){
    //const {current = {}} = mapRef;
    //const { leafletElement: MapContainer} = current;
    //MapContainer.setView(coordinates, 13)
    mapRef.current.setView(coordinates,13);
    console.log(coordinates)
    
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
        <button onClick={()=> handleSetView(props.center)}>change location</button>
        </div>
    )
}