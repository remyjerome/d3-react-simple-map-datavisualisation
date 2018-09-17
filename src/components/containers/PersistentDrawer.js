import PersistentDrawer from '../ui/PersistentDrawer'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}


const Container = connect(mapStateToProps)(PersistentDrawer)

export default Container