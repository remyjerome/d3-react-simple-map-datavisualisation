import * as React from 'react';
import NestedList from '../containers/NestedList'
import Divider from '@material-ui/core/Divider';

import '../../stylesheets/MapDescription.css';
class MapDescription extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { structure, hoverInfo, data } = this.props
    const dataAgence = data && hoverInfo ?hoverInfo[data] : 'NO DATA'
    return (
          <div className="map-description-container">
            <div className="state-name">DGR   {hoverInfo === null ? '' : `${hoverInfo.CODE_DGR} / ${hoverInfo.NOM_DGR}`}</div>
            <div className="state-name">DR    {hoverInfo === null ? '' : `${hoverInfo.CODE_DR} / ${hoverInfo.NOM_DR}`}</div>
            <div className="state-name">AGC   {hoverInfo === null ? '' : `${hoverInfo.id_site} ${dataAgence}`}</div>
            <Divider/>
            <NestedList  data={structure}/>
          </div>
    );
  }
}

export default MapDescription;

