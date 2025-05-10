import { CheckCircle, Clock, AlertTriangle, History } from "lucide-react";

const statusStyles = {
	pending: {
		text: "Pending",
		icon: Clock,
		bg: "bg-yellow-50",
		textColor: "text-yellow-700",
		ring: "ring-yellow-300",
	},
	in_progress: {
		text: "In Progress",
		icon: History,
		bg: "bg-blue-50",
		textColor: "text-blue-700",
		ring: "ring-blue-300",
	},
	fulfilled: {
		text: "Fulfilled",
		icon: CheckCircle,
		bg: "bg-green-50",
		textColor: "text-green-700",
		ring: "ring-green-300",
	},
	flagged: {
		text: "Flagged",
		icon: AlertTriangle,
		bg: "bg-red-50",
		textColor: "text-red-700",
		ring: "ring-red-300",
	},
};

const StatusBadge = ({ status }) => {
	const style = statusStyles[status] || statusStyles["pending"];
	const Icon = style.icon;

	return (
		<span
			className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium 
				${style.bg} ${style.textColor} ring-1 ${style.ring}`}
		>
			<Icon size={14} className="shrink-0 text-xs" />
			{style.text}
		</span>
	);
};

export default StatusBadge;
