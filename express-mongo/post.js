const axios = require('axios');
const baseURL = 'http://localhost:8080';
const config = {
    method: 'post',
    data: {
        name: 'xczvczbvc',
        password: '13467889'
    },
    headers: {
        'Content-Type': 'application/json',
        'WhatWillSaveTheWorld': 'Love',
        'IKnowYourSecret': 'TheOwlsAreNotWhatTheySeem'
    },
}

// axios.request({ ...config, url: `${baseURL}/login` })
//     .then(res => {
//         console.log(`statusCode: ${res.status}`)
//         console.log('>>> Success! Look what I sent to server! >>>', res.data)
//     })
//     .catch(error => {
//         console.error('>>> Trouble with >>>', error)
//     })

axios.request({ ...config, url: `${baseURL}/add` })
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log('>>> Success! Look what I got from server! >>>', res.data)
    })
    .catch(error => {
        console.error('>>> Trouble with >>>', error)
    })
