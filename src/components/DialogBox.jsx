import React, { useState } from "react";
import { getAddress } from "../utils/commonFunctions";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { LocateFixedIcon } from "lucide-react";

const DialogBox = () => {
	const [formData, setFormData] = useState({
		needType: "ration",
		familySize: "",
		description: "",
		widow: false,
		address: "",
	});
	const [addressLoading, setAddressLoading] = useState(false);
	const [position, setPosition] = useState({});
	const [error, setError] = useState("");

	const getPosition = () => {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
	};

	const fetchAddress = async () => {
		setAddressLoading(true);
		try {
			// We get the user's geolocation position
			const positionObj = await getPosition();
			const position = {
				latitude: positionObj.coords.latitude,
				longitude: positionObj.coords.longitude,
			};
			console.log(position);
			setPosition(position);

			// we use a reverse geocoding API to get a description of the user's address, so we can display it
			const addressObj = await getAddress(position);
			const address = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.countryName}`;
			setFormData({ ...formData, address: address });

			console.log(address);
			// 3) Then we return an object with the data that we are interested in
			setAddressLoading(false);
			return { position, address };
		} catch (err) {
			console.error("Geolocation failed:", err);
			setAddressLoading(false);
			alert(err.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const payload = {
				...formData,
				urgencyScore: 7,
				location: {
					type: "Point",
					coordinates: [position.longitude, position.latitude], // [longitude, latitude]
				},
			};
			console.log(payload);
			const res = await axios.post(BASE_URL + "/request/new", payload, {
				withCredentials: true,
			});

			if (res?.data?.status === 1) {
				setFormData({
					needType: "",
					familySize: "",
					description: "",
					widow: false,
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

	return (
		<div>
			<button
				className="btn btn-primary w-full md:w-48"
				onClick={() => document.getElementById("my_modal_3").showModal()}
			>
				Raise Request
			</button>
			<dialog id="my_modal_3" className="modal">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							onClick={() => setError("")}
						>
							✕
						</button>
					</form>
					<form
						onSubmit={handleSubmit}
						className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mx-auto"
					>
						<h2 className="text-2xl font-bold mb-6 text-center">
							Raise a Request
						</h2>

						<label className="block mb-4">
							<span className="block mb-1 font-medium">Need Type</span>
							<select
								name="needType"
								value={formData.needType}
								onChange={(e) =>
									setFormData({ ...formData, needType: e.target.value })
								}
								className="select select-bordered w-full rounded-md focus:outline-none"
								required
							>
								<option value="ration">Ration</option>
								<option value="medicine">Medicine</option>
								<option value="cloths">Clothes</option>
								<option value="others">Others</option>
							</select>
						</label>

						<label className="block mb-4">
							<span className="block mb-1 font-medium ">Family Size</span>
							<input
								type="number"
								name="familySize"
								value={formData.familySize}
								onChange={(e) =>
									setFormData({
										...formData,
										familySize: e.target.value,
									})
								}
								className="input input-bordered w-full rounded-md focus:outline-none"
								required
							/>
						</label>

						<label className="block mb-4">
							<span className="block mb-1 font-medium">Description</span>
							<textarea
								name="description"
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
								className="textarea textarea-bordered w-full rounded-md focus:outline-none"
								required
							/>
						</label>

						<label className="block mb-4">
							<input
								type="checkbox"
								name="widow"
								checked={formData.widow}
								onChange={(e) =>
									setFormData({ ...formData, widow: e.target.checked })
								}
								className="mr-2 rounded-md"
							/>
							<span className="font-medium">
								Is the request for a widow or a widow-led family?
							</span>
						</label>

						<div className="flex gap-2">
							<span
								className="flex gap-1 items-center bg-blue-500 text-white w-fit px-2 py-1.5 rounded-lg hover:bg-blue-400 hover:cursor-pointer"
								onClick={fetchAddress}
							>
								<span className="mb-0.5">Get </span>
								<span>
									<LocateFixedIcon className="h-5 w-5" />
								</span>
							</span>
							<input
								type="text"
								name="address"
								value={formData.address}
								readOnly
								required
								className="input flex-1 rounded-md hover:cursor-not-allowed focus:ring-0 focus:outline-none focus:shadow-none"
							/>
						</div>

						<button
							type="submit"
							className="btn btn-primary w-full mt-4 rounded-md"
						>
							Submit Request
						</button>
						{error && <p className="text-red-600 text-xs p-1">{error}</p>}
					</form>
				</div>
			</dialog>
		</div>
	);
};

export default DialogBox;
