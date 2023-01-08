import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Layout from "./Components/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import RequireUnAuth from "./features/auth/RequireUnAuth";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Public from "./pages/Public";
import Register from "./pages/Register";

function App() {
	return (

		<Routes>

			<Route path="/" element={<Layout />}>
				{/* public routes */}
				<Route element={<RequireUnAuth />}>
					<Route index element={<Public />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>


				{/* protected routes */}
				<Route element={<RequireAuth />}>
					<Route path="/main" element={<Main />} />
				</Route>

			</Route>

		</Routes>

	)
}

export default App;


