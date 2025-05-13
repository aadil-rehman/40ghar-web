import React, { useEffect, useState } from "react";
import Map from "./Map";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useLocation } from "react-router-dom";
import { calculateDistance, getTime } from "../utils/commonFunctions";
import NeedTypeHeading from "./NeedTypeHeading";
import StatusBadge from "./StatusBadge";
import { UserIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";
import HelpConfirmationDialog from "./HelpConfirmationDialog";
import { useSelector } from "react-redux";

const DonorDashboard = () => {
	const [requests, setRequests] = useState([]);
	const user = useSelector((store) => store.user);
	const [refreshRequests, setRefreshRequests] = useState(false);

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
			setRefreshRequests(false);
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		fetchRequests();
	}, [refreshRequests]);
	return (
		<div className="p-6 mt-16 w-full max-w-screen-xl mx-auto">
			<div className="flex gap-52">
				<span>
					<h1 className="text-2xl font-bold mb-6">Hey, Aadil. You are Hero!</h1>
				</span>
				<span>
					<h2 className="text-center text-2xl font-bold">
						People Around You Need Support — Step In
					</h2>
				</span>
			</div>

			<div className="grid grid-cols-3 gap-6">
				<div className="bg-white rounded-xl shadow-lg p-4 col-span-1 overflow-y-auto max-h-[70vh]">
					<h2 className="text-xl font-bold mb-4">Nearby Needy Requests</h2>

					<div className="space-y-4">
						{requests.length === 0 ? (
							<Loader />
						) : (
							requests.map((request) => (
								<RequestCard
									request={request}
									key={request._id}
									donorLocation={[longitude, latitude]}
									user={user}
									setRefreshRequests={setRefreshRequests}
								/>
							))
						)}
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

const RequestCard = ({ request, donorLocation, user, setRefreshRequests }) => {
	console.log(request?.address);

	const isHelped =
		request?.status === "in_progress" ||
		request?.status === "fulfilled" ||
		request?.status === "flagged";

	return (
		<div className="bg-base-200 p-4 rounded-lg shadow-sm">
			<div className="flex justify-between items-center">
				<span className="flex gap-1 items-center">
					<h3 className="font-bold text-lg">
						Family in{" "}
						{request?.address?.split(",")[0] || request?.address?.split(",")[1]}
					</h3>
					<p className="text-[13px] font-semibold text-gray-500 mt-1">
						(~
						{calculateDistance(
							donorLocation,
							request?.location?.coordinates
						)}{" "}
						meters)
					</p>
				</span>
				<StatusBadge status={request?.status} />
			</div>
			<NeedTypeHeading needType={request?.needType} size="xs" />
			<p className="text-xs text-gray-600 dark:text-gray-500">
				{request?.description}
			</p>

			<div className="flex justify-between items-center">
				<span className="text-xs text-gray-400">
					Requested {getTime(request?.createdAt)} ago
				</span>
				{!isHelped || request?.donorUserId?._id === user._id ? (
					<HelpConfirmationDialog
						request={request}
						donorLocation={donorLocation}
						donorUserId={user?._id}
						setRefreshRequests={setRefreshRequests}
					/>
				) : (
					<span className="flex gap-1 justify-center items-center border border-purple-600 text-purple-600 rounded-xl px-2 py-0.5">
						<UserIcon className="w-4 h-4" />
						<p className="text-sm ">{request?.donorUserId?.name}</p>
					</span>
				)}
			</div>
		</div>
	);
};

export default DonorDashboard;
