import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMapEvent,
} from "react-leaflet";
import { BASE_URL } from "../utils/constants";
import { useLocation } from "react-router-dom";

const Map = () => {
	const [requests, setRequests] = useState([]);
	// Get the current location object
	const location = useLocation();

	// Create a URLSearchParams instance from the query string
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
		<div className="ml-30">
			<MapContainer
				center={[28.752271, 77.287743]}
				zoom={13}
				scrollWheelZoom={false}
				style={{ height: "70vh", width: "70%" }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{requests.map((request) => (
					<LocationMarker request={request} key={request._id} />
				))}
			</MapContainer>
		</div>
	);
};

const LocationMarker = ({ request }) => {
	return (
		<Marker
			position={[
				request?.location?.coordinates[1],
				request?.location?.coordinates[0],
			]}
		>
			<Popup>
				A pretty CSS3 popup. <br /> Easily customizable.
			</Popup>
		</Marker>
	);
};

export default Map;
