import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { routerConfig } from "../../config/routerConfig";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../../redux/userSlice";
import "./navigation.scss";
import ShopCart from "../ShopCart/ShopCart";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
	const user = useSelector((state) => state.userStore.user);

	const Logout = () => {
    localStorage.removeItem("user");
    dispatch(deleteUser());
    navigate(routerConfig.AUTH.url);
	};

	const userBtnLayout = () => {
		return user.hasOwnProperty("username") ? (
			<div className="dropdown">
				<button
					className="secondary-btn dropdown-toggle"
					data-bs-toggle="dropdown"
				>
					{user.username}
				</button>
				<ul className="dropdown-menu dropdown-menu-end">
					<li>
						<Link
							className="dropdown-item"
							to={routerConfig.USER_PROFILE.url}
						>
							{routerConfig.USER_PROFILE.name}
						</Link>
					</li>
					<li>
						<Link
							className="dropdown-item"
							to={routerConfig.MY_ADS.url}
						>
							{routerConfig.MY_ADS.name}
						</Link>
					</li>
					<li>
						<button className="dropdown-item" onClick={Logout}>
							Log out
						</button>
					</li>
				</ul>
			</div>
		) : (
			<NavLink className="link-nav" to={routerConfig.AUTH.url}>
				{routerConfig.AUTH.name}
			</NavLink>
		);
	};

	return (
		<nav className="navigation">
			<div className="container">
				<div className="row d-flex justify-content-end align-items-center">
					<div className="col-md-4">
						<Link to="/" className="logo">
							<img src={require("../../assets/images/logo.png")} className="logo-img" alt="logo" />
							<span>.Shop</span>
						</Link>
					</div>
					<div className="col-md-8">
						<ul className="links-group">
							<li>
								<NavLink
									className="link-nav"
									to={routerConfig.HOME.url}
								>
									{routerConfig.HOME.name}
								</NavLink>
							</li>
							<li>
								<NavLink
									className="link-nav"
									to={routerConfig.SHOP.url}
								>
									{routerConfig.SHOP.name}
								</NavLink>
							</li>
							<li className="ms-4">
								<ShopCart />
							</li>
							{userBtnLayout()}

						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
