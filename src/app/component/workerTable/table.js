import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Row from './row'
import Add from '../upsert/index'

export default React.createClass({
    getInitialState: function () {
        return ({
            sort: {
                field: 'surname',
                desc: false
            },
            addOpen: false
        });
    },
    sortWorkers: function (obj1, obj2) {
        let field = this.state.sort.field;
        let desc = this.state.sort.desc;
        if (obj1[field] < obj2[field]) return desc ? 1 : -1;
        if (obj1[field] > obj2[field]) return desc ? -1 : 1;
        return 0;
    },
    changeSort: function (field) {
        let sort = {...this.state.sort};
        if (sort.field === field) {
            sort.desc = !sort.desc;
        }
        else {
            sort.desc = false;
            sort.field = field;
        }
        this.setState({sort: sort});
    },
    changeAddOpen: function () {
        this.setState({addOpen: !this.state.addOpen});
    },
    handleDoubleClick: function (e) {
        if (e.currentTarget === e.target)
            this.changeAddOpen();
    },
    render: function () {
        //copy workers array
        let sortWorker = this.props.workers.item.slice();
        //copy index of array elements as id
        for (let i = 0; i < sortWorker.length; i++) {
            sortWorker[i].id = i;
        }
        //sort copy of workers array
        sortWorker.sort(this.sortWorkers);
        let tableRows = sortWorker.map(
            (item) => <Row key={item.id} className={+this.props.workers.new === item.id ? "new" : ""} worker={item}/>
        );
        return (
            <div>
                <div className="title-wrapper">
                    <div className="title">
                        Сотрудники
                    </div>
                </div>
                <div className="table">
                    <div className="table-header">
                        <div className={"table-header__item " +
                        (this.state.sort.field === 'surname' ? 'sort' +
                        (this.state.sort.desc ? '-desc' : '-asc') : 'unsort')}
                             onClick={this.changeSort.bind(this, 'surname')}>
                            Фамилия
                        </div>
                        <div className={"table-header__item " +
                        (this.state.sort.field === 'name' ? 'sort' +
                        (this.state.sort.desc ? '-desc' : '-asc') : 'unsort')}
                             onClick={this.changeSort.bind(this, 'name')}>
                            Имя
                        </div>
                        <div className={"table-header__item " +
                        (this.state.sort.field === 'position' ? 'sort' +
                        (this.state.sort.desc ? '-desc' : '-asc') : 'unsort')}
                             onClick={this.changeSort.bind(this, 'position')}>
                            Должность
                        </div>
                    </div>
                    {sortWorker.length > 0 || <div className="table-row empty-row">Введите сотрудников</div> }
                    {tableRows}
                </div>
                <div
                    className={"flat-button" + (this.state.addOpen ? ' hide' : '') + (sortWorker.length ? '' : ' center')}
                    onClick={this.changeAddOpen}>{'\uE003'}</div>
                <div className={"modal-window " + (this.state.addOpen ? 'visible' : 'hide')}
                     onDoubleClick={this.handleDoubleClick}>
                    <ReactCSSTransitionGroup transitionEnterTimeout={400} transitionLeaveTimeout={400}
                                             transitionName={{enter: 'visible',leave: 'hide'}}>
                        {this.state.addOpen &&
                        <Add handleAddWorker={this.props.add} handleClose={this.changeAddOpen}/>}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
});