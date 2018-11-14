import MapNavigation from '../ui/AppNav'
import { connect } from 'react-redux'
import { setLevel, setCenter, setZoom, setDgr, clearDgr, setDr, clearDr, setAgence, clearAgence } from "../../actions";

const mapStateToProps = (state) => {
  return {
    data: state.data,
    niveau: state.level,
    selectedDgr: state.dgr,
    selectedDr: state.dr,
    zoom: state.zoom,
    center: state.center,
    hoverInfo: state.hoverInfo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetLevel(level) {
      dispatch(
        setLevel(level)
      )
    },
    onSetCenter(center) {
      dispatch(
        setCenter(center)
      )
    },
    onSetZoom(zoom) {
      dispatch(
        setZoom(zoom)
      )
    },
    onSetDgr(dgr) {
      dispatch(
        setDgr(dgr)
      )
    },
    onClearDgr() {
      dispatch(
        clearDgr()
      )
    },
    onSetDr(dr) {
      dispatch(
        setDr(dr)
      )
    },
    onClearDr() {
      dispatch(
        clearDr()
      )
    },onSetAgence(agence) {
      dispatch(
        setAgence(agence)
      )
    },
    onClearAgence() {
      dispatch(
        clearAgence()
      )
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(MapNavigation)

export default Container