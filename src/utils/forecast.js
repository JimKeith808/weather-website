const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5e6b16a5ef7d33b086e2068f7568d051/' + latitude + ',' + longitude

    request({ url, json: true}, (error, {body}) => {
        if (error) {
        } else if (body.error) {
            callback('Unable to find location',undefined)     
        } else { 
            const info = body.currently
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + info.temperature + ' degrees out.' + 
            ' There is a ' + info.precipProbability + '% chance of rain.' )
        }
    })
}
module.exports = forecast