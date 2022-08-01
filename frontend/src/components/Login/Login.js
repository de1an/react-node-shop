import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import PasswordField from "../PasswordField/PasswordField";
import { routerConfig } from "../../config/routerConfig";
import "./login.scss";

function Login({ showLoginForm }) {
	const navigate = useNavigate();
	const [isFormValid, setIsFormValid] = useState(true);
	const [isApiSuccess, setIsApiSuccess] = useState(true);
	const [isUserExists, setIsUserExists] = useState(true);

	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const onHandleInput = (e) => {
		setIsFormValid(true);
		setIsApiSuccess(true);
		setIsUserExists(true);
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
		AuthService.login(userData)
			.then((response) => {
				if (response && response.status === 200) {
					localStorage.setItem("user", JSON.stringify(response.data));
					navigate(routerConfig.SHOP.url);
				}
			})
			.catch((err) => {
				if(err.response.status === 400){
					setIsUserExists(false);
					return;
				}
				setIsApiSuccess(false);
			});
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
				<PasswordField onHandleInput={onHandleInput} />
				<button type="submit" className="primary-btn my-4">
					Login
				</button>
			</form>

			{!isFormValid ? (
				<p className="text-center">Email and password is required!</p>
			) : null}
			{!isApiSuccess && (
				<p>Something went wrong on server. Please try again later.</p>
			)}
			{!isUserExists && <p>Invalid password or email</p>}

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
