import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import France from './components/France'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Poke Fiducial Map D3.js / React</h1>
        </header>
        <France   width={800} height={650} className="map"/>
      </div>
    );
  }
}

export default App;
