import React, {Component} from 'react';
import Button from './Button';
import * as Constants from './Constants'

class Keypad extends Component {
  renderButton(i) {

    const buttonStyle = {
      backgroundColor:'lightgreen',
      width: 80 * Constants.ASPECT_RATIO,
      height: 35 * Constants.ASPECT_RATIO,
      fontSize:`${15 * Constants.ASPECT_RATIO}px`,
    };

    return <Button
      key={i}
      value={i}
      onClick={() => this.props.onClick(i)}
      onMouseUp={(event) => this.props.onMouseUp(event)}
      onMouseDown={(event) => this.props.onMouseDown(event)}
      buttonStyle={buttonStyle}
    />;
  }

  render() {
    return(
      <div>
        <div>
          {this.renderButton(Constants.KEY_CLEAR)}
          {this.renderButton(Constants.KEY_DELETE)}
          {this.renderButton(Constants.PERIOD)}
          {this.renderButton(Constants.OPER_DIV)}
        </div>
        <div>
          {this.renderButton(Constants.NBR_SEVEN)}
          {this.renderButton(Constants.NBR_EIGHT)}
          {this.renderButton(Constants.NBR_NINE)}
          {this.renderButton(Constants.OPER_MULT)}
        </div>
        <div>
          {this.renderButton(Constants.NBR_FOUR)}
          {this.renderButton(Constants.NBR_FIVE)}
          {this.renderButton(Constants.NBR_SIX)}
          {this.renderButton(Constants.OPER_SUBS)}
        </div>
        <div>
          {this.renderButton(Constants.NBR_ONE)}
          {this.renderButton(Constants.NBR_TWO)}
          {this.renderButton(Constants.NBR_THREE)}
          {this.renderButton(Constants.OPER_ADD)}
        </div>
        <div style={{marginLeft: 80 * Constants.ASPECT_RATIO}}>
          {this.renderButton(Constants.NBR_ZERO)}
          {this.renderButton(Constants.OPER_EQUAL)}
        </div>
      </div>
    );
  }
}

export default Keypad;
