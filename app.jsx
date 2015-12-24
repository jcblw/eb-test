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
    console.log('this.state', this.state)
    console.log('this', this)
    var style = {
      width: this.props.width,
      height: this.props.height,
      border: '1px solid red',
      backgroundImage: 'url(assets/maps/fourside.png)',
      backgroundPosition: [-this.state.x+'px', -this.state.y+'px'].join(' '),
      backgroundRepeat: 'no-repeat',
      imageRendering: 'pixelated'
    }

    return style
  }
})
