var Hapi = require('hapi')
var server = new Hapi.Server();
var Path = require('path');
var Routes = require('./config')
var urlShortnerService = require('./services/url_shortener_service.js');
var auditService = require('./services/audit_service.js');
var viewGeneratorService = require('./services/view_generator_service.js');

urlShortnerService.init();
auditService.init();
viewGeneratorService.init();

server.connection({port: 8007});

server.register([
    {
        register: Routes,
        options: {}
    }
], function(err){
    if (err)
      throw err;
})


console.log(Path.join(__dirname, "./views"))


server.views({
	engines:  {
		html: require('ejs')
	},
	path: Path.join(__dirname, './views'),
	layoutPath: Path.join(__dirname, './views/layouts'),
	layout: 'application'
})


server.start(function(){

   	console.log("Server started on port 8007");
    //console.log(process.env.NODE_ENV);
//    console.log(require('./config/database_connection.js'));

});