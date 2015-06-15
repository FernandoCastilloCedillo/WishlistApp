var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    path = require('path')

app.use(express.static( __dirname + "/" ))

server.listen(3000, function(){
  console.log('server listening on port 3000')
})