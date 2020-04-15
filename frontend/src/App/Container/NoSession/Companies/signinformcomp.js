import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { StudentType, getMyJobs } from '../../../../actions';
import { companyProfileData } from '../../../../actions/companyprofile';
import * as jwt_decode from 'jwt-decode';

class signupform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      jwt_token: '',
      error: ''
    };
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    });
  };
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  submitLogin = e => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('loginComp', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            jwt_token: response.data
          });
        } else {
          this.setState({
            error:
              '<p style={{color: red}}>Please enter correct credentials</p>',
            authFlag: false
          });
        }
      })
      .catch(e => {
        this.setState({
          error: 'Please enter correct credentials' + e
        });
      });
  };
  render() {
    let redirectVar = null;
    if (this.state.jwt_token.length > 0) {
      var decoded = jwt_decode(this.state.jwt_token.split(' ')[1]);
      localStorage.setItem('token', this.state.jwt_token);
      localStorage.setItem('user_id', decoded._id);
      localStorage.setItem('username', decoded.username);
      localStorage.setItem('type', decoded.type);
      const data = {
        user_id: decoded._id
      };
      this.props.dispatch(companyProfileData(data));
      this.props.dispatch(getMyJobs());
      redirectVar = <Redirect to="/home" />;
    } else redirectVar = <Redirect to="/companylogin" />;
    return (
      <div>
        {redirectVar}
        <div className=" container signin-form-cont">
          <Form className="signup-form">
            <h2>Company Log In</h2>
            <p style={{ color: 'red' }}>{this.state.error}</p>
            <p>
              For Student please click the link{' '}
              <Link
                to="/login"
                onClick={() => this.props.dispatch(StudentType())}
              >
                here
              </Link>
            </p>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={this.usernameChangeHandler}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={this.passwordChangeHandler}
              />
            </Form.Group>

            <Button variant="primary" onClick={this.submitLogin}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    getType: state.getType
  };
};

export default connect(mapStateToProps)(signupform);
