import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const RenderItem = ({classes, open, handleClick, data, handleData}) => (
  <div>
    <ListItem button onClick={() => handleClick(data.label)}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText inset primary={data.name} />
      { (open.indexOf(data.label) !== -1) ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={(open.indexOf(data.label) !== -1)} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {
          data.idc.map((d,i) => (
            <ListItem button className={classes.nested} key={i} onClick={()=> handleData(d.label)}>
              <ListItemText inset primary={d.label} />
            </ListItem>
          ))
        }
      </List>
    </Collapse>
  </div>
)

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



class MenuData extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: [],
    }
  }


  handleData = (data) => {


    console.log(data)
    // this.props.onClearData()
    this.props.onSetData(data)

  }

  handleClick = (d) => {
    console.log(d)
    if((this.state.open.indexOf(d) !== -1)){
      const newOpen = this.state.open.filter((o)=> o !== d)
      this.setState({ open: newOpen });
    } else {
      this.setState({ open : [...this.state.open, d] })
    }
  };

  render() {
    const { classes, dataMenu } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Thématiques</ListSubheader>}
        >
          {
            dataMenu.map( (d,i) => <RenderItem handleData={this.handleData} classes={classes} open={this.state.open} handleClick={this.handleClick} data={d} key={i}/> )
          }
        </List>
      </div>
    );
  }
}

MenuData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuData);