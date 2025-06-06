import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles, children }) => {
	const user = useSelector((store) => store.user);

	if (!user) {
		<Navigate to="/" replace />;
	}

	if (!allowedRoles.includes(user?.role)) {
		return <Navigate to="/" replace />;
	}
	return children;
};

export default ProtectedRoutes;
