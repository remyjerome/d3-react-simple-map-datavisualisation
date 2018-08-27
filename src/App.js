import React, { Component } from 'react';
import './App.css';
import France from './components/France'
import PersistentDrawer from './components/PersistentDrawer'
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<France width={800} height={650} className="map"/>*/}
        <PersistentDrawer>
          <France width={800} height={650} className="map"/>
        </PersistentDrawer>
      </div>
    );
  }
}

export default App;
