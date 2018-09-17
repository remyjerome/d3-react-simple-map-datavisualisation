import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
  root: {
    width: "100%",
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  state = {
    idc: '',
    name: 'hai',
    data: this.props.data
  };

  handleChange = event => {
    event.target.value ?
      this.props.onSetData(event.target.value) :
      this.props.onClearData()

    this.setState({ idc: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (

      <form className={classes.root} autoComplete="off">
        <List style={{width:"100%"}} subheader={<ListSubheader>Indicateurs</ListSubheader>}>
          <ListItem >
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="idc-simple">IDC</InputLabel>
              <Select
                value={this.state.idc}
                onChange={this.handleChange}
                inputProps={{
                  name: 'idc',
                  id: 'idc-simple',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  this.state.data && this.state.data.map((option,i) => (
                    <MenuItem key={i} value={option.value}>{option.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </ListItem>
        </List>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SimpleSelect);