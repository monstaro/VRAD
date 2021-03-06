import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import PropTypes from 'prop-types';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      email: null,
      tripType: null,
      isButtonDisabled: true
    }
  }
  updateState = (e) => {
      this.setState({[e.target.id]: e.target.value}, () => this.errorHandling())
  }
  errorHandling = () => {
    (this.state.username && this.state.email && this.state.tripType) && this.setState({isButtonDisabled: false}) 
   
  }
  preventReload = (event) => {
    event.preventDefault();
    const loginInfo = {
      username: this.state.username,
      email: this.state.email,
      tripType: this.state.tripType
    }
    const { loginUser } = this.props;
    loginUser(loginInfo);
  }
  render() {
    if (!this.props.isUserLoggedIn) {
    return (
      <section className="login-area">
        <form className="login-form">
          <h2>Log In</h2>
          <label for="username">
            <p className="required">{this.state.username ? ' . ' : '*Required*'}</p>
            <input type="text"
                   id="username"
                   placeholder="username"
                   className="user-input"
                   onChange={this.updateState}>
            </input>
          </label>
          <label for="email address">
          <p className="required">{this.state.email ? ' . ' : '*Required*'}</p>
            <input type="text"
                   id="email"
                   placeholder="email address"
                   className="user-input"
                   onChange={this.updateState}>
            </input>
          </label>
          <label for="listing type">Listing Type</label>
          <p className="required">{this.state.tripType ? ' . ' : '*Required*'}</p>
            <select
              id="tripType"
              name="tripType"
              className="user-input"
              placeholder="listing type"
              onChange={this.updateState}>
              <option value="select">Select Type</option>
              <option data-testid="Vacation" value="vacation">Vacation</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
          <button onClick={this.preventReload} disabled={this.state.isButtonDisabled}>
          <Link to="/neighborhoods" className="noStyle" disabled={this.state.isButtonDisabled}>
            <span className='submit'>Submit</span>
          </Link>
          </button>
        </form>
      </section>
    )
    } else {
    return '';
    }
  }
}

export default Login

Login.propTypes = {
  username: PropTypes.any,
  tripType: PropTypes.any,
  email: PropTypes.any,
  isButtonDisabled: PropTypes.bool
}

