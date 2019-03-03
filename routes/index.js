// https://developers.google.com/apps-script/guides/triggers/

let axios = require('axios');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const sheetID = 'REPLACE THIS WITH YOUR SHEET ID ';
  const sheetName = 'Laptop 1';
  const row = 2; // Just for the initial entry 
  const range = `!A1:E${row}`
  const API_KEY= 'REPLACE THIS WITH YOUR API KEY';
  let USER_INFO = [];
  let _temp = [];

  async function getGoogleResults() {
    let userInfo = [];
    let promise = axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}${range}?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&fields=values&key=${API_KEY}`)
      .then(results => {
        const info = results.data.values
        const header = info[0];
        info[1].map((el, idx) => (userInfo[header[idx]] = el));
      })

    await promise;
    return userInfo;
  }

  getGoogleResults()
    .then(data => {USER_INFO = data})
    .then(() => res.render('index', { invites: USER_INFO }))
});

module.exports = router;
