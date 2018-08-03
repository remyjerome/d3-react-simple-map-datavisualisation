import * as React from 'react';
import DataTable from '../components/DataTable'

import '../stylesheets/MapDescription.css';

class MapDescription extends React.Component {
  render() {
    const { hoverInfo } = this.props;

    return (
          <div className="map-description-container">
            <div className="state-name">DGR {hoverInfo === null ? '' : `${hoverInfo.CODE_DGR} / ${hoverInfo.NOM_DGR}`}</div>
            <div className="state-name">DR {hoverInfo === null ? '' : `${hoverInfo.CODE_DR} / ${hoverInfo.NOM_DR}`}</div>
            <div className="inset-subheader">Agence 1, Agence 2, Agence 3, Agence 4, Agence 5</div>
            <div className="inset-header">Indicateur MCD</div>
            <div className="inset-subheader">En pourcentage</div>
            <DataTable/>
          </div>
    );
  }
}

export default MapDescription;

