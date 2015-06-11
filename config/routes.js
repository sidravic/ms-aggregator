var UrlsController = require('./../controllers/urls_controller.js')

module.exports = [
    { path: '/short-url', method: 'GET', config: UrlsController.index },
    { path: '/', method: 'POST', config: UrlsController.create }

]