var React = require('react')

var PI = Math.PI

module.exports = React.createClass({
  getDefaultProps() {
    return {
      theta: 0,
      d: 0,
      step: 1
    }
  },

  render () {
    var style = {}

    var prefix = '/assets/sprites/paula/'

    var orientation

    var theta = this.props.theta

    if (theta === 0 * PI/4) orientation = 'west'
    if (theta === 1 * PI/4) orientation = 'north-west'
    if (theta === 2 * PI/4) orientation = 'north'
    if (theta === 3 * PI/4) orientation = 'north-east'
    if (theta === 4 * PI/4) orientation = 'east'

    if (theta === -1 * PI/4) orientation = 'south-west'
    if (theta === -2 * PI/4) orientation = 'south'
    if (theta === -3 * PI/4) orientation = 'south-east'

    var imgUrl =  prefix + orientation + '-' + this.props.step + '.gif'

    return (
      <img style={style} src={imgUrl} />
    )
  }
})
