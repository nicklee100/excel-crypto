import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { map } from 'lodash'
import { connect } from 'react-redux'

import Header from "./Header.js";
import User from "./User.js";
import { initiateGoogleLogin } from "../redux/actions";

class CurrencyChooser extends React.Component {
  constructor(props){
    super(props);

  }


  render() {
    return (
      <Router>

        <div>
        <Link to="/user">Topics</Link>

          <Route component={Header}/>
          <Route path="/user/:id" component={User}/>

        </div>
      </Router>

    )
  }
}


const mapStateToProps = function(){
  return {}
}

const mapDispatchToProps = function(dispatch) {
  return {
    initiateGoogleLogin: () => dispatch(initiateGoogleLogin()),

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CurrencyChooser)
