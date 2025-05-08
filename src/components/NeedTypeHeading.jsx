import React from "react";

const labelMap = {
	ration: { label: "🧺 Needs Ration", color: "text-green-600" },
	cloths: { label: "👕 Needs Cloths", color: "text-blue-600" },
	medicine: { label: "💊 Needs Medicine", color: "text-red-600" },
	other: { label: "🤝 Needs Support", color: "text-purple-600" },
};

const NeedTypeHeading = ({ needType, size }) => {
	const { label, color } = labelMap[needType] || labelMap.other;

	return <h3 className={`text-${size} font-semibold ${color}`}>{label}</h3>;
};

export default NeedTypeHeading;
