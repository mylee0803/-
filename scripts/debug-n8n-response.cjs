const https = require('https');
const fs = require('fs');

const url = 'https://unscarved-dictatorially-dulce.ngrok-free.dev/webhook/get-wines';

console.log(`Fetching from: ${url}`);

https.get(url, {
    headers: {
        'ngrok-skip-browser-warning': 'true',
        'User-Agent': 'Node.js Debug Script'
    }
}, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                console.error(`Status Code: ${res.statusCode}`);
                console.error('Body:', data);
                return;
            }

            const json = JSON.parse(data);
            console.log('Successfully fetched data.');

            if (Array.isArray(json) && json.length > 0) {
                console.log('Writing first item to debug-output.json');
                fs.writeFileSync('scripts/debug-output.json', JSON.stringify(json[0], null, 2), 'utf8');
                console.log('Available Keys:', Object.keys(json[0]).join(', '));
            } else {
                console.log('Data is empty or not an array:', json);
            }
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
            // console.log('Raw Data:', data); // Avoid spamming console
        }
    });

}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
