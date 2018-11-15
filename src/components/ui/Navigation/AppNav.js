import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import Structure from '../../containers/Structure'


const styles = {
  card: {
    width: 400,
    marginBottom: 15,
    textAlign: 'left',
    color: '#fff'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    color: '#fff'
  },
  titleInfo: {
    fontSize: 16,
    color: '#fff',
    textTransform: 'uppercase'
  },
  pos: {
    marginBottom: 12,
    color: '#fff'
  },
  info: {
    backgroundColor: '#7baca8',
    color: '#fff'
  }
}

class AppNav extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { classes, structure } = this.props
    const {  hoverInfo, data } = this.props
    const dataAgence = data && hoverInfo ?hoverInfo[data] : ''
    const name =hoverInfo ? hoverInfo.id_site.substring(4).replace(/-/gi,' ') : null
    // const structure = this.props.niveau === 3 ? dataStructureZoom : this.props.niveau === 2 ? this.props.selectedDgr.dr : ((this.props.niveau===1)||(this.props.niveau===0)) ? this.props.selectedDr.agence : null
    return (
      <Card className={classes.card}>
        <CardContent className={classes.info}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Affichage { this.props.niveau === 3 ? 'National' : this.props.niveau === 2 ? 'DGR' : this.props.niveau === 1 ? 'DR' : 'Agence'}
          </Typography>
          <Typography className={classes.titleInfo}>
            DGR   {hoverInfo === null ? '' : `${hoverInfo.CODE_DGR} / ${hoverInfo.NOM_DGR}`}
          </Typography>
          <Typography className={classes.titleInfo}>
            DR   {hoverInfo === null ? '' : `${hoverInfo.CODE_DR} / ${hoverInfo.NOM_DR}`}
          </Typography>
          <Typography className={classes.titleInfo}>
            SITE   {hoverInfo === null ? '' : `/ ${name.charAt(0).toUpperCase()+name.slice(1)} ${dataAgence}`}
          </Typography>
        </CardContent>
        <CardContent>
          <Structure  selectedDgr={this.props.selectedDgr} selectedDr={this.props.selectedDr} data={structure}/>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(AppNav)