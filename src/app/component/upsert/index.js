import React from 'react'

export default React.createClass({
    getInitialState: function () {
        return ({
            idWorker: -1,
            worker: {
                name: '',
                surname: '',
                position: '',
                about: ''
            },
            valid: {
                name: true,
                surname: true,
                position: true
            }
        });
    },
    validator: function () {
        let allValid = true;
        let valid = {...this.state.valid};
        for (let key in valid) {
            if (this.state.worker[key].length < 3) {
                valid[key] = false;
                allValid = false;
            }
        }
        this.setState({valid: valid});
        return allValid;
    },
    handleAddWorker: function () {
        if (this.validator()) {
            this.props.handleAddWorker(this.state.worker);
            this.props.handleClose();
        }
    },
    handleEditWorker: function () {
        if (this.validator()) {
            this.props.handleEditWorker(this.state.idWorker, this.state.worker);
            this.props.handleClose();
        }
    },
    handleDelWorker: function () {
        this.props.handleDelWorker(this.state.idWorker);
        this.props.handleClose();
        //go to main page
        window.location.hash = '';
    },
    componentWillMount: function () {
        //if form in edit mode -> copy props to state
        if (this.props.idWorker >= 0) {
            this.setState({idWorker: this.props.idWorker, worker: this.props.worker})
        }
    },
    handleChange: function (e) {
        let worker = {...this.state.worker};
        worker[e.target.name] = e.target.value;
        let valid = {...this.state.valid};
        if (e.target.name !== 'about') {
            valid[e.target.name] = true;
        }
        this.setState({worker: worker, valid: valid});
    },
    handleKeyDown(e){
        if (e.keyCode === 13 &&
            (e.target.tagName.toUpperCase() === "INPUT" || e.ctrlKey)) {
            if (this.state.idWorker >= 0)
                this.handleEditWorker();
            else
                this.handleAddWorker();
        }
    },
    render: function () {
        return (
            <div className="upsert-form">
                <div className="standart-button button-close"
                     onClick={this.props.handleClose}>{'\uE005'}</div>
                <div className="title-wrapper">
                    <div className="title">
                        {this.props.idWorker >= 0 ? 'Редактировать' : 'Новый сотрудник'}
                    </div>
                </div>
                <form>
                    <div className={this.state.valid.surname?'valid':'noValid'}>
                        <input type="text" name="surname" placeholder="Фамилия" autoFocus={true}
                               onChange={this.handleChange} onKeyDown={this.handleKeyDown}
                               value={this.state.worker.surname}/>
                    </div>
                    <div className={this.state.valid.name?'valid':'noValid'}>
                        <input type="text" name="name" placeholder="Имя"
                               onChange={this.handleChange} onKeyDown={this.handleKeyDown}
                               value={this.state.worker.name}/>
                    </div>
                    <div className={this.state.valid.position?'valid':'noValid'}>
                        <input type="text" name="position" placeholder="Должность"
                               onChange={this.handleChange} onKeyDown={this.handleKeyDown}
                               value={this.state.worker.position}/>
                    </div>
                    <textarea name="about" placeholder="Описание" onKeyDown={this.handleKeyDown}
                              onChange={this.handleChange} value={this.state.worker.about}/>
                </form>
                <div className="button-wrapper">
                    { this.props.idWorker >= 0 ||
                    <div className="standart-button button-add" onClick={this.handleAddWorker}>{'\uE002'}</div>}
                    { this.props.idWorker >= 0 &&
                    <div className="standart-button button-edit" onClick={this.handleEditWorker}>{'\uE002'}</div>}
                    { this.props.idWorker >= 0 &&
                    <div className="standart-button button-delete" onClick={this.handleDelWorker}>{'\uE007'}</div>}
                </div>
            </div>
        );
    }
});