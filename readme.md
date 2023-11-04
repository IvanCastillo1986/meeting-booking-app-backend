# To run
Open the terminal and navigate to the same level in the blackstone-backend React app as package.json:
blackstone_backend/

Create a file titled .env in this directory and copy/paste the following text, as is, without quotes: 
PORT=3333
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=meetings_dev
PG_USER=postgres

After you've done this, save the file before closing.

Then, open the command line on this same level and run the following command:
npm install
This will automatically install all of the node_modules files required to run application.

Next, run the following command in terminal:
nodemon
You should see a message that reads:
Listening on port 3333

You can open a browser and navigate to the url: 
localhost:3333

You should see the following message on the browser's page:
Welcome to the clients booking API

After you've done this, open the front-end project and follow the README.md file
there.
