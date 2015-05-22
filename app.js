var express = require('express')
  , lsq = require('lsq')
  , http = require('http')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , debug = require('debug')
  , methodOverride = require('method-override')
  , log = debug('app:log')
  , error = debug('app:error')
  , app = express()
  , tools = require('./tools')

  app
  .set('port', process.env.PORT || 3000)  
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(methodOverride('_method'))
  .use(tools.getReportingInfo(tools.report))
  .use('/api/v1/',require('./api/v1'))
  .use(express.static('public'))
  .get('/',tools.homePage)
  .get('/test', tools.test)
  .get('/health',tools.healthCheck)
  .listen(app.get('port'),function(){
    console.log("Express server listening on port " + app.get('port'))
  })