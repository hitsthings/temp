
// during dev, I hardcode this to localhost:3000 because I often run the frontend non-API off of 3001
export const API_ROOT = (window.location.hostname === 'localhost' ? 'http://localhost:3000' : window.location.origin) + '/api';