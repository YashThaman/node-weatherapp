const request =require('request')

const forecast = (longitude , latitude ,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=ce0f7146901cd6d0808d6fa2c3250f71&query='+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)+'&units=f'
    request({url, json: true},(error,{body})=>{   // since url: url has same  name we use object Shorthand and destructure response to { body }
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if (body.error){
            callback('Unable to find location. Try again!', undefined)
        }else{
            callback(undefined,
                body.current.weather_descriptions[0]+' . It is currently '+body.current.temperature+' degree out. It feels like '+body.current.feelslike+' degree out . The humidity is :'+body.current.humidity+"%"
 
                )
        }
    })
    
}

module.exports = forecast