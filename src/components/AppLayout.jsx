import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const AppLayout = () => {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();

	const fetchUser = async () => {
		if (user) return;
		try {
			const res = await axios.get(BASE_URL + "/profile", {
				withCredentials: true,
			});
			dispatch(addUser(res?.data?.data));
		} catch (err) {
			if (
				err?.status === 401 ||
				err?.response?.status === 401 ||
				err?.response?.data?.error === "Please login"
			) {
				navigate("/");
			}
			console.error(err);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1 mt-8">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default AppLayout;
