import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})

const ItemListData = ({ data, handleClick }) => (
  <div>
    <ListItem button onClick={handleClick}>
      <ListItemText primary={data} />
    </ListItem>
  </div>
)


class DataList extends React.Component {

  constructor(props) {
    super(props)

    this.handleData = this.handleData.bind(this)
  }

  handleData = (data) => {

    this.props.onClearData()
    this.props.onSetData(data)

  }

  handleReset= () => {
    this.props.onClearData()
  }

  render() {
    const { classes, dataList } = this.props

    return (
      <div className={classes.root}>
        <List component="nav" subheader={<ListSubheader>Indicateurs</ListSubheader>}>
          <ListItem button onClick={this.handleReset}>
            <ListItemText primary={'Reset'} />
          </ListItem>
          { dataList.map((data , i) => (<ItemListData key={i} data={data.label} handleClick={() => this.handleData(data.label)}/>))}
        </List>
      </div>
    )
  }
}

DataList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DataList);