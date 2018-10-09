import React, { Component } from 'react';
import './App.css';
import Francev2 from './components/containers/Francev2'
import Agence from './components/ui/Agence'
import PersistentDrawer from './components/containers/PersistentDrawer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PersistentDrawer>
          {/*<Agence width={960} height={500} champ={'id_site'} valeur={"exp-bourg-en-bresse"} className="map" file={"zone_cp_agence"}/>*/}
          <Francev2 className="map"/>
        </PersistentDrawer>
      </div>
    );
  }
}

export default App;
