import React, { Component } from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';


class ListMenuMap extends Component {
  render(){
    return (
      <div>
        <List subheader={<ListSubheader>Map Location</ListSubheader>}>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="France expertise" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="DOM-TOM expertise" />
          </ListItem>
        </List>
      </div>
    )
  }
}

export default ListMenuMap