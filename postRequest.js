const axios = require('axios');

const config = {
    method: 'post',
    url: '/',
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
        'WhatWillSaveTheWorld': 'Love',
        'IKnowYourSecret': 'TheOwlsAreNotWhatTheySeem'
    },
    params: {
        name: 'ZHANNA'
    }
}
axios.request(config)
    .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log('>>> Success! Look what I got from server! >>>', res.data)
    })
    .catch(error => {
        console.error('>>> Trouble with >>>', error)
    })
