// Import necessary modules
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser'); // Import body-parser to handle JSON requests
const https = require('https'); // Import https for making external requests

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

// Example route to receive user IDs and cookies
app.post('/fetch-user-ids', (req, res) => {
    const { userIds, cookies } = req.body;
    console.log(userIds);
    res.status(200).json({ message: 'User IDs received', userIds });
});

// Route to fetch user details
app.use(express.json()); // Ensure the server can parse JSON bodies

app.post('/fetch-user-details', (req, res) => {
    const { cookies } = req.body;
    console.log(cookies, "cookies")
    if (!cookies) {
        return res.status(400).json({ error: 'userId and cookies in request body are required' });
    }
    const url = `https://api.subcount.app/channel/subscribercount/v2/${cookies}`;
    const options = {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'authorization': 'Basic eXRzYzpiZWk2emVleGFlMGFlaGFlMkhlZXcyZWVt',
            'if-none-match': 'W/"2a-kdTHNTrBmneAYAEjbz3+g1Xj3EM"',
            'origin': 'https://subscribercounter.com',
            'priority': 'u=1, i',
            'referer': 'https://subscribercounter.com/',
            'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
        }
    };

    https.get(url, options, (externalRes) => {
        let data = '';

        externalRes.on('data', (chunk) => {
            data += chunk;
        });

        externalRes.on('end', () => {
            try {
                // Parse the data as JSON
                const parsedData = JSON.parse(data);
                console.log(parsedData.data.count, "parsedData.data.count")
                res.json(parsedData.data.count);
            } catch (error) {
                // Handle JSON parsing error
                console.error('Error parsing JSON:', error);
                res.status(500).send('Error parsing JSON');
            }
        });
    }).on('error', (err) => {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
    });
});

app.use(require('./controllers/index')); // Assuming you have a controller

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

