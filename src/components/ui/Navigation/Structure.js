import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'
import FiberManualRecord from '@material-ui/icons/FiberManualRecord'
import Business from '@material-ui/icons/Business'
import ScatterPlot from '@material-ui/icons/ScatterPlot'
import Grain from '@material-ui/icons/Grain'


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 700,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
})

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

const Expend = ({open, classes, name, data, handleClick=null, icon}) => (
  <Collapse in={open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding dense={true}>
      <ListItemNm type={name} data={data} icon={icon} cls={classes} handleClick={handleClick!=null?handleClick:null}/>
      <Divider />
    </List>
  </Collapse>
)



class Structure extends React.Component {


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
    const currentIndex = this.props.options.indexOf('agence')
    if (currentIndex !== -1) {
      this.props.onClearOption(currentIndex)
    }
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

    const currentIndex = this.props.options.indexOf('agence')
    if (currentIndex === -1) {
      this.props.onAddOption('agence')
    }
  }

  handleAgSelection = (data) => {
    console.log(data)
    console.log(this)
    this.props.onSetLevel(0)
    this.props.onClearHoverInfo()
    this.props.onSetAgence(data.ID_SITE)
  }

  renderName= (id_site) => {
    const name = id_site.substring(4).replace(/-/gi,' ')
    return name.charAt(0).toUpperCase()+name.slice(1)
  }

  render() {
    const { classes, data } = this.props
    return (
      <div className={classes.root}>
        <List
          component="nav"

        >
          <ListItemNm type="National" data=""
                      icon={<FiberManualRecord />}
                      handleClick={this.handleReset}
          />
          <ListItemNm type={`DGR ${ this.props.dgr ? this.props.dgr.name :''}`} data="" icon={<ScatterPlot />} toggle={this.props.niveau===3} open={this.state.open} handleClick={this.props.niveau===3?this.handleClick:this.props.niveau === 2 ? this.handleReset :() => this.handleDgrSelection(this.props.dgr)}/>
          { this.props.niveau===3 && (data.map( (data, i) => (<Expend icon={<ScatterPlot />} key={i} open={this.state.open} classes={classes.nested} name={data.name} data={``} handleClick={() => this.handleDgrSelection(data)} />))) }
          { (this.props.niveau ===2 || this.props.niveau ===1 ) && ( <ListItemNm  type={`DR ${ this.props.dr ? this.props.dr.name :''}`} data="" icon={<Grain />} toggle={this.props.niveau===2?true:false} open={this.state.open} handleClick={this.props.niveau===2?this.handleClick:() => this.handleDgrSelection(this.props.dgr)}/>) }
          { this.props.niveau===2 && (data.map( (data, i) => (<Expend key={i} open={this.state.open} classes={classes.nested} name={data.name} data={``} handleClick={() => this.handleDrSelection(data)} />))) }
          { ((this.props.niveau ===1 ) || (this.props.niveau ===0) )  && (<ListItemNm type="Agence" data="" icon={<Business />} toggle={this.props.niveau===1?true:false} open={this.state.open} handleClick={this.props.niveau===1?this.handleClick:null}/>) }
          { ((this.props.niveau ===1 ) || (this.props.niveau ===0) ) && (data.map( (data, i) => (<Expend icon={<Business />} key={i} open={this.state.open} classes={classes.nested} name={this.renderName(data.ID_SITE)} data={``} handleClick={((this.props.niveau ===1 ) || (this.props.niveau ===0) )? () => this.handleAgSelection(data):null} />))) }
        </List>
      </div>
    )
  }
}

Structure.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Structure);