import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routerConfig } from "../../config/routerConfig";
import AuthService from "../../services/AuthService";

function UserActivePage() {
	const [errMessage, setErrMessage] = useState("");
	const [confirmMessage, setConfirmMessage] = useState("");

	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		if (localStorage.getItem("user")) {
			navigate(routerConfig.HOME.url);
		} else {
			completeRegistration();
		}
	});

	const completeRegistration = () => {
		AuthService.completeRegistration({ id: params.id })
			.then((res) => {
				setConfirmMessage("You have successfully activated your account, go to login");
				setTimeout(() => {
          localStorage.setItem("user", JSON.stringify(res.data));
					navigate(routerConfig.AUTH.url);
				}, 5000);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					setErrMessage(err.response.data);
				}
			});
	};

	return (
		<div className="container my-5">
			<div className="row">
				<div className="col-md-12">
					<h2>Activation page</h2>
					{errMessage && <p className="my-3">{errMessage}</p>}
					{confirmMessage &&
						<>
							<p className="my-3">{confirmMessage}</p>
							<p>
								After 5 seconds you will be redirected to the
								login
							</p>
						</>
					}
				</div>
			</div>
		</div>
	);
}

export default UserActivePage;
