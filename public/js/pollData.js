$(function() {
  const sheetID = 'REPLACE THIS WITH YOUR SHEET ID';
  const sheetName = 'Laptop 1';
  const API_KEY= 'REPLACE THIS WITH YOUR API KEY';
  let USER_INFO = [];
  let _temp = [];
  let currentIdx = 2;

  async function getGoogleResults(sheetRange) {
    let userInfo = [];
    let promise = $.get(`https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}${sheetRange}?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&fields=values&key=${API_KEY}`)
      .done(results => {
        if (typeof results.values !== 'undefined') {
          const info = results.values;
          const header = ['Name', 'Seat', 'Area', 'Company', 'Position'];
          info[0].map((el, idx) => (userInfo[header[idx]] = el));
        } else {
          console.log('No new user found');
        }
      })
      .fail(() => {console.log('Error in polling.')})

    await promise;
    USER_INFO = userInfo;
    return userInfo;
  }

  setInterval(
    function() {
      let range = `!A${currentIdx+1}:E${currentIdx+1}`;
      getGoogleResults(range);

      Object.keys(USER_INFO).forEach(function(key) {
        if(_temp.Name !== USER_INFO.Name) {
          currentIdx += 1;
        }

      if(_temp[key] !== USER_INFO[key]) {
        $(`#${key.toLowerCase()}`).text(USER_INFO[key]);
      }
      _temp[key] = USER_INFO[key];
    });
  }, 1000);
});
