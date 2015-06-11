var serviceBus = require('servicebus').bus({url: 'amqp://localhost:5672'});
var viewCachedData = null;
var shortUrlResponseEvent = 'shortUrlResponseEvent';

var viewGeneratorService = {
    init: function(){
        serviceBus.listen(shortUrlResponseEvent, function(payload){
            console.log('Pauload received in view generator');
            viewCachedData = payload.data.shortUrl;
            console.log(viewCachedData);
        })
    },

    getUrl: function(){
        console.log('DIsplaying viewCachedData', viewCachedData)
        return viewCachedData;
    }


}

module.exports = viewGeneratorService;