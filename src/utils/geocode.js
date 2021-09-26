const request =require('request')

const geocode =(address, callback) => {
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieWFzaHRoYW1hbiIsImEiOiJja3RjZ296ZDYwZjNuMnhydzVwZWF1ZXlyIn0.J8SEOb-nVejEVgxAGBewoA&limit=1'
    request({ url: geourl,json:true},(error, response)=>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if (response.body.features.length === 0){
            callback('Unable to find location. Try again!', undefined)
        }else{
            callback(undefined,{
                 latitude : response.body.features[0].center[1],
                 longitude : response.body.features[0].center[0],
                 location : response.body.features[0].place_name

            })
        }
    })
}

module.exports = geocode