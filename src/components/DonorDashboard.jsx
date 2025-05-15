import { UserIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calculateDistance, getTime } from "../utils/commonFunctions";
import { BASE_URL } from "../utils/constants";
import HelpConfirmationDialog from "./HelpConfirmationDialog";
import Loader from "./Loader";
import LocationModeToggle from "./LocationModeToggle";
import Map from "./Map";
import NeedTypeHeading from "./NeedTypeHeading";
import StatusBadge from "./StatusBadge";

import { SearchX } from "lucide-react";
import MapLoader from "./MapLoader";
import RangeDropdown from "./RangeDropdown";

const DonorDashboard = () => {
	const [requests, setRequests] = useState([]);
	const user = useSelector((store) => store.user);
	const [refreshRequests, setRefreshRequests] = useState(false);
	const [locationMode, setLocationMode] = useState("my");
	const [userPosition, setUserPosition] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [range, setRange] = useState(2);
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);

	const coordinates = user?.location?.coordinates;

	console.log(coordinates);
	const centerPosition =
		Array.isArray(coordinates) && coordinates.length >= 2
			? [coordinates[1], coordinates[0]]
			: [28.752271, 77.287743];

	console.log(centerPosition, userPosition);

	useEffect(() => {
		if (coordinates?.length === 2) {
			setLat(coordinates[1]);
		}
		if (coordinates?.length === 2) {
			setLng(coordinates[0]);
		}
	}, [coordinates]);

	const fetchRequests = async () => {
		const requestsRange = range * 1000;
		setIsLoading(true);
		if (!lat || !lng) return;
		try {
			const res = await axios.get(
				BASE_URL + `/request/all?lat=${lat}&lng=${lng}&range=${requestsRange}`,
				{
					withCredentials: true,
				}
			);
			console.log(res);
			setRequests(res?.data?.data);
			setRefreshRequests(false);
			setIsLoading(false);
		} catch (err) {
			console.error(err);
			setIsLoading(true);
		}
	};

	useEffect(() => {
		setUserPosition(centerPosition);
	}, [coordinates]);

	useEffect(() => {
		fetchRequests();
	}, [refreshRequests, range, coordinates, lat, lng]);
	return (
		<div className="p-6 mt-16 w-full max-w-screen-xl mx-auto">
			<div className="grid grid-cols-3 gap-2">
				<div className="col-span-1">
					<h1 className="text-2xl font-bold mb-6">Hey, Aadil. You are Hero!</h1>
				</div>
				<div className="col-span-2">
					<h2 className="text-center text-2xl font-bold">
						People Around You Need Support — Step In
					</h2>
					<div className="flex justify-between mt-3">
						<RangeDropdown range={range} setRange={setRange} />
						<LocationModeToggle
							locationMode={locationMode}
							setLocationMode={setLocationMode}
							setUserPosition={setUserPosition}
							setLat={setLat}
							setLng={setLng}
							setIsLoading={setIsLoading}
						/>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-6">
				<div className="rounded-xl shadow-lg p-4 col-span-1 overflow-y-auto max-h-[70vh]">
					<h2 className="text-xl font-bold mb-4">Nearby Needy Requests</h2>

					<div className="space-y-4">
						{isLoading ? (
							<Loader />
						) : (
							<>
								{requests?.length === 0 ? (
									<div className="flex flex-col items-center justify-center mt-10 p-6 bg-purple-50 rounded-lg border border-purple-200 shadow-sm">
										<SearchX className="text-purple-400 text-4xl mb-2" />
										<p className="text-purple-700 font-semibold text-sm text-center">
											No nearby requests found at your selected location.
										</p>
									</div>
								) : (
									requests.map((request) => (
										<RequestCard
											request={request}
											key={request._id}
											donorLocation={[lng, lat]}
											user={user}
											setRefreshRequests={setRefreshRequests}
										/>
									))
								)}
							</>
						)}
					</div>
				</div>
				{/* Map */}
				<div className="col-span-2 rounded-xl overflow-hidden shadow-lg max-h-[70vh] relative">
					{isLoading && <MapLoader />}
					<Map
						requests={requests}
						userPosition={userPosition}
						centerPosition={centerPosition}
						range={range}
					/>
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
