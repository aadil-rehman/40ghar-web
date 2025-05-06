import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const AppLayout = () => {
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
