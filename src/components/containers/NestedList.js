import NestedList from '../ui/NestedList'
import { connect } from 'react-redux'
import { setLevel, setCenter, setZoom, clearHoverAgency, clearDgr, clearDr, clearHoverInfo, setDgr, setDr } from '../../actions'

const mapStateToProps = (state) => {
  return {
    niveau: state.level
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
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(NestedList)

export default Container