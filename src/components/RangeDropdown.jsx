import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { RiMapPinRangeLine } from "react-icons/ri";

const ranges = [1, 2, 5, 10];

const RangeDropdown = ({ range, setRange }) => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef();

	// Close on outside click
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			className="relative inline-block text-left z-2000 mx-2"
			ref={dropdownRef}
		>
			<button
				onClick={() => setOpen((prev) => !prev)}
				className="flex items-center gap-2 px-2 py-1 text-sm hover:cursor-pointer bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
			>
				<RiMapPinRangeLine className="w-4 h-4" />
				<span>{range} KM</span>
				<ChevronDown className="w-4 h-4 text-gray-400" />
			</button>

			{open && (
				<div className="absolute z-10 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg">
					<ul className="text-sm text-gray-700">
						{ranges.map((r) => (
							<li
								key={r}
								onClick={() => {
									setRange(r);
									setOpen(false);
								}}
								className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
									range === r ? "font-semibold" : ""
								}`}
							>
								{r} KM
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default RangeDropdown;
