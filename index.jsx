var React = require('react')
var RD = require('react-dom')
var App = require('./app.jsx')

var container = document.createElement('div')
document.body.appendChild(container)

var width = 320
var height = 240

RD.render(
  <App
    width={width}
    height={height} />,
  container
)
