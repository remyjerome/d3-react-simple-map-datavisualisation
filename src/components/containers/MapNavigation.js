import MapNavigation from '../ui/MapNavigation'
import { connect } from 'react-redux'
import { setData, clearData } from "../../actions";

const mapStateToProps = (state) => {
  return {
    data: state.data,
    niveau: state.level
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetData(data) {
      dispatch(
        setData(data)
      )
    },
    onClearData() {
      dispatch(
        clearData()
      )
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(MapNavigation)

export default Container