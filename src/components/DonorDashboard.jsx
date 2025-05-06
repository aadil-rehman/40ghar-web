import React from "react";
import Map from "./Map";

const DonorDashboard = () => {
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
						{/* This will be replaced with real data later */}
						<RequestCard />
						<RequestCard />
						<RequestCard />
					</div>
				</div>
				{/* Map */}
				<div className="col-span-2 rounded-xl overflow-hidden shadow-lg max-h-[70vh]">
					<Map />
				</div>
			</div>
		</div>
	);
};

const RequestCard = () => {
	return (
		<div className="bg-base-200 p-4 rounded-lg shadow-sm">
			<h3 className="font-bold text-lg">Family in East Delhi</h3>
			<p className="text-sm text-gray-600 dark:text-gray-300">
				Needs ration urgently for 5 members.
			</p>
			<p className="text-sm text-gray-500 mt-1">Distance: ~120 meters</p>

			<div className="mt-3 flex justify-between items-center">
				<span className="text-xs text-gray-400">Requested 2 hrs ago</span>
				<button className="btn btn-sm btn-primary">View Details</button>
			</div>
		</div>
	);
};

export default DonorDashboard;
