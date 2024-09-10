const https = require('https');

// Define the URL with query parameters
const userId = '2114198'; // Replace with actual userId you want to test
const cookies = 'loggedOutStatus=false; countryId=3857; regionId=3858; chapterId=3867; logCurTime=1723708832239; JSESSIONID=297048D0BA36255222F946BE83BF0071; OLDSESSIONID=297048D0BA36255222F946BE83BF0071; lastSelectedLandingMenuId=6'; // Replace with actual cookies value
const url = `https://www.bniconnectglobal.com/web/secure/networkProfile?userId=2114198&canAddNetwok=true&_=1723656020021`;

// Perform the GET request
https.get(url, (res) => {
    let data = '';

    // Collect data chunks
    res.on('data', (chunk) => {
        data += chunk;
    });

    // Handle end of response
    res.on('end', () => {
        console.log('Response:', data);
    });
}).on('error', (err) => {
    console.error('Error:', err);
});
