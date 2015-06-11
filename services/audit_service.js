var serviceBus = require('servicebus').bus({url: 'amqp://localhost:5672'});
var util = require('util');

var auditService = {
    log: function(event, message){
        console.log("Event: " + event.toString() + " Payload: " + message);
    },

    init: function(){
        var self = this;

        serviceBus.listen('audit', function(eventName, message){
            self.log(eventName, message);
        })
    }
}

module.exports = auditService;