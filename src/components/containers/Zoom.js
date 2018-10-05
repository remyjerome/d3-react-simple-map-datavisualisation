import Zoom from '../ui/Zoom'
import { connect } from 'react-redux'
import { setZoom } from "../../actions";

const mapStateToProps = (state) => {
  return {
    zoom: state.zoom,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetZoom(zoom) {
      dispatch(
        setZoom(zoom)
      )
    }
  }
}


const Container = connect(mapStateToProps, mapDispatchToProps)(Zoom)

export default Container