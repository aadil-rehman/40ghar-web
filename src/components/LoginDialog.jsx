import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const LoginDialog = ({ label, darkColor, lightColor, userRole }) => {
	const my_model_id = `model-${userRole}`;

	const [emailId, setEmailId] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	// const { user } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const handleLogin = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/login",
				{
					emailId,
					password,
				},
				{ withCredentials: true }
			);
			if (res?.data?.status === 1) {
				dispatch(addUser(res?.data?.data));
				navigate("/request/all?lat=28.750689&lng=77.283913");
				window.location.reload();
			}
			setError("");
		} catch (err) {
			console.error("ERROR: " + err);
			setError(err?.response?.data?.error);
		}
	};
	return (
		<div>
			<button
				style={{ color: darkColor, backgroundColor: lightColor }}
				className="btn"
				onClick={() => document.getElementById(my_model_id).showModal()}
			>
				{label}
			</button>
			<dialog id={my_model_id} className="modal">
				<div className="modal-box w-5/6 md:w-2/6">
					<div className="card-body">
						<h2
							style={{ color: darkColor }}
							className="card-title flex justify-center"
						>
							{label}
						</h2>
						<input
							type="text"
							value={emailId}
							onChange={(e) => setEmailId(e.target.value)}
							placeholder="Email"
							className="input w-full focus:outline-none rounded-lg"
						/>
						<input
							type="text"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							className="input w-full focus:outline-none rounded-lg"
						/>
						<div className="card-actions justify-center">
							<button
								style={{ color: darkColor, backgroundColor: lightColor }}
								className="btn mt-2"
								onClick={handleLogin}
							>
								Login
							</button>
						</div>
					</div>
					{error && <p className="text-red-600">{error}</p>}
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
};

export default LoginDialog;
