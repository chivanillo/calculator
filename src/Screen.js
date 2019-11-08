import React, {Component} from 'react';

class Screen extends Component {
  render() {
    return(
      <label style={this.props.properties}>
        {this.props.message}
      </label>
    );
  }
}

export default Screen;
