const http = require('http');
const PORT = process.env.PORT || 8080;
const URL = 'http://185.209.28.212/';
const OPTIONS = {
    hostname: URL,
    port: PORT,
    path: '/',
    headers: {
        'WhatWillSaveTheWorld': 'Love',
        'Content-Type': 'application/json',
    },
}
const requestBody = JSON.stringify('somenthing')
const httpRequest = ({ body = {}, method, ...options }) => new Promise((resolve, reject) => {
    const req = http.request({
        method,
        ...options,
    }, (res) => {
        const chunks = [];
        res.on('data', data => chunks.push(data))
        res.on('end', () => {
            let body = Buffer.concat(chunks);
            switch (res.headers['content-type']) {
                case 'application/json':
                    body = JSON.parse(body);
                    break;
            }
            resolve(body)
        })
    })
    req.on('error', reject);
    if (body) {
        req.write(body);
    }
    req.end();
});

const resPOST = await httpRequest({ body: requestBody, method: 'POST', OPTIONS })
const resGET = await httpRequest({ method: 'GET', OPTIONS })

console.log(resPOST);
console.log(resGET);