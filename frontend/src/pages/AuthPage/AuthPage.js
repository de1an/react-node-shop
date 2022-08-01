import React, { useState } from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import "./authPage.scss";

function AuthPage() {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className="auth-page-wrapper">
				{isLogin ? <Login showLoginForm={setIsLogin}/> : <Register showLoginForm={setIsLogin}/>}
		</div>
	);
}

export default AuthPage;
