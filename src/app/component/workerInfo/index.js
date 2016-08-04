import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { edit, del } from '../../actions/action'

import Worker from './worker'

export default connect(
    state => ({ workers: state.workers }),
    dispatch => bindActionCreators({edit, del}, dispatch)
)(Worker)
