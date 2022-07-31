import React from 'react';
import PasswordField from "../PasswordField/PasswordField";
import "./register.scss";

function Register({showLoginForm}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 title">
          <h2 className="mb-5">Register on <br /><span>our site</span></h2>
          <p className="fw-bolder">If you already have an accaunt, go to <span onClick={() => { showLoginForm(true) }}>login page.</span></p>
        </div>
        <div className="col-md-6">
        <form className="register-form">
          <input type="text" placeholder="Username" name="userName" />
          <input type="email" placeholder="Email" name="email" />
          <PasswordField />
          <input type="text" placeholder="First Name" name="firstName" />
          <input type="text" placeholder="Last Name" name="lastName" />
          <input type="text" placeholder="Address" name="address" />
          <input type="text" placeholder="City" name="city" />
          <select id="gender" name="gender">
            <option>Select gender or skip</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Register