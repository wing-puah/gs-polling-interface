# How to use
This requires node to run. If you don't have it, download the suitable release at https://nodejs.org/en/

Fill up the sheetID and API_KEY in both the file, `routes/index.js` and `public/js/pollData.js`.

Once this is done, open up your command line, and run `npm install` to install the required dependencies. Once that is done, start the localhost registration interface with `npm run start`.

## How it works
Every 1s (1000ms), the system will poll the Google sheet to check for new input. If there is a new entry, ajax will replace the interface with the new details. It will also increment the `currentIdx` variable by 1 to poll for the next new entry.

## Troubleshooting
If for some reason the server was stopped. Rerunning it will start the loop from the entry in second row. To change that and start the loop from the latest entry, change `currentIdx` in both `routes/index.js` and `public/js/pollData.js` to the row number that you will like to continue looping from. 
