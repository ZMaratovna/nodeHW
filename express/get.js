const axios = require('axios');
const baseURL = 'http://localhost:8080/api';
const name = 'somebody'
const config = {
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        'WhatWillSaveTheWorld': 'Love',
        'IKnowYourSecret': 'TheOwlsAreNotWhatTheySeem'
    },
}
axios.request({ ...config, url: `${baseURL}/${name}` })
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log('>>> Success! Look what I got from server! >>>', res.data)
    })
    .catch(err => {
        console.error('>>> Trouble with >>>', err)
    })