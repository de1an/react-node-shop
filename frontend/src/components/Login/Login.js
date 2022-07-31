import React, { useState, useRef } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import PasswordField from "../PasswordField/PasswordField";
import "./login.scss";

function Login({ showLoginForm }) {
	const [isFormValid, setIsFormValid] = useState(true);

	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const onHandleInput = (e) => {
		setIsFormValid(true);
		let newInput = userData;
		newInput[e.target.name] = e.target.value;
		setUserData(newInput);
	};

	const onSubmitForm = (e) => {
		e.preventDefault();
		if (!userData.email || !userData.password) {
			setIsFormValid(false);
			return;
		}
		setIsFormValid(true);
	};

	const showRegister = (e) => {
		e.preventDefault();
		showLoginForm(false);
	};

	return (
		<div className="login-form row">
			<h2 className="text-center">Login</h2>
			<p className="text-center fw-bolder my-4">
				Please enter your login and password!
			</p>
			<form
				className="form-group"
				onSubmit={(e) => {
					onSubmitForm(e);
				}}
			>
				<input
					className="mb-4"
					type="email"
					name="email"
					placeholder="Email"
					onInput={(e) => {
						onHandleInput(e);
					}}
				/>
				<PasswordField />
				<button type="submit" className="primary-btn my-4">
					Login
				</button>
			</form>

			{!isFormValid ? (
				<p className="text-center">Email and password is required!</p>
			) : null}

			<p className="text-center fw-bolder">
				Don't have an account?{" "}
				<a
				className="text-decoration-underline"
					href="/"
					onClick={(e) => {
						showRegister(e);
					}}
				>
					Sign up
				</a>
			</p>
		</div>
	);
}

export default Login;
