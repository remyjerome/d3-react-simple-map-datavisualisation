import * as React from 'react';
import NestedList from '../components/NestedList'

import '../stylesheets/MapDescription.css';
class MapDescription extends React.Component {
  render() {
    const { hoverInfo, niveau, agence, structure } = this.props;
    return (
          <div className="map-description-container">
            <div className="state-name">DGR {hoverInfo === null ? '' : `${hoverInfo.CODE_DGR} / ${hoverInfo.NOM_DGR}`}</div>
            <div className="state-name">DR {hoverInfo === null ? '' : `${hoverInfo.CODE_DR} / ${hoverInfo.NOM_DR}`}</div>
            <div className="inset-subheader">{ (niveau === 2 || niveau === 1) ? (agence === null ? '' : `${agence.name} - ${agence.id}`) : '' }</div>
            <div className="inset-header">Indicateur MCD</div>
            <div className="inset-subheader">En pourcentage</div>
            <NestedList niveau={niveau} data={structure}/>
          </div>
    );
  }
}

export default MapDescription;

