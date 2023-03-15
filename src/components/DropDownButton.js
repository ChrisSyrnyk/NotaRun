const DropDownButton = (props) =>{
    let kmButtonColor = "drop-down-button + green-button";
    let miButtonColor = "drop-down-button";
    if(props.units == 'metric'){
        kmButtonColor = "drop-down-button + green-button";
        miButtonColor = "drop-down-button";
    } else {
        kmButtonColor = "drop-down-button";
        miButtonColor = "drop-down-button + green-button";
    }

    if(props.title == 'Kilometers'){
        return(
            <div id = "kilometers" className={kmButtonColor} onClick = {()=> props.setUnits('metric')}>{props.title}</div>
        )
    } else {
        return(
        <div  id = "miles" className={miButtonColor} onClick = {()=> props.setUnits('imperial')}>Miles</div>
        )
    }
}

export default DropDownButton;