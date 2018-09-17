import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import AddLocation from '@material-ui/icons/AddLocation'
import Texture from '@material-ui/icons/Texture'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class MapSettings extends React.Component {
  state = {
    checked: this.props.options,
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      this.props.onAddOption(value)
    } else {
      newChecked.splice(currentIndex, 1);
      this.props.onClearOption(currentIndex)
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List subheader={<ListSubheader>Map Settings</ListSubheader>}>
          <ListItem>
            <ListItemIcon>
              <AddLocation />
            </ListItemIcon>
            <ListItemText primary="Agences" />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.handleToggle('agence')}
                checked={this.state.checked.indexOf('agence') !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Texture />
            </ListItemIcon>
            <ListItemText primary="Heatmap" />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.handleToggle('heatmap')}
                checked={this.state.checked.indexOf('heatmap') !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    );
  }
}

MapSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapSettings);