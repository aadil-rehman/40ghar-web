export async function getAddress({ latitude, longitude }) {
	const res = await fetch(
		`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
	);
	if (!res.ok) throw Error("Failed getting address");

	const data = await res.json();
	return data;
}

export function shortenString(str, maxLength) {
	return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

export function getTime(timestamp) {
	const eventCreatedDate = new Date(timestamp);
	const currDate = new Date();

	const diffMs = currDate - eventCreatedDate;

	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays >= 2) {
		return `${diffDays} days`;
	} else if (diffDays === 1) {
		return `1 day`;
	} else if (diffHours >= 2) {
		return `${diffHours} hrs`;
	} else if (diffHours === 1) {
		return `1 hr`;
	} else if (diffMinutes >= 2) {
		return `${diffMinutes} mins`;
	} else if (diffMinutes === 1) {
		return `1 min`;
	} else {
		return "few seconds";
	}
}

export function calculateDistance(donorLocation, needyLocation) {
	const toRadians = (degrees) => (degrees * Math.PI) / 180;

	const [lon1, lat1] = donorLocation;
	const [lon2, lat2] = needyLocation;

	const R = 6371000; // Radius of Earth in meters
	const φ1 = toRadians(lat1);
	const φ2 = toRadians(lat2);
	const Δφ = toRadians(lat2 - lat1);
	const Δλ = toRadians(lon2 - lon1);

	const a =
		Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const distance = R * c;

	return Math.round(distance); // distance in meters
}
