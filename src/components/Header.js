import menuIcon from '../img/menuIcon.png'

const Header = (props) =>{

    return(
        <div className='header-container'>
            <img src = {menuIcon} className='burger' onClick={()=>props.toggleDropDown()}></img>
            <div className='site-name'>Nota<div className='bold-font'>R</div>un</div>
        </div>
    )

}

export default Header;