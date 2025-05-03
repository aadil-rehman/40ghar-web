import React, { useState } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMapEvent,
} from "react-leaflet";

const Map = () => {
	return (
		<div className="ml-30">
			<MapContainer
				center={[28.6139, 77.209]}
				zoom={13}
				scrollWheelZoom={false}
				style={{ height: "70vh", width: "70%" }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<LocationMarker />
			</MapContainer>
		</div>
	);
};

const LocationMarker = () => {
	const [position, setPosition] = useState(null);

	useMapEvent({
		click(e) {
			setPosition(e.latlng);
		},
	});

	return position ? (
		<Marker position={position}>
			<Popup>
				A pretty CSS3 popup. <br /> Easily customizable.
			</Popup>
		</Marker>
	) : null;
};

export default Map;
