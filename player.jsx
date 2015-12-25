var React = require('react')
var characters = require('./characters')

var PI = Math.PI

module.exports = React.createClass({

  getDefaultProps() {
    return {
      theta: 0,
      d: 0,
      step: 1,
      nDirections: 4,
      name: 'paula'
    }
  },

  getInitialState() {
    var character = characters[this.props.name]
    return character
  },

  render () {
    var theta = this.props.theta

    var orientation
    if (theta === 0 * PI/4) orientation = 'west'
    if (theta === 1 * PI/4) orientation = 'northWest'
    if (theta === 2 * PI/4) orientation = 'north'
    if (theta === 3 * PI/4) orientation = 'northEast'
    if (theta === 4 * PI/4) orientation = 'east'

    if (theta === -1 * PI/4) orientation = 'southWest'
    if (theta === -2 * PI/4) orientation = 'south'
    if (theta === -3 * PI/4) orientation = 'southEast'

    var spriteLocs = this.state.orientations[orientation]
    var spriteLoc = spriteLocs[this.props.step]
    var x = spriteLoc[0] * this.state.width
    var y = spriteLoc[1] * this.state.height
    var flip = spriteLoc[2] ? -1 : 1

    var style = {
      // border: '1px solid pink',
      width: this.state.width,
      height: this.state.height,
      background: 'url(' + this.state.sprite + ')',
      backgroundPosition: [-x+'px', -y+'px'].join(' '),
      transform: 'scaleX(' + flip + ')'
    }

    return (
      <div style={style} />
    )
  }
})
