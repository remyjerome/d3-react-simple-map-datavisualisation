import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Business from '@material-ui/icons/Business';
import ScatterPlot from '@material-ui/icons/ScatterPlot';
import Grain from '@material-ui/icons/Grain';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends React.Component {
  state = { open: true };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Data</ListSubheader>}
        >
          <ListItem button>
            <ListItemIcon>
              <FiberManualRecord />
            </ListItemIcon>
            <ListItemText inset primary="National" />
            <ListItemText inset primary="999%" />
          </ListItem>
          <Divider />
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <ScatterPlot />
            </ListItemIcon>
            <ListItemText inset primary="DGR" />
            <ListItemText inset primary="999%" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense={true}>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="DR1 - OUEST" />
                <ListItemText inset primary="999%" />
              </ListItem>
              <Divider />
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="DR2 - OUEST" />
                <ListItemText inset primary="999%" />
              </ListItem>
              <Divider />
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="DR3 - OUEST" />
                <ListItemText inset primary="999%" />
              </ListItem>
              <Divider />
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="DR4 - OUEST" />
                <ListItemText inset primary="999%" />
              </ListItem>
              <Divider />
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="DR5 - OUEST" />
                <ListItemText inset primary="999%" />
              </ListItem>
              <Divider />
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="DR6 - OUEST" />
                <ListItemText inset primary="999%" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <Grain />
            </ListItemIcon>
            <ListItemText inset primary="DR" />
            <ListItemText style={{
              float: "right",
            }} inset primary="999%" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText inset primary="Agence" />
            <ListItemText inset primary="999%" />
          </ListItem>
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);