import MapLocation from '../ui/MapLocation'
import { connect } from 'react-redux'
import { setMap } from "../../actions";

const mapStateToProps = (state) => {
  return {
    map: state.map
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetMap(map) {
      dispatch(
        setMap(map)
      )
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(MapLocation)

export default Container