const https = require('https');

const url = 'https://www.bniconnectglobal.com/web/secure/networkProfile?userId=1913724&canAddNetwok=true'
const options = {
    method: 'GET',
    headers: {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'loggedOutStatus=false; countryId=3857; regionId=3858; chapterId=3867; logCurTime=1723716693831; JSESSIONID=FB7E7472DF84D9EEEE710C7345038CA7; OLDSESSIONID=FB7E7472DF84D9EEEE710C7345038CA7; lastSelectedLandingMenuId=6',
        'priority': 'u=1, i',
        'referer': 'https://www.bniconnectglobal.com/web/secure/networkHome?userId=1199473',
        'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36',
        'x-requested-with': 'XMLHttpRequest'
    }
};

// Make the HTTPS GET request
const req = https.request(url, options, (externalRes) => {
    let data = '';

    // Log the status code
    console.log('Status Code:', externalRes.statusCode);

    // Collect the data chunks
    externalRes.on('data', (chunk) => {
        data += chunk;
    });

    // When response ends, log the data
    externalRes.on('end', () => {
        console.log('Response Data:', data);
    });
});

// Handle any errors
req.on('error', (err) => {
    console.error('Error fetching data:', err);
});

// End the request
req.end();
