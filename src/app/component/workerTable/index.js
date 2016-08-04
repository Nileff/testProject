import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { add } from '../../actions/action'

import WorkerTable from './table'

export default connect(
    state => ({ workers: state.workers }),
    dispatch => bindActionCreators({add}, dispatch)
)(WorkerTable)
