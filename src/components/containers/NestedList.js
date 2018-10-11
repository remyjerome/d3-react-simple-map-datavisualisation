import NestedList from '../ui/NestedList'
import { connect } from 'react-redux'
import {
  setLevel,
  setCenter,
  setZoom,
  clearHoverAgency,
  clearDgr,
  clearDr,
  clearHoverInfo,
  setDgr,
  setDr,
  addOption,
  clearOption,
  setAgence,
  clearAgence
} from '../../actions'

const mapStateToProps = (state) => {
  return {
    niveau: state.level,
    dgr: state.dgr,
    dr: state.dr,
    agence: state.agence,
    options: state.options
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddOption(option) {
      dispatch(
        addOption(option)
      )
    },
    onClearOption(index) {
      dispatch(
        clearOption(index)
      )
    },
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
    onClearHoverAgency() {
      dispatch(
        clearHoverAgency()
      )
    },
    onClearDgr() {
      dispatch(
        clearDgr()
      )
    },
    onClearDr() {
      dispatch(
        clearDr()
      )
    },
    onClearAgence() {
      dispatch(
        clearAgence()
      )
    },
    onClearHoverInfo() {
      dispatch(
        clearHoverInfo()
      )
    },
    onSetDgr(dgr) {
      dispatch(
        setDgr(dgr)
      )
    },
    onSetDr(dr) {
      dispatch(
        setDr(dr)
      )
    },
    onSetAgence(agence) {
      dispatch(
        setAgence(agence)
      )
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(NestedList)

export default Container