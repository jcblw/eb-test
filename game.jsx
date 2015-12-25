var React = require('react')
var Player = require('./player.jsx')

module.exports = React.createClass({

  getDefaultProps() {
    return {
      yMax: 1560,
      xMax: 1620,
      width: 320,
      height: 240,
      speed: 0.10
    }
  },

  getInitialState() {
    return {
      x: 250,
      y: 1620,
      isMovingNorth: false,
      isMovingSouth: false,
      isMovingWest: false,
      isMovingEast: false,
      theta: 0,
      distance: 0
    }
  },

  componentWillMount() {
    var self = this
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    var lastTime = Date.now()
    this.moveInterval = setInterval(this.moveLoop, 0)
  },

  componentWillUnmount() {
    clearInterval(this.moveInterval)
  },

  render () {
    var style = this.createStyle()
    var theta = this.calculateTheta()

    if (!this.isMoving()) theta = this.state.lastTheta
    var step = 1 + Math.floor(this.state.distance/8) % 2

    return (
      <div style={style}>
        <Player theta={theta} step={step}/>
      </div>
    )
  },

  createStyle () {
    var style = {
      // border: '1px solid red',
      width: this.props.width,
      height: this.props.height,
      position: 'relative',
      backgroundImage: 'url(assets/maps/fourside.png)',
      backgroundPosition: [-this.state.x+'px', -this.state.y+'px'].join(' '),
      backgroundRepeat: 'no-repeat',
      imageRendering: 'pixelated',
      boxShadow: '0px 2px 10px 4px rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    return style
  },

  onKeyDown (evt) {
    var code = evt.keyCode
    var action = keys[code]
    if (!action) return

    if (action === 'up')    this.setState({isMovingNorth: true})
    if (action === 'down')  this.setState({isMovingSouth: true})
    if (action === 'left')  this.setState({isMovingWest: true})
    if (action === 'right') this.setState({isMovingEast: true})
  },

  onKeyUp (evt) {
    var code = evt.keyCode
    var action = keys[code]
    if (!action) return

    this.setState({lastTheta: this.calculateTheta()})
    if (action === 'up')    this.setState({isMovingNorth: false})
    if (action === 'down')  this.setState({isMovingSouth: false})
    if (action === 'left')  this.setState({isMovingWest: false})
    if (action === 'right') this.setState({isMovingEast: false})
  },

  calculateTheta () {
    var x = 0
    var y = 0

    if (this.state.isMovingNorth) y += 1
    if (this.state.isMovingSouth) y -= 1
    if (this.state.isMovingWest) x += 1
    if (this.state.isMovingEast) x -= 1

    return Math.atan2(y, x)
  },

  isMoving () {
    var isMoving = this.state.isMovingEast ||
      this.state.isMovingWest ||
      this.state.isMovingNorth ||
      this.state.isMovingSouth

    return isMoving
  },

  moveLoop () {
    var lastTime = this.lastTime || Date.now() - 50
    this.lastTime = Date.now()

    if (!this.isMoving()) return this.setState({v: 0})

    var elapsed = Date.now() - lastTime
    var v = elapsed * this.props.speed

    var theta = this.calculateTheta()
    var x = this.state.x - (Math.cos(theta) * v)
    var y = this.state.y - (Math.sin(theta) * v)
    var distance = this.state.distance + v
    this.setState({x: x, y: y, distance: distance})
  }
})

var keys = {
  38: 'up',
  40: 'down',
  37: 'left',
  39: 'right',
  87: 'up', // w
  65: 'left', // a
  83: 'down', // s
  68: 'right', // d
}
