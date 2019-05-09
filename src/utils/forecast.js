const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5e6b16a5ef7d33b086e2068f7568d051/' + latitude + ',' + longitude

    request({ url, json: true}, (error, {body}) => {
        if (error) {
        } else if (body.error) {
            callback('Unable to find location',undefined)     
        } else { 
            const info = body.currently
            const day = body.daily.data[0]
            const hTime = new Date(day.temperatureHighTime).toString()
            const lTime = new Date(day.temperatureLowTime).toString() 
            var forecastMsg = day.summary + ' It is currently ' + info.temperature + ' degrees out.'
                            + '\nLow of ' + day.temperatureLow + ' degrees at ' + lTime  
                            + '\nHigh of ' + day.temperatureHigh + ' degrees at ' + hTime 
                            + '\nThere is a ' + info.precipProbability + '% chance of rain.'
            callback(undefined,forecastMsg)
        }
    })
}
module.exports = forecast