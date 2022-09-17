import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import PasswordField from "../PasswordField/PasswordField";
import { routerConfig } from "../../config/routerConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import "./login.scss";

function Login({ showLoginForm }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isFormValid, setIsFormValid] = useState(true);
	const [isApiSuccess, setIsApiSuccess] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const onHandleInput = (e) => {
		setErrorMessage("");
		setIsFormValid(true);
		setIsApiSuccess(true);
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
					dispatch(setUser(response.data));
					navigate(routerConfig.SHOP.url);
				}
			})
			.catch((err) => {
				setErrorMessage(err.response.data);
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
			<p>{errorMessage && errorMessage}</p>

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
