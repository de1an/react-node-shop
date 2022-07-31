import React, { useState, useRef } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import "./passwordField.scss";

function PasswordField() {
	const [isShowPassword, setIsShowPassword] = useState(false);
	const passwordFieldRef = useRef();

  const showPassword = () => {
		setIsShowPassword((prevState) => !prevState);
		let type = !isShowPassword ? "text" : "password";
		passwordFieldRef.current.setAttribute("type", type);
	};

	return (
		<div className="password-field-icon">
			<input type="password" name="password" placeholder="Password" ref={passwordFieldRef} />
			<span className="icon" onClick={() => showPassword()}>{!isShowPassword ? <FaEyeSlash /> : <FaEye />}</span>
		</div>
	);
}

export default PasswordField;
