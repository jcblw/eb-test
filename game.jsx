var React = require('react')

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

var actionIntervals = {}

module.exports = React.createClass({

  getDefaultProps() {
    return {
      yMax: 1560,
      xMax: 1620
    }
  },

  getInitialState() {
    return {
      x: 150,
      y: 1620,
      yOrientation: 'south'
    }
  },

  componentWillMount() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  },

  render () {
    var style = this.createStyle()
    return (
      <div style={style}>
        {this.renderCharacter()}
      </div>
    )
  },

  renderCharacter () {
    var style = {
      top: this.props.height/2,
      left: this.props.width/2,
      position: 'absolute'
    }

    var prefix = '/assets/sprites/paula/'

    var orientations = []
    if (this.state.yOrientation) orientations.push(this.state.yOrientation)
    if (this.state.xOrientation) orientations.push(this.state.xOrientation)

    var d = Math.sqrt(this.state.x + this.state.y, 2)
    var step = (Math.floor(d*8) % 2) + 1

    var imgUrl =  prefix + orientations.join('-') + '-' + step + '.gif'

    return (
      <img style={style} src={imgUrl} />
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
      boxShadow: '0px 2px 10px 4px rgba(0,0,0,0.5)'
    }

    return style
  },

  onKeyDown (evt) {
    var self = this
    var code = evt.keyCode
    var action = keys[code]
    if (!action) return

    if (!actionIntervals[action]) {
      var tStart = Date.now()
      actionIntervals[action] = setInterval(function () {
        var dt = Date.now() - tStart
        var d = dt * 0.12
        if (action === 'up')    self.setState({y: self.state.y - d, yOrientation: 'north'})
        if (action === 'down')  self.setState({y: self.state.y + d, yOrientation: 'south'})
        if (action === 'left')  self.setState({x: self.state.x - d, xOrientation: 'west'})
        if (action === 'right') self.setState({x: self.state.x + d, xOrientation: 'east'})
        tStart = Date.now()
      }, 0)
    }

  },

  onKeyUp (evt) {
    var code = evt.keyCode
    var action = keys[code]
    if (!action) return

    if (actionIntervals[action]) {
      if (action === 'up' && this.state.xOrientation) this.setState({yOrientation: null})
      if (action === 'down' && this.state.xOrientation) this.setState({yOrientation: null})

      if (action === 'left' && this.state.yOrientation) this.setState({xOrientation: null})
      if (action === 'right' && this.state.yOrientation) this.setState({xOrientation: null})

      clearInterval(actionIntervals[action])
      actionIntervals[action] = null
    }
  }
})
