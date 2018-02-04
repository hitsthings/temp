import React, { Component } from 'react';
import { connect } from 'react-redux';

import { tradeCash } from '../store/thunks';

export default connect()(class MyAccount extends Component {

    invest = () => {
        this.props.dispatch(tradeCash(Number(this.amountInput.value)));
    };

    divest = () => {
        this.props.dispatch(tradeCash(-Number(this.amountInput.value)));
    };

    render() {
        const { cash, stocks } = this.props.user;
        return (
            <section className="account">
                <dl>
                <dt className="cash-balance">Cash</dt><dd>{cash}</dd>
                {
                    !stocks ? null : stocks.map(({symbol, shares}) => (
                    <React.Fragment key={symbol}>
                        <dt>{symbol}</dt><dd>{shares}</dd>
                    </React.Fragment>
                    ))
                }
                </dl>
                <h2>Invest more cash</h2>
                <input type="number" ref={el => (this.amountInput = el)} />
                        <button onClick={this.invest}>Invest</button>
                        <button onClick={this.divest}>Divest</button>
            </section>
        );
    }
});