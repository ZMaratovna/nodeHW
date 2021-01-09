const axios = require('axios');

const config = {
    method: 'get',
    url: '/',
    baseURL: 'http://localhost:8080/',
    params: {
        name: 'ZHANNA'
    }
}
axios.request(config)
    .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log('>>> Success! Look what I got from server! >>>', res.data)
    })
    .catch(err => {
        console.error('>>> Trouble with >>>', err)
    })