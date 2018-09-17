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

const ListItemNm = ({type="TEST", data="900%", icon=(<Grain />), toggle=false, open=false, handleClick=null, cls="defList"}) => (
  <div>
    <ListItem button  onClick={handleClick} className={cls}>
      <ListItemIcon>
        { icon }
      </ListItemIcon>
      <ListItemText inset primary={ type } />
      <ListItemText inset primary={ data } />
      { toggle && (open ? <ExpandLess /> : <ExpandMore />) }
    </ListItem>
    <Divider />
  </div>

)

const Expend = ({open, classes, name, data, handleClick=null}) => (
  <Collapse in={open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding dense={true}>
      <ListItemNm type={name} data={data} cls={classes} handleClick={handleClick!=null?handleClick:null}/>
      <Divider />
    </List>
  </Collapse>
)



class NestedList extends React.Component {


  constructor(props) {
    super(props)
    this.state = { open: true }

    this.handleClick = this.handleClick.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleDgrSelection = this.handleDgrSelection.bind(this)
    this.handleDrSelection = this.handleDrSelection.bind(this)
  }



  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleReset() {
    this.props.onSetLevel(3)
    this.props.onSetCenter([2.454071, 46.279229])
    this.props.onSetZoom(1.4641000000000006)
    this.props.onClearHoverAgency()
    this.props.onClearDgr()
    this.props.onClearDr()
  }
  handleDgrSelection = (data) => {
    this.props.onSetLevel(2)
    this.props.onSetCenter(data.coordinates)
    this.props.onSetZoom(data.zoom)
    this.props.onClearHoverInfo()
    this.props.onSetDgr(data)
    this.props.onClearDr()
  }
  handleDrSelection = (data) => {
    this.props.onSetLevel(1)
    this.props.onSetCenter(data.coordinates)
    this.props.onSetZoom(data.zoom)
    this.props.onClearHoverInfo()
    this.props.onSetDr(data)
  }
  render() {
    const { classes, data } = this.props
    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Data</ListSubheader>}
        >
          <ListItemNm type="National" data="99%"
                      icon={<FiberManualRecord />}
                      handleClick={this.handleReset}
          />
          <ListItemNm type="DGR" data="99%" icon={<ScatterPlot />} toggle={this.props.niveau===3} open={this.state.open} handleClick={this.props.niveau===3?this.handleClick:null}/>
          { this.props.niveau===3 && (data.map( (data, i) => (<Expend key={i} open={this.state.open} classes={classes.nested} name={data.name} data={`${data.id}%`} handleClick={() => this.handleDgrSelection(data)} />))) }
          { (this.props.niveau ===2 || this.props.niveau ===1 ) && ( <ListItemNm type="DR" data="99%" icon={<Grain />} toggle={this.props.niveau===2?true:false} open={this.state.open} handleClick={this.props.niveau===2?this.handleClick:null}/>) }
          { this.props.niveau===2 && (data.map( (data, i) => (<Expend key={i} open={this.state.open} classes={classes.nested} name={data.name} data={`${data.id}%`} handleClick={() => this.handleDrSelection(data)} />))) }
          { this.props.niveau ===1 && (<ListItemNm type="Agence" data="99%" icon={<Business />} toggle={this.props.niveau===1?true:false} open={this.state.open} handleClick={this.props.niveau===1?this.handleClick:null}/>) }
          { this.props.niveau===1 && (data.map( (data, i) => (<Expend key={i} open={this.state.open} classes={classes.nested} name={data.name} data={`${data.id}%`} />))) }
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);