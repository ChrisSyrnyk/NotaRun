const Toolbar = (props) =>{
    return(
        <div className='tool-bar'>
            <div className='button-container'>
                <div className='tool-button' onClick={()=> props.removeLastMarker()}>Remove Last Marker</div>
                <div className='tool-button' onClick={()=> props.clearAllMarkers()}>Clear All Markers</div>
            </div>
        </div>
    )
}

export default Toolbar;