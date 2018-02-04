const request = require('request-promise-native');

function dateToISODateString(date) {
    date.toISOString().substring(0, 4 + 1 + 2 + 1 + 2) // extract date from ISO;
}

const apiKey = process.env.ALPHA_VANTAGE_KEY || 'JPJ31K164GIGSSIZ';

function parseAVtimeSeriesData(item) {
    return {
        open: item['1. open'],
        high: item['2. high'],
        low: item['3. low'],
        close: item['4. close'],
        volume: item['5. volume']
    }
}

function getLatestQuote(symbol) {
    return request({
        uri: 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=1min&apikey=' + apiKey,
        json: true
    }).then(body => {
        const series = body["Time Series (1min)"];
        const lastDate = Object.keys(series).sort((a,b) => a - b)[0];
        return parseAVtimeSeriesData(series[lastDate])
    });
}

module.exports = {
    getLatestQuote
};