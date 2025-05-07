import React from "react";
import {
	FaHandHoldingHeart,
	FaMapMarkerAlt,
	FaCheckCircle,
} from "react-icons/fa";
import helpImage from "../assets/people-together.jpg.svg";

const NeedyDashboard = () => {
	return (
		<div className="min-h-screen bg-base-100 py-10 px-4">
			<div className="max-w-6xl mx-auto">
				{/* Welcome Banner */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-4xl font-bold text-neutral mb-4 mt-8">
						Hope Starts Here 🌟
					</h1>

					<p className="text-lg text-gray-600">
						Raise a request for help and let nearby donors ready to support you.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
					<img
						src={helpImage}
						alt="help-image"
						className="h-48 w-full col-span-1 sm:col-span-2 items-center"
					/>

					<div className="card bg-base-200 p-8 shadow-md w-full flex mx-auto mb-12 col-span-1 sm:col-span-1">
						<h3 className="text-xl font-semibold text-neutral mb-4">
							Raise a New Request
						</h3>
						<p className="text-gray-600 mb-6 text-sm">
							Let nearby donors know what you need. fill out the form for quick,
							compassionate support.
						</p>
						<button className="btn btn-primary w-full md:w-48">
							Raise Request
						</button>
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
					<div className="card bg-pastel shadow-md p-6 text-center">
						<FaHandHoldingHeart className="text-4xl text-orange-500 mx-auto mb-2" />
						<h2 className="text-2xl font-bold text-neutral">50+</h2>
						<p className="text-sm text-gray-500">Beneficiaries Helped</p>
					</div>

					<div className="card bg-pastel shadow-md p-6 text-center">
						<FaMapMarkerAlt className="text-4xl text-cyan-400 mx-auto mb-2" />
						<h2 className="text-2xl font-bold text-neutral">5+</h2>
						<p className="text-sm text-gray-500">Districts Covered</p>
					</div>

					<div className="card bg-pastel shadow-md p-6 text-center">
						<FaCheckCircle className="text-4xl text-emerald-400 mx-auto mb-2" />
						<h2 className="text-2xl font-bold text-neutral">100+</h2>
						<p className="text-sm text-gray-500">Requests Fulfilled</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NeedyDashboard;
