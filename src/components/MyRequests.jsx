import React, { useEffect, useState } from "react";
import StatusBadge from "./StatusBadge";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import NeedTypeHeading from "./NeedTypeHeading";

const MyRequests = () => {
	const [requests, setRequests] = useState([]);

	const fetchMyRequests = async () => {
		try {
			const res = await axios.get(BASE_URL + "/request/myRequests", {
				withCredentials: true,
			});

			setRequests(res?.data?.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchMyRequests();
	}, []);

	return (
		<div className="p-6 mt-16 max-w-6xl mx-auto">
			<h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
				My Submitted Requests
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{requests.map((request) => (
					<div
						key={request._id}
						className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-2xl transition duration-300"
					>
						<div className="flex items-center justify-between mb-2">
							<NeedTypeHeading needType={request.needType} size="lg" />
							<StatusBadge status={request.status} />
						</div>

						<p className="text-gray-800 font-semibold mb-2">
							Family Size: {request.familySize}
						</p>

						<p className="text-gray-600 text-sm mb-4">{request.description}</p>

						{request.address && (
							<p className="text-gray-500 text-xs">📍 {request.address}</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default MyRequests;
