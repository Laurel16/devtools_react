import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import { config } from "./config";

class Login extends React.Component {
  handleLogin = (e) => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: `${config.baseUrl}/auth/sign_in`,
      data: {
        email: this.email.value,
        password: this.password.value
      }
    })
    .then(response => {
      console.log(response)
      localStorage.setItem('user',
        JSON.stringify({
          'access-token': response.headers['access-token'],
          'client': response.headers['client'],
          'uid': response.data.data.uid
  }))
   window.location = '/'
})
}

  render () {
    return (
       <Container className="container-max-width pt-5 my-5">
        <h2>Log in</h2>
        <form onSubmit={this.handleLogin} >
          <input name="email" ref={(input) => this.email = input } />
          <input name="password" type="password" ref={(input) => this.password = input } />
          <input type="submit" value="Log in" />
        </form>
      </Container>
    )
  }
}

export default Login

