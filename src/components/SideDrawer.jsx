import { LocateFixedIcon } from "lucide-react";
import { useState } from "react";
import { getAddress } from "../utils/commonFunctions";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import MiniLoader from "./MiniLoader";
import OTPInput from "./OTPInput";
import { useNavigate } from "react-router-dom";

const SideDrawer = ({ label, userRole, darkColor, lightColor }) => {
	const drawerId = `drawer-${userRole}`;
	const [formData, setFormData] = useState({
		name: "",
		emailId: "",
		password: "",
		phone: "+91 7065830366",
		address: "",
	});

	const [position, setPosition] = useState({});
	const [addressLoading, setAddressLoading] = useState(false);
	const [error, setError] = useState("");
	const [isRegistered, setIsRegistered] = useState(false);
	const [inputOtp, setInputOtp] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleRegisterDonor = async () => {
		try {
			const payload = {
				...formData,
				role: userRole,
				location: {
					type: "Point",
					coordinates: [position.longitude, position.latitude], // [longitude, latitude]
				},
			};
			console.log(payload);
			const res = await axios.post(BASE_URL + "/donor-signup", payload, {
				withCredentials: true,
			});

			if (res?.data?.status === 1) {
				setFormData({
					name: "",
					emailId: "",
					password: "",
					phone: "",
					address: "",
				});
				setPosition({});
				document.getElementById("my_modal_3").close();
			}
			setError("");
		} catch (err) {
			console.error("error", err);
			setError(err?.response?.data?.error);
		}
	};

	const getPosition = () => {
		return new Promise((resolve, reject) =>
			navigator.geolocation.getCurrentPosition(resolve, reject)
		);
	};

	const handleGetPositionClick = async () => {
		setAddressLoading(true);
		try {
			const positionObj = await getPosition();
			const position = {
				latitude: positionObj.coords.latitude,
				longitude: positionObj.coords.longitude,
			};
			setPosition(position);
			const addressObj = await getAddress(position);
			const address = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.countryName}`;
			setFormData({ ...formData, address: address });
			console.log(address);
			setAddressLoading(false);
		} catch (err) {
			console.error("Geolocation failed:", err);
			setAddressLoading(false);
			alert(err.message);
		}
	};

	const handleRegisterNeedy = async () => {
		try {
			const res = await axios.post(BASE_URL + "/otp/send-otp", {
				phone: formData.phone,
				role: userRole,
			});
		} catch (err) {
			console.log(err);
		}
		setIsRegistered(true);
	};

	const handleOTPInput = (inputValue) => {
		setInputOtp(inputValue);
	};

	const handleSignupClick = async () => {
		try {
			const payload = {
				name: formData.name,
				phone: formData.phone,
				address: formData.address,
				location: {
					type: "Point",
					coordinates: [position.longitude, position.latitude], // [longitude, latitude]
				},
				role: userRole,
				otp: inputOtp,
			};

			const res = await axios.post(
				BASE_URL + "/otp/verify-otp-signup",
				payload,
				{ withCredentials: true }
			);

			if (res?.data?.status === 1) {
				setFormData({
					name: "",
					emailId: "",
					password: "",
					phone: "+91 7065830366",
					address: "",
				});
				setPosition({});
				navigate("/needy");
			}
		} catch (err) {
			console.log(err);
		}
		setIsRegistered(false);
	};

	return (
		<div className="drawer drawer-end inline-block">
			<input id={drawerId} type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				<label
					htmlFor={drawerId}
					className="text-blue-500 hover:cursor-pointer hover:text-blue-600"
				>
					{label}
				</label>
			</div>
			<div className="drawer-side">
				<label
					htmlFor={drawerId}
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<div className="bg-base-100 min-h-full mt-16 w-80 p-4 space-y-4">
					<h2
						style={{ color: darkColor }}
						className={`text-xl font-semibold mb-2 text-center my-5`}
					>
						Sign Up as {userRole === "donor" ? "Donor" : "Needy"}
					</h2>
					<div
						// onSubmit={handleSubmit}
						className="transition-opacity duration-500 space-y-4 
						"
					>
						<input
							type="text"
							name="name"
							placeholder="Full Name"
							value={formData.name}
							onChange={handleChange}
							required
							className={`input w-full focus:outline-none rounded-lg ${
								!isRegistered
									? "opacity-100"
									: "opacity-40 hover:cursor-not-allowed"
							}`}
						/>
						{userRole === "donor" && (
							<>
								<input
									type="email"
									name="emailId"
									placeholder="Email Address"
									value={formData.emailId}
									onChange={handleChange}
									required
									className={`input w-full focus:outline-none rounded-lg ${
										!isRegistered
											? "opacity-100"
											: "opacity-40 hover:cursor-not-allowed"
									}`}
								/>
								<input
									type="password"
									name="password"
									placeholder="Password"
									value={formData.password}
									onChange={handleChange}
									required
									className={`input input-bordered w-full focus:outline-none rounded-lg ${
										!isRegistered
											? "opacity-100"
											: "opacity-40 hover:cursor-not-allowed"
									}`}
								/>
							</>
						)}

						<input
							type="text"
							name="phone"
							placeholder="Phone Number"
							value={formData.phone}
							onChange={handleChange}
							required
							className={`input input-bordered w-full focus:outline-none rounded-lg ${
								!isRegistered
									? "opacity-100"
									: "opacity-40 hover:cursor-not-allowed"
							}`}
						/>
						<div className="flex gap-1">
							<span
								style={{ backgroundColor: darkColor }}
								className={`flex gap-1 items-center text-white w-fit px-2 py-1.5 rounded-lg  ${
									!isRegistered
										? "opacity-100 hover:cursor-pointer"
										: "opacity-40 hover:cursor-not-allowed"
								}`}
								onClick={handleGetPositionClick}
							>
								{addressLoading ? (
									<MiniLoader />
								) : (
									<>
										<span className="mb-0.5">Get </span>
										<span>
											<LocateFixedIcon className="h-4 w-4" />
										</span>
									</>
								)}
							</span>
							<input
								type="text"
								name="address"
								placeholder="Address"
								value={formData.address}
								onChange={handleChange}
								required
								readOnly
								className={`input input-bordered w-full hover:cursor-not-allowed focus:outline-none rounded-lg ${
									!isRegistered ? "opacity-100" : "opacity-40"
								}`}
							/>
						</div>

						<button
							type="submit"
							style={{ backgroundColor: lightColor, color: darkColor }}
							className={`btn w-full rounded-lg ${
								isRegistered ? "opacity-80" : ""
							}`}
							onClick={
								userRole === "donor" ? handleRegisterDonor : handleRegisterNeedy
							}
							disabled={isRegistered}
						>
							Register
						</button>
					</div>
					{error && <p className="text-red-600 text-sm">{error}</p>}
					{isRegistered && (
						<OTPInput
							length={6}
							phone={formData.phone}
							lightColor={lightColor}
							darkColor={darkColor}
							onChange={handleOTPInput}
							handleSubmit={handleSignupClick}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default SideDrawer;
