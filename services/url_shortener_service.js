var serviceBus = require('servicebus').bus({url: 'amqp://localhost:5672'});
var shortUrlResponseEvent = 'shortUrlResponseEvent';
var auditService = require('./audit_service.js');


var UrlShortnerService = {
   init: function(){
       var self = this;
       console.log("Service Shortener started...");
       serviceBus.listen('shortenUrlRequestEvent', function (payload) {
           console.log("-------- Payload received ----");
           console.log(payload);
           self.publishMessage(payload);
           serviceBus.send('audit', {event: 'shortenUrlRequestEvent', data: payload});
       });
   },

    publishMessage: function(payload){
        serviceBus.send(shortUrlResponseEvent,
                {data: {shortUrl: 'http://go.gl/123'}})
        console.log("-------- Payload sent ----");
        serviceBus.send('audit', {event: 'shortUrlResponseEvent', data: payload});

    }
}

module.exports = UrlShortnerService;