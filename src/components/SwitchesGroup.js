import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchesGroup extends React.Component {
  state = {
    agence: true,
    heatmap: false,
  };

  handleChange = name => event => {
    this.props.onChange({ [name]: event.target.checked })
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.agence}
                onChange={this.handleChange('agence')}
                value="Agences"
              />
            }
            label="Agences"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.heatmap}
                onChange={this.handleChange('heatmap')}
                value="HeatMap"
              />
            }
            label="HeatMap"
          />
        </FormGroup>
    );
  }
}

export default SwitchesGroup;