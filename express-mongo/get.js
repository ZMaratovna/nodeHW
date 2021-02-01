const axios = require('axios');
const baseURL = 'http://localhost:8080';
const config = {
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        'WhatWillSaveTheWorld': 'Love',
        'IKnowYourSecret': 'TheOwlsAreNotWhatTheySeem'
    },
}

axios.request({ ...config, url: `${baseURL}/users` })
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log('>>> Success! Look what I got from server! >>>', res.data)
    })
    .catch(err => {
        console.error('>>> Trouble with >>>', err)
    })