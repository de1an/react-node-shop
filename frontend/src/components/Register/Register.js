import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import PasswordField from "../PasswordField/PasswordField";
import AuthService from "../../services/AuthService";
import "./register.scss";

function Register({ showLoginForm }) {
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
		firstname: "",
		lastname: "",
		address: "",
		city: "",
		gender: "",
	});

	const onHandleInput = (e) => {
		let newUser = user;
		newUser[e.target.name] = e.target.value;
		setUser(newUser);
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		if (!user.username || !user.email || !user.password) {
			toast.error(
				"Please fill in the required fields: username, password and email.", {autoClose: 3000}
			);
			return;
		}
    
		AuthService.register(user)
			.then((res) => {
				if (res && res.status === 200) {
					toast.success(res.data, {autoClose: 3000});
					setTimeout(() => {
						showLoginForm(true);
					}, 4000);
				}
			})
			.catch((err) => {
				if (err.response.status === 402) {
          toast.error("User already exists with that email", {autoClose: 3000});
          return;
        }
        toast.error("Something went wron on server. Please, try again later", {autoClose: 3000});
			});
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6 title">
					<h2 className="mb-5">
						Register on <br />
						<span>our site</span>
					</h2>
					<p className="fw-bolder">
						If you already have an accaunt, go to{" "}
						<span
							onClick={() => {
								showLoginForm(true);
							}}
						>
							login page.
						</span>
					</p>
				</div>
				<div className="col-md-6">
					<form className="register-form" onSubmit={onFormSubmit}>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onInput={onHandleInput}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onInput={onHandleInput}
						/>
						<PasswordField onHandleInput={onHandleInput} />
						<input
							type="text"
							placeholder="First Name"
							name="firstname"
							onInput={onHandleInput}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastname"
							onInput={onHandleInput}
						/>
						<input
							type="text"
							placeholder="Address"
							name="address"
							onInput={onHandleInput}
						/>
						<input
							type="text"
							placeholder="City"
							name="city"
							onInput={onHandleInput}
						/>
						<select
							id="gender"
							name="gender"
							onInput={onHandleInput}
						>
							<option value="none">Select gender or skip</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
						<button type="submit" className="primary-btn mt-2">
							Register
						</button>
					</form>
				</div>
			</div>
      <ToastContainer />
		</div>
	);
}

export default Register;
