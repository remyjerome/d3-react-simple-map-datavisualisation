import Thematic from '../ui/Layout/Thematic'
import { connect } from 'react-redux'
import { setData, clearData } from "../../actions";

const mapStateToProps = (state) => {
  return {
    data: state.data
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

const Container = connect(mapStateToProps, mapDispatchToProps)(Thematic)

export default Container