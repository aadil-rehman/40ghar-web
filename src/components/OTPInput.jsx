import React, { useRef } from "react";

const OTPInput = ({
	length = 6,
	onChange,
	phone,
	lightColor,
	darkColor,
	handleSubmit,
	isLogin,
}) => {
	const inputs = useRef([]);

	console.log(inputs);

	const handleChange = (value, index) => {
		const newOtp = inputs.current.map((input) => input.value).join("");
		onChange(newOtp);

		if (value && index < length - 1) {
			inputs.current[index + 1].focus();
		}
	};

	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && !inputs.current[index].value && index > 0) {
			inputs.current[index - 1].focus();
		}

		if (/^[0-9]$/.test(e.key) && index < length - 1) {
			// Delay to allow value to be set first
			setTimeout(() => {
				inputs.current[index + 1].focus();
			}, 0);
		}
	};

	return (
		<div className="text-center">
			{!isLogin && <hr className="border-t border-gray-300 my-4" />}
			<h2
				className="text-xl font-semibold text-gray-800 mb-2"
				style={{ color: darkColor }}
			>
				Verify Your Phone
			</h2>
			<p className="text-xs text-gray-600 mb-4">
				6-digit verification code sent to 7065830366
				{/* <span className="font-medium text-gray-900">{phone}</span> */}
			</p>
			<div className="flex gap-2 justify-center">
				{Array.from({ length }).map((_, i) => (
					<input
						key={i}
						type="text"
						maxLength="1"
						ref={(el) => (inputs.current[i] = el)}
						onChange={(e) => handleChange(e.target.value, i)}
						onKeyDown={(e) => handleKeyDown(e, i)}
						className="w-8 h-8 md:w-9 md:h-9 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				))}
			</div>
			<button
				type="submit"
				style={{ backgroundColor: lightColor, color: darkColor }}
				className={`btn w-full rounded-lg my-4`}
				onClick={handleSubmit}
			>
				{isLogin ? "Submit" : "Sign up"}
			</button>
		</div>
	);
};

export default OTPInput;
