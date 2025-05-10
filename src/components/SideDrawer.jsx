import { LocateFixedIcon } from "lucide-react";
import { useState } from "react";

const SideDrawer = ({ label, userRole, darkColor, lightColor }) => {
	const drawerId = `drawer-${userRole}`;
	const [formData, setFormData] = useState({
		name: "",
		emailId: "",
		password: "",
		phone: "",
		address: "",
		location: "", // for simplicity, let’s keep it as string
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Send data to backend
		console.log({ ...formData, role: userRole });
	};

	const getPosition = () => {
		return new Promise((resolve, reject) =>
			navigator.geolocation.getCurrentPosition(resolve, reject)
		);
	};

	const handleGetPositionClick = async () => {
		try {
			const positionObj = await getPosition();
			const position = {
				latitude: positionObj.coords.latitude,
				longitude: positionObj.coords.longitude,
			};
			console.log(position);
		} catch (err) {
			console.log(err);
		}
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
					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="text"
							name="name"
							placeholder="Full Name"
							value={formData.name}
							onChange={handleChange}
							required
							className="input w-full focus:outline-none rounded-lg"
						/>
						<input
							type="email"
							name="emailId"
							placeholder="Email Address"
							value={formData.emailId}
							onChange={handleChange}
							required
							className="input w-full focus:outline-none rounded-lg"
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							required
							className="input input-bordered w-full focus:outline-none rounded-lg"
						/>
						<input
							type="text"
							name="phone"
							placeholder="Phone Number"
							value={formData.phone}
							onChange={handleChange}
							required
							className="input input-bordered w-full focus:outline-none rounded-lg"
						/>
						<div className="flex gap-1">
							<span
								style={{ backgroundColor: darkColor }}
								className={`flex gap-1 items-center text-white w-fit px-2 py-1.5 rounded-lg hover:cursor-pointer`}
								onClick={handleGetPositionClick}
							>
								<span className="mb-0.5">Get </span>
								<span>
									<LocateFixedIcon className="h-4 w-4" />
								</span>
							</span>
							<input
								type="text"
								name="location"
								placeholder="Location"
								value={formData.location}
								onChange={handleChange}
								required
								className="input input-bordered w-full focus:outline-none rounded-lg pl-16"
							/>
						</div>

						<button
							type="submit"
							style={{ backgroundColor: lightColor, color: darkColor }}
							className={`btn w-full rounded-lg`}
						>
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SideDrawer;
