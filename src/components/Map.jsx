import L from "leaflet";
import { useEffect, useState } from "react";
import {
	Circle,
	LayerGroup,
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	Tooltip,
	useMap,
	useMapEvent,
	ZoomControl,
} from "react-leaflet";

import customMarker from "../assets/pin-map.png";
import { AlertTriangle, CheckCircle, Clock, History } from "lucide-react";

const customIcon = new L.Icon({
	iconUrl: customMarker,
	iconSize: [32, 32],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});

const redIcon = new L.Icon({
	iconUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
	shadowUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
	iconSize: [30, 50],
	iconAnchor: [15, 50],
	popupAnchor: [0, -50],
});

const fillPurpleOptions = {
	fillColor: "#dab6fc", // Light purple fill
	color: "#9f6ef0", // Light purple border
	fillOpacity: 0.2, // Soft transparency
	weight: 2, // Border thickness
};

const Map = ({
	requests,
	userPosition,
	centerPosition,
	range,
	setLat,
	setLng,
	setUserPosition,
	inputMarkerPosition,
	setInputMarkerPosition,
}) => {
	console.log(inputMarkerPosition, userPosition);
	return (
		<div className="w-full h-[80vh]">
			<MapContainer
				center={centerPosition}
				zoom={14}
				scrollWheelZoom={false}
				style={{ height: "70vh", width: "100%" }}
				zoomControl={false}
			>
				<MapUpdater userPosition={userPosition} />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<LayerGroup>
					<Circle
						center={userPosition}
						pathOptions={fillPurpleOptions}
						radius={range * 1000}
					/>
				</LayerGroup>
				<ZoomControl position="topright" />
				<InputMarker
					setInputMarkerPosition={setInputMarkerPosition}
					setLat={setLat}
					setLng={setLng}
					setUserPosition={setUserPosition}
				/>

				<Marker position={inputMarkerPosition || userPosition} icon={redIcon}>
					<Popup>User Location</Popup>
				</Marker>
				{requests.map((request) => (
					<LocationMarker request={request} key={request._id} />
				))}
			</MapContainer>
		</div>
	);
};

const InputMarker = ({
	setInputMarkerPosition,
	setLat,
	setLng,
	setUserPosition,
}) => {
	useMapEvent({
		click(e) {
			const { lat, lng } = e.latlng;
			setInputMarkerPosition(e.latlng);
			setLat(lat);
			setLng(lng);
			setUserPosition([lat, lng]);
		},
	});
	return null;
};

const LocationMarker = ({ request }) => {
	console.log(request?.status);

	const getTooltipIcon = (status) => {
		const size = 20; // or whatever size you want

		switch (status) {
			case "pending":
				return <Clock size={size} color="red" />;
			case "in_progress":
				return <History size={size} color="blue" />;
			case "fulfilled":
				return <CheckCircle size={size} color="green" />;
			case "flagged":
				return <AlertTriangle size={size} className="text-yellow-600" />;
			default:
				return null;
		}
	};

	const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

	const getPopContent = (needType, status) => {
		const type = capitalize(needType);
		const baseStyle = "text-xs font-semibold leading-snug";

		const statusText = {
			pending: {
				color: "text-red-800",
				bg: "bg-red-100",
				border: "border-red-500",
				statusLabel: "🚨 Pending",
				message: `This ${type} request is waiting for support. Please, go check the request.`,
			},
			in_progress: {
				color: "text-blue-800",
				bg: "bg-blue-50",
				statusLabel: "In Progress",
				message: `Work is underway, someone committed to help.`,
			},
			fulfilled: {
				color: "text-green-700",
				bg: "bg-green-50",
				statusLabel: "✅ Fulfilled",
				message: `${type} request has been completed successfully.`,
			},
			flagged: {
				color: "text-orange-700",
				bg: "bg-orange-50",
				statusLabel: "⚠️ Flagged",
				message: `${type} request has been reviewed and flagged.`,
			},
		};

		const info = statusText[status];
		if (!info) return null;

		return (
			<div
				className={`p-2 rounded-md ${info.bg} border-l-4 ${info.color} border-current`}
			>
				<p className={`${baseStyle} mb-1`}>
					<span className="font-bold">Needs {type}</span> |{" "}
					<span>{info.statusLabel}</span>
				</p>
				<p className={`${baseStyle}`}>{info.message}</p>
			</div>
		);
	};

	return (
		<Marker
			position={[
				request?.location?.coordinates[1],
				request?.location?.coordinates[0],
			]}
			icon={customIcon}
		>
			<Tooltip permanent direction="top" offset={[0, -20]}>
				{getTooltipIcon(request?.status)}
			</Tooltip>
			<Popup>{getPopContent(request?.needType, request?.status)}</Popup>
		</Marker>
	);
};

const MapUpdater = ({ userPosition }) => {
	const map = useMap();

	useEffect(() => {
		if (userPosition) {
			map.setView(userPosition, 14);
		}
	}, [userPosition, map]);

	return null;
};

export default Map;
