import L from "leaflet";
import { useEffect } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	ZoomControl,
} from "react-leaflet";

import customMarker from "../assets/pin-map.png";

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

const Map = ({ requests, userPosition, centerPosition }) => {
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
				<ZoomControl position="topright" />
				<Marker position={userPosition} icon={redIcon}>
					<Popup>User Location</Popup>
				</Marker>
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
			icon={customIcon}
		>
			<Popup>{request?.description}</Popup>
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
