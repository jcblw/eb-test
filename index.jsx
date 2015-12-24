var React = require('react')
var RD = require('react-dom')
var App = require('./app.jsx')

var width = 320
var height = 240

var container = document.createElement('div')
document.body.appendChild(container)

RD.render(
  <App
    width={width}
    height={height} />,
  container
)
