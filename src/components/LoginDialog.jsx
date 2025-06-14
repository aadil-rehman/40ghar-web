import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const LoginDialog = ({ label, darkColor, lightColor, userRole }) => {
	const my_model_id = `model-${userRole}`;

	const [emailId, setEmailId] = useState("uzair@gmail.com");
	const [password, setPassword] = useState("Uzair@123");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	// const { user } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const handleLogin = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/donor-login",
				{
					emailId,
					password,
					role: "donor",
				},
				{ withCredentials: true }
			);
			if (res?.data?.status === 1) {
				dispatch(addUser(res?.data?.data));
				navigate("/donor/requests");
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
							type="password"
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
