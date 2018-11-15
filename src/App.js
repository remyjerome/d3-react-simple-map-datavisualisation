import React, { Component } from 'react';
import './App.css';
import Map from './components/containers/Map'
import PersistentDrawer from './components/containers/Layout'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PersistentDrawer>
          <Map className="map"/>
        </PersistentDrawer>
      </div>
    );
  }
}

export default App;
