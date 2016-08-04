import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { add } from '../../actions/action'

import WorckerTable from './table'

export default connect(
    state => ({ workers: state.workers }),
    dispatch => bindActionCreators({add}, dispatch)
)(WorckerTable)
