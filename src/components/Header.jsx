import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleTheme } from "../utils/themeSlice";

const Header = () => {
	const theme = useSelector((store) => store.theme);

	const dispatch = useDispatch();

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<div className="navbar bg-base-200 shadow-sm fixed top-0 z-[9999]">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{" "}
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h7"
							/>{" "}
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<Link to="/needy">Home</Link>
						</li>
						<li>
							<Link to="/myRequests">View All Requests</Link>
						</li>
						<li>
							<a>About</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="navbar-center">
				<a className="btn btn-ghost text-xl">40 Ghar</a>
			</div>
			<div className="navbar-end">
				<button className="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						{" "}
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>{" "}
					</svg>
				</button>
				<button
					onClick={() => dispatch(toggleTheme())}
					className="text-2xl mb-1 hover:cursor-pointer"
				>
					{theme === "pastel" ? "🌙" : "☀️"}
				</button>
				<button className="btn btn-ghost btn-circle">
					<div className="indicator">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{" "}
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
							/>{" "}
						</svg>
						<span className="badge badge-xs badge-error indicator-item"></span>
					</div>
				</button>
			</div>
		</div>
	);
};

export default Header;
