import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import { routerConfig } from "./config/routerConfig";
import AuthPage from "./pages/AuthPage/AuthPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import HomePage from "./pages/HomePage/HomePage";
import Navigation from "./components/Navigation/Navigation";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import MyAdsPage from "./pages/MyAdsPage/MyAdsPage";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		handleUserLogin();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleUserLogin = () => {
		if (!localStorage.getItem("user")) {
			navigate(routerConfig.AUTH.url);
		} else {
			dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
		}
	};

	return (
		<div>
			<Navigation />
			<Routes>
				<Route path={routerConfig.HOME.url} element={<HomePage />} />
				<Route path={routerConfig.AUTH.url} element={<AuthPage />} />
				<Route path={routerConfig.SHOP.url} element={<ShopPage />} />
				<Route path={routerConfig.USER_PROFILE.url} element={<UserProfilePage />} />
				<Route path={routerConfig.MY_ADS.url} element={<MyAdsPage />} />
			</Routes>
		</div>
	);
}

export default App;
