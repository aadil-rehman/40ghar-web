import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import OTPInput from "./OTPInput";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const NeedyLoginDialog = ({ label, darkColor, lightColor, userRole }) => {
	const my_model_id = `model-${userRole}`;

	const [phone, setPhone] = useState("");
	const [error, setError] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const navigate = useNavigate();
	const [inputOtp, setInputOtp] = useState(null);

	// const { user } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const handleSendOTP = async () => {
		if (!phone) {
			setError("Please enter the phone number");
			return;
		}
		try {
			const res = await axios.post(
				BASE_URL + "/otp/send-otp",
				{
					phone: "+91" + phone,
					role: "needy",
					loginSendOtp: true,
				},
				{ withCredentials: true }
			);

			if (res?.data?.status === 1) {
				setOtpSent(true);
				setError("");
			}
		} catch (err) {
			console.error("ERROR: " + err);
			setError(err?.response?.data?.message);
		}
	};

	const handleLogin = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/otp/verify-otp-login",
				{
					phone: "+91" + phone,
					otp: inputOtp,
				},
				{ withCredentials: true }
			);
			if (res?.data?.status === 1) {
				dispatch(addUser(res?.data?.data));
				navigate("/needy");
				window.location.reload();
			}
			setOtpSent(true);
			setError("");
		} catch (err) {
			console.error("ERROR: " + err);
			setError(err?.response?.data?.message);
		}
	};

	const handleOTPInput = (inputValue) => {
		setInputOtp(inputValue);
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
				<div className="modal-box w-5/6 md:w-2/6 overflow-hidden relative h-[260px]">
					<div
						className="flex w-[200%] transition-all duration-500"
						style={{ transform: `translateX(${otpSent ? "-50%" : "0%"})` }}
					>
						<div className="w-1/2">
							<div className="card-body">
								<h2
									style={{ color: darkColor }}
									className="card-title flex justify-center"
								>
									{label}
								</h2>
								<div className="relative">
									<p className="absolute left-0 flex items-center pl-1 pr-1.5 inset-y-0 z-10 border-r-2 border-r-gray-300 text-gray-500">
										+91
									</p>
									<input
										type="text"
										value={phone}
										onChange={(e) => {
											const cleaned = e.target.value.replace(/\D/g, "");
											setPhone(cleaned);
											setError("");
										}}
										placeholder="Enter 10-digit number"
										className="input w-full focus:outline-none pl-10 rounded-lg"
									/>
								</div>
								<div className="card-actions justify-center">
									<button
										style={{ color: darkColor, backgroundColor: lightColor }}
										className="btn mt-2"
										onClick={handleSendOTP}
									>
										Send OTP
									</button>
								</div>
								{error && <p className="text-red-600">{error}</p>}
							</div>
						</div>
						<div className="w-1/2">
							<div className="card-body">
								<OTPInput
									length={6}
									phone={phone}
									lightColor={lightColor}
									darkColor={darkColor}
									onChange={handleOTPInput}
									handleSubmit={handleLogin}
									isLogin={true}
								/>
							</div>
							{error && <p className="text-red-600">{error}</p>}
						</div>
					</div>
				</div>

				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
};

export default NeedyLoginDialog;
