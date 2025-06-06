import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import Loader from "./Loader";

const AppLayout = () => {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true); // loading while fetching user

	const fetchUser = async () => {
		if (user) {
			setLoading(false);
			return;
		}
		try {
			const res = await axios.get(BASE_URL + "/profile", {
				withCredentials: true,
			});
			dispatch(addUser(res?.data?.data));
		} catch (err) {
			if (
				err?.response?.status === 401 ||
				err?.response?.data?.error === "Please login"
			) {
				navigate("/"); // only redirect after checking
			} else {
				console.error("Fetch user error:", err);
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading)
		return (
			<div className="flex justify-center mt-10">
				<Loader />{" "}
			</div>
		);

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
