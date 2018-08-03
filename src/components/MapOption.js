import * as React from 'react';

import SwitchesGroup from './SwitchesGroup'
import Button from '@material-ui/core/Button'

import '../stylesheets/MapOption.css';

class MapOption extends React.Component {
  handleShowAgence = evt => {
    // console.log(evt)
    this.props.onChange(evt)
  }
  render() {
    return (
      <div className="mapoption">
        <SwitchesGroup onChange={this.handleShowAgence}/>
        <Button variant="contained" onClick={this.props.onHandleReset}>{ "National" }</Button>
      </div>
      )
  }
}

export default MapOption