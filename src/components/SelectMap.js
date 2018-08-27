import React, { Component } from 'react'
import propTypes  from 'prop-types'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import InputLabel from '@material-ui/core/InputLabel'

const style = {
  diplay: "flex",
  flexDirection: "column",
  width: "100%"
}

class SelectMap extends Component {
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  constructor() {
    super()
    this.state = {
      idc: 30
    }

    this.handleChange = this.handleChange.bind(this)
  }
  render() {
    const { data, handleChange, menuItem } = this.props
    return (

      <List subheader={<ListSubheader>Indicateurs</ListSubheader>}>
        <ListItem>
          <InputLabel htmlFor="idc-map">Idc</InputLabel>
          <Select
            value={this.state.idc}
            onChange={handleChange}
            inputProps={{
              name: 'idc',
              id: 'idc-map'
            }}
            style={style}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            { menuItem.map((item, i) => (
                <MenuItem key={i} value={item.value}>{item.name}</MenuItem>
              )
            )
            }
          </Select>
        </ListItem>
      </List>

    )
  }
}

SelectMap.propTypes = {
  handleChange: propTypes.func,
  menuItem: propTypes.array

}

SelectMap.defaultProps = {
  menuItem: [
    { name: 'TEST1', value: 1 },
    { name: 'TEST2', value: 2 }
  ],
  handleChange: (event) => {
    console.log('Change select', event.target.name, event.target.value)
  }
}

export default SelectMap