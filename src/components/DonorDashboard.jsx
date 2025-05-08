import React, { useEffect, useState } from "react";
import Map from "./Map";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useLocation } from "react-router-dom";
import { calculateDistance, getTime } from "../utils/commonFunctions";

const DonorDashboard = () => {
	const [requests, setRequests] = useState([]);

	// Get the current location object
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	const lat = queryParams.get("lat");
	const lng = queryParams.get("lng");

	const latitude = parseFloat(lat);
	const longitude = parseFloat(lng);

	if (isNaN(latitude) || isNaN(longitude)) {
		throw new Error("Invalid latitude or longitude values");
	}

	const fetchRequests = async () => {
		try {
			const res = await axios.get(
				BASE_URL + `/request/all?lat=${lat}&lng=${lng}`,
				{
					withCredentials: true,
				}
			);
			console.log(res);
			setRequests(res?.data?.data);
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		fetchRequests();
	}, []);
	return (
		<div className="p-6 mt-16 w-full max-w-screen-xl mx-auto">
			<div className="flex gap-52">
				<span>
					<h1 className="text-3xl font-bold mb-6">Welcome, Donor 👋</h1>
				</span>
				<span>
					<h2 className="text-center text-2xl font-bold">
						People Around You Need Support — Step In
					</h2>
				</span>
			</div>

			<div className="grid grid-cols-3 gap-6">
				<div className="bg-white rounded-xl shadow-lg p-4 col-span-1 overflow-y-auto max-h-[70vh]">
					<h2 className="text-xl font-bold mb-4">Nearby Ration Requests</h2>

					<div className="space-y-4">
						{requests.map((request) => (
							<RequestCard
								request={request}
								key={request._id}
								donorLocation={[longitude, latitude]}
							/>
						))}
					</div>
				</div>
				{/* Map */}
				<div className="col-span-2 rounded-xl overflow-hidden shadow-lg max-h-[70vh]">
					<Map requests={requests} />
				</div>
			</div>
		</div>
	);
};

const RequestCard = ({ request, donorLocation }) => {
	console.log(request?.address);

	const getBadgeColor = (type) => {
		switch (type?.toLowerCase()) {
			case "ration":
				return "bg-green-200 text-green-800";
			case "clothes":
				return "bg-blue-200 text-blue-800";
			case "medicine":
				return "bg-red-200 text-red-800";
			default:
				return "bg-gray-200 text-gray-800";
		}
	};

	return (
		<div className="bg-base-200 p-4 rounded-lg shadow-sm">
			<div className="flex justify-between items-center">
				<h3 className="font-bold text-lg">
					Family in{" "}
					{request?.address?.split(",")[0] || request?.address?.split(",")[1]}
				</h3>
				{/* Badge */}
				<span
					className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeColor(
						request?.needType
					)}`}
				>
					{request?.needType || "Other"}
				</span>
			</div>
			<p className="text-sm text-gray-600 dark:text-gray-300">
				{request?.description}
			</p>
			<p className="text-sm text-gray-500 mt-1">
				Distance: ~
				{calculateDistance(donorLocation, request?.location?.coordinates)}{" "}
				meters
			</p>

			<div className="mt-3 flex justify-between items-center">
				<span className="text-xs text-gray-400">
					Requested {getTime(request?.createdAt)} ago
				</span>
				<button className="btn btn-sm btn-primary">View Details</button>
			</div>
		</div>
	);
};

export default DonorDashboard;
