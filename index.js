const http = require('http')
const url = require('url')
const fs = require('fs')
const port = 8080;
const dbName = 'users.json';
let data = [];

if (fs.existsSync(dbName)) {
    data = JSON.parse(fs.readFileSync(dbName, 'utf8'));
    console.log('>>> data read from file:', data);
}

const requestHandler = (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (queryObject.name &&
        req.method === 'POST' &&
        req.headers.iknowyoursecret === 'TheOwlsAreNotWhatTheySeem'
    ) {
        data.push({ name: queryObject.name, ip: ip });
        fs.writeFile(dbName, JSON.stringify(data), (err) => {
            if (err) {
                throw err;
            }
        })
        res.end(`Hello ${data.map(user => user.name).join(',')}`)
    }
    if (
        req.method == 'POST' &&
        req.headers.whatwillsavetheworld === 'Love'
    ) {
        console.log('You are absolutely right!')
    }
    if (
        req.method === 'GET'
    ) {
        console.log(`Yay! You sent GET request with ${queryObject.name}!`);
        res.end();
    }

}
const server = http.createServer(requestHandler);
server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})