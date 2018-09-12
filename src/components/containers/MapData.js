import MapData from '../ui/MapData'
import { connect } from 'react-redux'
import { setData, clearData } from "../../actions";

const mapStateToProps = (state) => {
  return {
    idc: state.data,
    data: [{name:'MCD', value:1},{name:'CA', value:2},{name:'Budget', value:3}]
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

const Container = connect(mapStateToProps, mapDispatchToProps)(MapData)

export default Container