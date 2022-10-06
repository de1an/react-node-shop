import React, { useState } from "react";
import PasswordField from "../PasswordField/PasswordField";
import UserService from "../../services/UserService";
import {useDispatch} from "react-redux";
import {showLoader} from "../../redux/loaderSlice";

function Accordion() {
	const userId = JSON.parse(localStorage.getItem("user"))._id;
	const [password, setPassword] = useState({
		id: userId,
		oldPassword: "",
		newPassword: "",
	});
	const [errMsg, setErrMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	const dispatch = useDispatch();

	const passwordHandler = (e) => {
		setErrMsg("");
		setSuccessMsg("");
		let copyPassword = { ...password };
		copyPassword[e.target.name] = e.target.value;
		setPassword(copyPassword);
	};

	const onHandleSave = () => {
		if (!password.oldPassword || !password.newPassword) {
			setErrMsg("An old password or new password can't be empty.");
			return;
		}
		dispatch(showLoader(true))
		UserService.changePassword(password)
			.then((res) => {
				if (res.status === 200) {
					setSuccessMsg(res.data);
				}
			})
			.catch((err) => {
				setErrMsg(err.response.data);
			})
			.finally(() => {
				dispatch(showLoader(false))
			})
	};

	return (
		<div className="accordion mt-3" id="accordionExample">
			<div className="accordion-item">
				<h2 className="accordion-header" id="headingOne">
					<button
						className="accordion-button"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseOne"
						aria-expanded="true"
						aria-controls="collapseOne"
					>
						You want to change your password ?
					</button>
				</h2>
				<div
					id="collapseOne"
					className="accordion-collapse collapse"
					aria-labelledby="headingOne"
					data-bs-parent="#accordionExample"
				>
					<div className="accordion-body">
						<label>Old password</label>
						<PasswordField
							onHandleInput={passwordHandler}
							placeholder=""
							name="oldPassword"
						/>
						<label>New password</label>
						<PasswordField
							onHandleInput={passwordHandler}
							placeholder=""
							name="newPassword"
						/>
						<button
							className="btn btn-primary w-100 mt-3"
							onClick={onHandleSave}
						>
							Save
						</button>
						{errMsg ? (
							<p className="text-danger mt-1">
								You must fill both fields
							</p>
						) : null}
						{successMsg ? <p className="text-success">{successMsg}</p> : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Accordion;
