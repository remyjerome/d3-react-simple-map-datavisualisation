import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import NestedList from '../containers/NestedList'
import Retour from '../containers/Retour'

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
};

class SimpleCard extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props;
    const { structure, hoverInfo, data } = this.props
    const dataAgence = data && hoverInfo ?hoverInfo[data] : 'NO DATA'
    return (
      <Card className={classes.card}>
        <CardContent className={classes.info}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Niveau { this.props.niveau === 3 ? 'National' : this.props.niveau === 2 ? 'DGR' : this.props.niveau === 1 ? 'DR' : 'Agence'}
          </Typography>
          <Typography className={classes.titleInfo}>
            DGR   {hoverInfo === null ? '' : `${hoverInfo.CODE_DGR} / ${hoverInfo.NOM_DGR}`}
          </Typography>
          <Typography className={classes.titleInfo}>
            DR    {hoverInfo === null ? '' : `${hoverInfo.CODE_DR} / ${hoverInfo.NOM_DR}`}
          </Typography>
          <Typography className={classes.titleInfo}>
            AGC   {hoverInfo === null ? '' : `/ ${hoverInfo.id_site} ${dataAgence}`}
          </Typography>
          {/*<Retour/>*/}
        </CardContent>
        <CardContent>
          <NestedList  data={structure}/>
        </CardContent>
      </Card>
    )
  }
}

/*function SimpleCard(props) {
  const { classes } = props;
  const { structure, hoverInfo, data } = this.props
  const dataAgence = data && hoverInfo ?hoverInfo[data] : 'NO DATA'

  return (
    <Card className={classes.card}>
      <CardContent className={classes.info}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Niveau National
        </Typography>
        <Typography className={classes.titleInfo}>
          DGR 4 / CENTRE EST
        </Typography>
        <Typography className={classes.titleInfo}>
          DR 44 / Clermont-Ferrand
        </Typography>
        <Typography className={classes.titleInfo}>
          AGC / exp-clermont
        </Typography>
      </CardContent>
      <CardContent>
        <MapNav/>
      </CardContent>
    </Card>
  );
}
*/


export default withStyles(styles)(SimpleCard);