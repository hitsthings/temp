import { API_ROOT } from './config';

export function fetchApi(relativeUrl, options) {
    return fetch(API_ROOT + relativeUrl, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        ...options
    });
}

