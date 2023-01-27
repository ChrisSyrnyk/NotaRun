
import styles from './styles/styles.css'
import { MapComponent } from './components/MapComponent';




function App() {
  
  return (
    <>
      <div className='header-container'>
        <div className='site-name'>Re<div className='bold-font'>D</div>irect</div>
      </div>
      <div className='location'>
        <div className='selection-text center'>Location</div>
      </div>


      <MapComponent zoom = {13} center = {[51.505, -0.09]}/>
      
    </>
  );
}

export default App;
