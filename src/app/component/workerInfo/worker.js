import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router'
import Edit from '../upsert/index'

export default React.createClass({
    getInitialState: function () {
        return ({
            editOpen: false
        });
    },
    changeEditOpen: function () {
        this.setState({editOpen: !this.state.editOpen});
    },
    handleDoubleClick: function (e) {
        if (e.currentTarget === e.target)
            this.changeEditOpen();
    },
    render: function () {
        let worker = this.props.workers.item[this.props.routeParams.id];
        return (
            <div>
                <div className="title-wrapper">
                    <div className="title">
                        Сотрудник
                    </div>
                </div>
                <div className="workerInfo">
                    <div className="button-wrapper">
                        <Link className="standart-button back-button" to="/">{'\ue004'}</Link>
                    </div>
                    <div className="workerInfo__item workerInfo__surname">
                        {worker.surname}
                    </div>
                    <div className="workerInfo__item workerInfo__name">
                        {worker.name}
                    </div>
                    <div className="workerInfo__item workerInfo__position">
                        {worker.position}
                    </div>
                    <div className="workerInfo__item workerInfo__about">
                        {worker.about.split(/\n/).map((item, i) => <div key={i}>{item}</div>)}
                    </div>
                </div>
                <div
                    className={"flat-button" + (this.state.editOpen ? ' hide' : '')}
                    onClick={this.changeEditOpen}>{'\uE006'}</div>
                <div className={"modal-window " + (this.state.editOpen ? 'visible' : 'hide')}
                     onDoubleClick={this.handleDoubleClick}>
                    <ReactCSSTransitionGroup transitionEnterTimeout={400} transitionLeaveTimeout={400}
                                             transitionName={{enter: 'visible',leave: 'hide'}}>
                        {this.state.editOpen &&
                        <Edit handleEditWorker={this.props.edit} handleDelWorker={this.props.del}
                              handleClose={this.changeEditOpen} idWorker={this.props.routeParams.id} worker={worker}/>}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
});