import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
    render: function () {
        return (
            <Link className={("table-row " + this.props.className).trim()} to={"/worker/" + this.props.worker.id}>
                <div className="table-row__item table-row__surname">{this.props.worker.surname}</div>
                <div className="table-row__item table-row__name">{this.props.worker.name}</div>
                <div className="table-row__item table-row__position">{this.props.worker.position}</div>
            </Link>
        );
    }
});