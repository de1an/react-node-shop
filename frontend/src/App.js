import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import { routerConfig } from "./config/routerConfig";
import AuthPage from "./pages/AuthPage/AuthPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import HomePage from "./pages/HomePage/HomePage";
import 'react-toastify/dist/ReactToastify.css';

import "./App.scss";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
	const navigate = useNavigate();
	useEffect(() => {
    handleUserLogin();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleUserLogin = () => {
		if (!localStorage.getItem("user")) {
			navigate(routerConfig.AUTH.url);
		}
	};

	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/auth" element={<AuthPage />} />
			<Route path="/shop" element={<ShopPage />} />
		</Routes>
	);
}

export default App;
