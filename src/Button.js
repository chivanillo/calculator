import React, {Component} from 'react';

class Button extends Component {
  render() {
    return(
      <button style={this.props.buttonStyle}
              onClick={this.props.onClick}
              onMouseUp={this.props.onMouseUp.bind(this)}
              onMouseDown={this.props.onMouseDown.bind(this)}
              onMouseOut={this.props.onMouseUp.bind(this)}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Button;
