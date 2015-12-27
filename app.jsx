var React = require('react')
var Game = require('./game.jsx')

module.exports = React.createClass({

  getDefaultProps() {
    return {
      gameWidth: 320,
      gameHeight: 240
    }
  },

  getInitialState() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },

  componentWillMount() {
    window.addEventListener('resize', this.onResize)
  },

  render () {
    var style = this.createStyle()
    return (
      <div style={style}>
        <Game
          width={this.props.gameWidth}
          height={this.props.gameHeight} />
      </div>
    )
  },

  createStyle () {
    var style = {
      // border: '1px solid red',
      background: 'rgba(50,50,50,1)',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: this.state.width,
      height: this.state.height,
    }

    return style
  },

  onResize () {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }
})
