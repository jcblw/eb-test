var React = require('react')

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
      y: 1620
    }
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

    return (
      <img style={style} src={'assets/sprites/paula/south-1.gif'} />
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
  }
})
