var busUrl = 'amqp://localhost:5672'
var serviceBus = require('servicebus').bus({url: busUrl, enableConfirms:true});
serviceBus.use(serviceBus.package());
serviceBus.use(serviceBus.correlate());
serviceBus.use(serviceBus.retry());

var auditService = require('./../services/audit_service.js');
var viewGeneratorService = require('./../services/view_generator_service.js');

var shortUrlRequestEvent = {
	type: 'shortenUrlRequestEvent',
	data: {
		longUrl: 'http://www.google.com',
		userId: 1
	}
};

var shortUrlResponseEvent = 'shortUrlResponseEvent';



module.exports.create = {
	description: 'Home page',	
	handler: function(request, reply){


		setInterval(function(){
			console.log("Message sent" + new Date() );
			serviceBus.send('newEventArrived', {
				event: shortUrlRequestEvent.type,
				params: (new Date()).toString()
			}, {})
		}, 2000)


		serviceBus.send(shortUrlRequestEvent.type.toString(), shortUrlRequestEvent);
		reply.view('index', {'title': 'Services'});

	}
}

module.exports.index = {
	description: 'urls Page',
	handler: function(request, reply){
		console.log('In here')
		console.log(viewGeneratorService.getUrl());


		reply.view('show', {'title': 'URL',
				            'shortUrl': viewGeneratorService.getUrl()}
							);
	}
}
