The "report" is in report.txt

To set up, you'll need to `npm install` in both `client` and `server`. Then `cd server && npm start` to run.


To develop the backend, you just need to `cd server && npm start`
To develop the frontend in isolation, you can `cd client && npm start` (but I think it depends on backend a lot now).
To develop the frontend with backend changes, you must `npm run build` in `client`, while `cd server && npm start` is running.