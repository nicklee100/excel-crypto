import React from 'react';
import axios from 'axios';

class User extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    axios.get(`http://localhost:3000/authenticated/${this.props.match.params.id}`)
    .then(console.log)
  }

  render(){

    return (
      <div>
        <h1>User loaded</h1>
      </div>

    )
  }
}

export default User
