import MapSettings from '../ui/MapSettings'
import { connect } from 'react-redux'
import {clearOption, addOption} from "../../actions";

const mapStateToProps = (state) => {
  return {
    options: state.options,
    niveau: state.level,
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
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(MapSettings)

export default Container