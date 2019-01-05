import React from 'react';
import ReactDOM from 'react-dom';
import { map } from 'lodash'

export default class CurrencyChooser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currency: ['xrp', 'btc'],
    }
  }

  render() {

    return (
      <div className="currency-chooser">
        <h1>Currency</h1>
        {
          map(this.state.currency, item => <p key={item}>{item}</p> )
        }
      </div>
    )
  }
}
