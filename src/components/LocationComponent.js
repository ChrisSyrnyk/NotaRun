import React, {useState} from 'react';
import currentLocation from '../img/currentLocation.png';
import locatingIcon from '../img/locatingIcon.png';

const LocationComponent = (props) =>{
    const [locating, setLocating] = useState(false);
    const [locationFound, setLocationFound] = useState(false);

    function locate(){
        if(locationFound == false){
            setLocating(true);
            props.leafletLocate(function(){
                setLocating(false);
                setLocationFound(true)
            });
        } else {
            props.centerView(props.currentLocation)
        }
    }

    if(locating == false){
        return(
            <img src = {currentLocation} onClick={()=> locate()} className='location-button'></img>
        )
        } else {
            return(
                <img src = {locatingIcon} onClick={()=> props.leafletLocate()} className='location-button'></img>
            )
        }
}

export default LocationComponent;

