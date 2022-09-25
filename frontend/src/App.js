import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { routerConfig } from "./config/routerConfig";
import Navigation from "./components/Navigation/Navigation";
import EditProduct from "./components/EditProduct/EditProduct";
import Loader from "./components/Loader/Loader";
import { setUser } from "./redux/userSlice";
import { setCart } from "./redux/cartSlice";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import MyAdsPage from "./pages/MyAdsPage/MyAdsPage";
import UserActivePage from "./pages/UserActivePage/UserActivePage";
import SingleAdPage from "./pages/SingleAdPage/SingleAdPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import HomePage from "./pages/HomePage/HomePage";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		handleUserLogin();
		handleShopCart();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleShopCart = () => {
		if (localStorage.hasOwnProperty("Cart")) {
			dispatch(setCart(JSON.parse(localStorage.getItem("Cart"))));
		}
	};

	const handleUserLogin = async () => {
		if (!localStorage.getItem("user")) {
			// navigate(routerConfig.AUTH.url);
		} else {
			dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
		}
	};

	return (
		<>
			<Loader />
			<Navigation />
			<Routes>
				<Route path={routerConfig.HOME.url} element={<HomePage />} />
				<Route path={routerConfig.AUTH.url} element={<AuthPage />} />
				<Route path={routerConfig.SHOP.url} element={<ShopPage />} />
				<Route
					path={routerConfig.SHOP_AD.url}
					element={<SingleAdPage />}
				/>
				<Route
					path={routerConfig.USER_PROFILE.url}
					element={<UserProfilePage />}
				/>
				<Route path={routerConfig.MY_ADS.url} element={<MyAdsPage />} />
				<Route path={routerConfig.MY_ADS_EDIT.url} element={<EditProduct />} />
				<Route
					path={routerConfig.USER_ACTIVE.url}
					element={<UserActivePage />}
				/>
			</Routes>
		</>
	);
}

export default App;
