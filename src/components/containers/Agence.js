import Agence from '../ui/Map/Agence_v5'
import { connect } from 'react-redux'
import { setLevel, setCenter, setZoom, setHoverInfo, clearHoverInfo, setHoverAgency, clearHoverAgency, setDgr, clearDgr, setDr, clearDr, setAgence, clearAgence } from "../../actions";

const mapStateToProps = (state) => {
  return {
    niveau: state.level,
    center: state.center,
    zoom: state.zoom,
    hoverInfo: state.hoverInfo,
    selectedDgr: state.dgr,
    selectedDr: state.dr,
    hoverAgence: state.hoverAgency,
    showAgence: state.options.indexOf('agence') !== -1,
    showTheorique: state.options.indexOf('theorique') !== -1,
    width: 800,
    height: 700,
    showHeatmap: state.options.indexOf('heatmap') !== -1,
    data: state.data,
    showBorder: state.options.indexOf('border') !== -1,
    selectedAgence: state.agence
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
    onSetHoverInfo(info) {
      dispatch(
        setHoverInfo(info)
      )
    },
    onClearHoverInfo() {
      dispatch(
        clearHoverInfo()
      )
    },
    onSetHoverAgency(agence) {
      dispatch(
        setHoverAgency(agence)
      )
    },
    onClearHoverAgency() {
      dispatch(
        clearHoverAgency()
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
    }
  }
}


const Container = connect(mapStateToProps, mapDispatchToProps)(Agence)

export default Container