import React, { useState } from "react";

const LocationModeToggle = ({ locationMode, setLocationMode }) => {
	const handleToggle = (selectedMode) => {
		setLocationMode(selectedMode);
	};

	return (
		<div className="flex justify-end mx-2 mb-1">
			{locationMode === "search" && (
				<input
					type="search"
					placeholder="Search"
					className="text-sm font-medium px-4 py-1 rounded-l-md w-40 focus:w-44 border-r-0 border border-purple-600 border-t-blue-500 focus:outline-none transition-all duration-300 "
				/>
			)}
			<button
				onClick={() => handleToggle("search")}
				className={`px-4 py-1 ${
					locationMode !== "search" && "hover:cursor-pointer rounded-l-md"
				} rounded-r-md text-sm font-medium ${
					locationMode === "search"
						? "bg-gradient-to-r  from-blue-500 to-purple-600 text-white"
						: "text-gray-700 hover:bg-gray-200"
				} transition-all duration-300 `}
			>
				Search Location
			</button>
			<button
				onClick={() => handleToggle("my")}
				className={`px-4 py-1 hover:cursor-pointer rounded-lg text-sm font-medium ${
					locationMode === "my"
						? "bg-gradient-to-r  from-blue-500 to-purple-600 text-white"
						: "text-gray-700 hover:bg-gray-200"
				} transition-all duration-300 `}
			>
				My Location
			</button>
		</div>
	);
};

export default LocationModeToggle;
