import React, { Component } from 'react';
import './App.css';
import Francev2 from './components/containers/Francev2'
import Francev3 from './components/containers/Francev3'
import Agence from './components/ui/Agence'
import PersistentDrawer from './components/containers/PersistentDrawer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PersistentDrawer>
          <Francev2 className="map"/>
        </PersistentDrawer>
      </div>
    );
  }
}

export default App;
