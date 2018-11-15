import Layout from '../ui/Layout/Layout'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}


const Container = connect(mapStateToProps)(Layout)

export default Container