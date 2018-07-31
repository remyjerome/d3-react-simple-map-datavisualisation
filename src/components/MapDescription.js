import * as React from 'react';
import DataTable from '../components/DataTable'

import '../stylesheets/MapDescription.css';

class MapDescription extends React.Component {
  render() {
    // const { mapType, router, maps } = this.props;

    return (
          <div className="map-description-container">
            <div className="inset-header">Indicateur MCD</div>
            <div className="inset-subheader">En pourcentage</div>
            <div className="state-name">DR {this.props.selectDr} - DGR - Agence</div>
            <div className="inset-subheader">Nom Agence</div>
            <DataTable/>
          </div>
    );
  }
}

export default MapDescription;

