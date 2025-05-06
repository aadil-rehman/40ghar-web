// NeedyHome.jsx
import React, { useState } from "react";

const NeedyDashboard = () => {
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState({ lat: "", lng: "" });

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Send POST request to backend
	};

	return (
		<div className="mt-16 px-8 max-w-xl mx-auto">
			<h2 className="text-3xl font-semibold mb-4 text-gray-800">
				Raise a Help Request
			</h2>
			<p className="text-gray-600 mb-6">
				Fill out the form so donors nearby can see and respond.
			</p>

			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-xl shadow-md space-y-4"
			>
				<textarea
					className="w-full border border-gray-300 rounded-md p-2"
					placeholder="Describe what you need..."
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<input
					type="text"
					className="w-full border border-gray-300 rounded-md p-2"
					placeholder="Latitude"
					value={location.lat}
					onChange={(e) => setLocation({ ...location, lat: e.target.value })}
				/>
				<input
					type="text"
					className="w-full border border-gray-300 rounded-md p-2"
					placeholder="Longitude"
					value={location.lng}
					onChange={(e) => setLocation({ ...location, lng: e.target.value })}
				/>
				<button
					type="submit"
					className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
				>
					Submit Request
				</button>
			</form>
		</div>
	);
};

export default NeedyDashboard;
