import linkedin from '../img/linkedin.png';
import github from '../img/github.png';
import DropDownButton from './DropDownButton';

const DropDownMenu = (props) =>{
    function openInNewTab(url) {
        window.open(url, '_blank').focus();
      }

    if(props.displayDropDown == true){
        return(
            <div className="drop-down-container">
                <div className="drop-down-section">
                    <div className="drop-down-title">Units</div>
                    <div className="drop-down-div-line"/>
                    <div className="toggle-div">
                        <DropDownButton title = {'Kilometers'} units = {props.units} setUnits = {props.setUnits}/>
                        <DropDownButton title = {'Miles'} units = {props.units} setUnits = {props.setUnits}/>
                    </div>
                </div>
                <div className="drop-down-section">
                    <div className="drop-down-title">Developer Info</div>
                    <div className="drop-down-div-line"/>
                    
                        <img src={linkedin} 
                        className="social-icon"
                        onClick={()=>openInNewTab('https://www.linkedin.com/in/christopher-syrnyk-3b5058259/')}
                        />
                        <img src={github} 
                        className="social-icon"
                        onClick={()=>openInNewTab('https://github.com/ChrisSyrnyk')}
                        />
                </div>
            </div>
        )
    }
}

export default DropDownMenu;