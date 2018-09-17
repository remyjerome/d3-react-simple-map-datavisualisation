import DataList from '../ui/DataList'
import { connect } from 'react-redux'
import { setData, clearData } from "../../actions";

const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetData(option) {
      dispatch(
        setData(option)
      )
    },
    onClearData() {
      dispatch(
        clearData()
      )
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(DataList)

export default Container