import React, {Component} from 'react';
import Screen from './Screen';
import Keypad from './Keypad';
import * as Constants from './Constants'

class Calculator extends Component{

  constructor(props) {
    super(props);
    this.state = {
      leftNumber: [],
      rightNumber: [],
      operator: null,
      result: null
    };
  }

  getNumberFromArray(array) {
    if(array.length === 0)
      return 0;

    const text = array.join('');

    if(text.indexOf(Constants.PERIOD) > 0)
      return parseFloat(text);
    else
      return parseInt(text, 10);
  }

  handleOnMouseUp(event) {
    event.target.style.backgroundColor = 'lightgreen';
  }

  handleOnMouseDown(event) {
    event.target.style.backgroundColor = 'lightgray';
  }

  handleClick(i) {
    let leftNumber = this.state.leftNumber.slice()
      , rightNumber = this.state.rightNumber.slice()
      , operator = this.state.operator
      , result = this.state.result;

    if(i === Constants.KEY_CLEAR) {
      leftNumber = [];
      rightNumber = [];
      operator = null;
      result = null;
    } else if(!result) { //If result is not yet available... check the clicked Key
      if(i === Constants.KEY_DELETE) {
        if(rightNumber.length > 0) {
          leftNumber = leftNumber.slice();
          rightNumber = rightNumber.slice(0, rightNumber.length - 1);
        } else {
          leftNumber = leftNumber.slice(0, leftNumber.length - 1);
          rightNumber = rightNumber.slice();
        }
      } else if(i === Constants.OPER_ADD ||
        i === Constants.OPER_SUBS ||
        i === Constants.OPER_MULT ||
        i === Constants.OPER_DIV) {
        if(leftNumber.length === 0) {
          leftNumber = [Constants.NBR_ZERO];
        }
        operator = i;
      } else if(i === Constants.OPER_EQUAL) {
        if(leftNumber.length > 0 && operator && rightNumber.length > 0) {
          const left = this.getNumberFromArray(leftNumber);
          const right = this.getNumberFromArray(rightNumber);

          if(operator === Constants.OPER_ADD)
            result = (left + right).toString();
          else if(operator === Constants.OPER_SUBS)
            result = (left - right).toString();
          else if(operator === Constants.OPER_MULT)
            result = (left * right).toString();
          else if(operator === Constants.OPER_DIV)
            result = (left / right).toString();
        }
      } else {
        if(operator) {
          if(i !== Constants.PERIOD || (i === Constants.PERIOD && !rightNumber.find((value) => value === i))) {
            leftNumber = leftNumber.slice();
            if(i === Constants.PERIOD && rightNumber.length === 0) {
              rightNumber = [Constants.NBR_ZERO].concat([i]);
            } else {
              rightNumber = rightNumber.slice().concat([i]);
            }
          }
        } else {
          if(i !== Constants.PERIOD || (i === Constants.PERIOD && !leftNumber.find((value) => value === i))) {
            if(i === Constants.PERIOD && leftNumber.length === 0) {
              leftNumber = [Constants.NBR_ZERO].concat([i]);
            } else {
              leftNumber = leftNumber.slice().concat([i]);
            }
            rightNumber = rightNumber.slice();
          }
        }
      }
    } else { //Result is available... Start over
      if(i === Constants.KEY_DELETE) {
        //Delete when result available cleans everything
        leftNumber = [];
        rightNumber = [];
        operator = null;
        result = null;
      } else if(i === Constants.OPER_ADD ||
        i === Constants.OPER_SUBS ||
        i === Constants.OPER_MULT ||
        i === Constants.OPER_DIV) {
        //Left number is now result, right number is empty
        leftNumber = result.toString().split('');
        rightNumber = [];
        operator = i;
        result = null;
      } else if(i === Constants.OPER_EQUAL) {
        //Continue operating... Left side is result, right side the same number
        leftNumber = result.toString().split('');
        const left = this.getNumberFromArray(leftNumber);
        const right = this.getNumberFromArray(rightNumber);

        if(operator === Constants.OPER_ADD)
          result = (left + right).toString();
        else if(operator === Constants.OPER_SUBS)
          result = (left - right).toString();
        else if(operator === Constants.OPER_MULT)
          result = (left * right).toString();
        else if(operator === Constants.OPER_DIV)
          result = (left / right).toString();
      } else {
        //Reset and store the first number clicked on the left side
        leftNumber = [];
        rightNumber = [];
        operator = null;
        result = null;

        if(i === Constants.PERIOD) {
          leftNumber = [Constants.NBR_ZERO].concat([i]);
        } else {
          leftNumber = [i];
        }
      }
    }

    //If natural number is too big... reset!
    if(result && result.length > 15 && result.indexOf(Constants.PERIOD) < 0) {
      leftNumber = [];
      rightNumber = [];
      operator = null;
    }

    this.setState({
      leftNumber: leftNumber,
      rightNumber: rightNumber,
      operator: operator,
      result: result,
    });
  }

  showMessage() {
    let message;

    if(this.state.result) {
      message = this.state.result.toString();
    } else if(this.state.rightNumber.length > 0) {
      message = this.getNumberFromArray(this.state.rightNumber).toString();
    } else {
      message = this.getNumberFromArray(this.state.leftNumber).toString();
    }

    const MAX_SCREEN_LENGTH = 15;

    if(isNaN(message)) {
      message = "Not a number";
    } else if(message.length > MAX_SCREEN_LENGTH) {
      if(message.indexOf(Constants.PERIOD) >= 0) {
        const decimalCnt = message.substr(0, message.indexOf(Constants.PERIOD)).length;
        const tempFloatCnt = MAX_SCREEN_LENGTH - decimalCnt;
        const floatingCnt = message.substr(message.indexOf(Constants.PERIOD), message.length).length;

        if(floatingCnt > tempFloatCnt)
          message = parseFloat(message).toFixed(tempFloatCnt);
      } else {
        message = "Number too big";
      }
    }

    if(!message) {
      return Constants.NBR_ZERO;
    } else {
      return message;
    }
  }

  render() {
    const screenStyleProperties = {
      width: 320 * Constants.ASPECT_RATIO,
      height: 50 * Constants.ASPECT_RATIO,
      backgroundColor: 'lightgray',
      textAlign:'right',
      display:'block',
      paddingTop:`${25 * Constants.ASPECT_RATIO}px`,
      fontSize:`${40 * Constants.ASPECT_RATIO}px`,
    };

    return (
      <div>
        <h1 style={{marginLeft:`${90 * Constants.ASPECT_RATIO}px`}}>
          The Calculator App!
        </h1>
        <div>
          <Screen properties={screenStyleProperties} message={this.showMessage()}/>
        </div>
        <div>
          <Keypad
            onClick={(i) => this.handleClick(i)}
            onMouseUp={(event) => this.handleOnMouseUp(event)}
            onMouseDown={(event) => this.handleOnMouseDown(event)}
          />
        </div>
      </div>
    );
  }
}

export default Calculator;
