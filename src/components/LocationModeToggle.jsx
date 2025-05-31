import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { shortenString } from "../utils/commonFunctions";
import { useSelector } from "react-redux";

const LocationModeToggle = ({
	locationMode,
	setLocationMode,
	setUserPosition,
	setLat,
	setLng,
	setIsLoading,
	setInputMarkerPosition,
}) => {
	const [query, setQuery] = useState("");
	const [searchSuggestions, setSearchSueggestions] = useState([]);
	const searchInputRef = useRef();

	const user = useSelector((store) => store.user);
	const theme = useSelector((store) => store.theme);

	const handleSearchQuery = (e) => {
		setQuery(e.target.value);
	};

	useEffect(() => {
		if (locationMode === "search") {
			searchInputRef.current?.focus();
		}
	}, [locationMode]);

	const getCurrentPositionAsync = () =>
		new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});

	const handleToggle = async (selectedMode) => {
		setLocationMode(selectedMode);

		if (selectedMode === "my") {
			setQuery("");
			setIsLoading(true);
			if ("geolocation" in navigator) {
				try {
					const position = await getCurrentPositionAsync();
					const { latitude, longitude } = position.coords;
					setUserPosition([latitude, longitude]);
					setInputMarkerPosition(null);
					setLat(latitude);
					setLng(longitude);
					setIsLoading(false);
				} catch (error) {
					console.error("Geolocation error:", error);
					setUserPosition([
						user?.location?.coordinates[1],
						user?.location?.coordinates[0],
					]);
					setIsLoading(false);
				}
			} else {
				console.error("Geolocation not supported");
				setUserPosition([
					user?.location?.coordinates[1],
					user?.location?.coordinates[0],
				]);
				setIsLoading(false);
			}
		}
	};

	//geocode the search query
	useEffect(() => {
		const delayDebounce = setTimeout(() => {
			const fetchCoordinates = async () => {
				if (!query.trim()) {
					setSearchSueggestions([]);
					return;
				}
				try {
					const res = await axios.get(
						`https://nominatim.openstreetmap.org/search?format=json&limit=8&q=${query}`
					);
					setSearchSueggestions(
						res?.data.map((item) => {
							return {
								display_name: item.display_name,
								lat: parseFloat(item.lat),
								lon: parseFloat(item.lon),
							};
						})
					);
					console.log(res);
				} catch (err) {
					console.error("error: " + err);
				}
			};

			fetchCoordinates();
		}, 500); // 500ms debounce

		return () => clearTimeout(delayDebounce); // Clear on cleanup
	}, [query]);

	const handleSuggestionAddressClick = (position) => {
		setLat(position[0]);
		setLng(position[1]);
		setUserPosition(position);
		setSearchSueggestions([]);
		setInputMarkerPosition(null);
	};
	return (
		<div className="flex justify-end mx-2 mb-1">
			{locationMode === "search" && (
				<div className="relative">
					<input
						type="search"
						placeholder="Search"
						ref={searchInputRef}
						value={query}
						onChange={handleSearchQuery}
						className="text-sm font-medium px-4 py-1 rounded-l-md w-60 focus:w-64 border-r-0 border border-purple-600 border-t-blue-500 focus:outline-none transition-all duration-300 "
					/>
					{searchSuggestions.length > 0 && (
						<ul className="absolute z-2000 top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1">
							{searchSuggestions.length > 0 &&
								searchSuggestions.map((item, index) => (
									<li
										key={index}
										className="text-sm px-2 py-1 flex gap-1 items-center text-neutral-950 hover:bg-gray-100 hover:cursor-pointer"
										onClick={() =>
											handleSuggestionAddressClick([item?.lat, item?.lon])
										}
									>
										<HiOutlineLocationMarker className="w-4 h-4" />
										{shortenString(item?.display_name, 28)}
									</li>
								))}
						</ul>
					)}
				</div>
			)}
			<button
				onClick={() => handleToggle("search")}
				className={`px-4 py-1  ${
					locationMode !== "search" && "hover:cursor-pointer rounded-l-md"
				} rounded-r-md text-sm font-medium ${
					locationMode === "search"
						? "bg-gradient-to-r  from-blue-500 to-purple-600 text-white"
						: "text-gray-700 hover:bg-gray-200"
				} transition-all duration-300 ${
					theme === "dark" && locationMode !== "search"
						? "text-white/60 hover:bg-gray-700"
						: ""
				} `}
			>
				Search Location
			</button>
			<button
				onClick={() => handleToggle("my")}
				className={`px-4 py-1 hover:cursor-pointer rounded-lg text-sm font-medium ${
					locationMode === "my"
						? "bg-gradient-to-r  from-blue-500 to-purple-600 text-white"
						: "text-gray-700 hover:bg-gray-200"
				} transition-all duration-300 ${
					theme === "dark" && locationMode !== "my"
						? "text-white/60 hover:bg-gray-700"
						: ""
				}`}
			>
				My Location
			</button>
		</div>
	);
};

export default LocationModeToggle;
