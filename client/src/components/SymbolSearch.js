import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLatestQuote, tradeStock } from '../store/thunks';
import { debounce } from 'lodash';

export default connect(({ quotes, quoteLoading }) => ({ quotes, quoteLoading }))(class SymbolSearch extends Component {

    constructor(...args) {
        super(...args);

        this.state = {};
    }

    _onTermChange = debounce(term => {
        if (!this.props.quotes[term] && !this.props.quoteLoading[term]) {
            this.props.dispatch(getLatestQuote(term))
        }
        this.setState({
            term
        });
    }, 500);
    onTermChange = e => this._onTermChange(e.target.value);

    buy = () => {
        const fullSymbol = this.props.quotes[this.state.term].symbol;
        this.props.dispatch(tradeStock(fullSymbol, Number(this.amountInput.value)));
    };

    sell = () => {
        const fullSymbol = this.props.quotes[this.state.term].symbol;
        this.props.dispatch(tradeStock(fullSymbol, -Number(this.amountInput.value)));
    };

    render() {
        const quote = this.props.quotes[this.state.term];
        const loading = this.props.quoteLoading[this.state.term];
        return (
            <div className="symbol-search">
                <label className="assistive" htmlFor="symbol-input">Stock search</label><input id="symbol-input" onChange={this.onTermChange} />
                {loading && <div className="loading">Loading...</div>}
                {quote &&
                    <div className="results">
                        <dl>
                            <dt>Symbol</dt><dd>{quote.symbol}</dd>
                            <dt>Open</dt><dd>{quote.latest.open}</dd>
                            <dt>Close</dt><dd>{quote.latest.close}</dd>
                        </dl>
                        <input type="number" ref={el => (this.amountInput =  el)} />
                        <button onClick={this.buy}>Buy</button>
                        <button onClick={this.sell}>Sell</button>
                    </div>
                }
            </div>
        );
    }
});