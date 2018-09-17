import React, { Component } from 'react';
import './App.css';
import France from './components/containers/France'
import PersistentDrawer from './components/containers/PersistentDrawer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PersistentDrawer>
          <France className="map"/>
        </PersistentDrawer>
      </div>
    );
  }
}

export default App;
