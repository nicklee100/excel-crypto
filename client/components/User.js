import React from 'react';
import axios from 'axios';
class User extends React.Component {
  constructor(props){
    super(props)
    this.returnCookie = this.returnCookie.bind(this);
  }

  componentDidMount(){
    console.log('props: ', this.props);
    fetch(`http://localhost:3000/authentication/${this.props.match.params.id}`,{
      credentials: 'include'
    })
    .then(function(data){
      console.log('data: ', data)
    })
    .catch(function(err){
      console.log("error: ", err);
    })
  }

  returnCookie(){
    console.log(this.props.cookies.get('crypto'));
  }

  render(){

    return (
      <div>
        <h1>User loaded</h1>
        <button onClick={this.returnCookie}>log cookie</button>
      </div>

    )
  }
}

export default User
