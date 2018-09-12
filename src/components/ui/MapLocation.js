import React, { Component } from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';


class MapLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: props.map
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick = value => () => {
    this.props.onSetMap(value)
    this.setState({
      map: value
    })
  }
  render(){
    return (
      <div>
        <List subheader={<ListSubheader>Map Location</ListSubheader>}>
          <ListItem button onClick={this.handleClick('france')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="France" />
          </ListItem>
          <ListItem button onClick={this.handleClick('dom-tom')}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="DOM-TOM" />
          </ListItem>
        </List>
      </div>
    )
  }
}

export default MapLocation