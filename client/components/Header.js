import React from 'react';

class Header extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
          <a href="http://localhost:3000/oauth/google/getToken/"><button>Google Login</button></a>

          <a href="http://localhost:3000/authentication/google/getToken/"><button>new Google Login</button></a>
      </div>

    )
  }
}

export default Header
