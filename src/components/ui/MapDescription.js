import * as React from 'react';
import NestedList from '../containers/NestedList'
import MapData from '../containers/MapData'
import Divider from '@material-ui/core/Divider';

import '../../stylesheets/MapDescription.css';
class MapDescription extends React.Component {
  render() {
    const { structure, hoverInfo } = this.props
    return (
          <div className="map-description-container">
            <div className="state-name">DGR {hoverInfo === null ? '' : `${hoverInfo.CODE_DGR} / ${hoverInfo.NOM_DGR}`}</div>
            <div className="state-name">DR {hoverInfo === null ? '' : `${hoverInfo.CODE_DR} / ${hoverInfo.NOM_DR}`}</div>
            <NestedList  data={structure}/>
          </div>
    );
  }
}

export default MapDescription;

