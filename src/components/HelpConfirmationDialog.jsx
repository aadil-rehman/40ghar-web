import StatusBadge from "./StatusBadge";
import NeedTypeHeading from "./NeedTypeHeading";
import { calculateDistance, getTime } from "../utils/commonFunctions";
import { useEffect, useState } from "react";
import {
	AlertTriangle,
	CheckCircle,
	Clock,
	CopyIcon,
	Loader,
	User2Icon,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

var buttonStyle =
	"bg-gradient-to-r  from-blue-500 to-purple-600 text-sm text-white hover:cursor-pointer py-1 px-3 rounded-full shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-700 transition-all duration-300";

const HelpConfirmationDialog = ({
	request,
	donorLocation,
	donorUserId,
	setRefreshRequests,
}) => {
	const my_model_id = `model-${request?._id}`;

	const [interestedInHelp, setInterestedInHelp] = useState(
		request?.status !== "pending" || false
	);
	const [selectedFeedback, setSelectedFeedback] = useState("");
	const [error, setError] = useState("");

	const handleHelpClick = async (status) => {
		try {
			console.log(status, selectedFeedback);
			if (status === "fulfilled" && selectedFeedback === "") {
				setError("Please select the feedback first!");
				return;
			}

			if (
				(selectedFeedback === "wrong-number" ||
					selectedFeedback === "spam-request") &&
				status === "fulfilled"
			) {
				setError(
					"As per feedback you selected, you can not close this request as fulfilled!"
				);
				return;
			}

			if (
				(selectedFeedback === "met-helped" ||
					selectedFeedback === "met-helped") &&
				status === "flagged"
			) {
				setError(
					"As per feedback you selected, you can not close this request as flagged!"
				);
				return;
			}

			const res = await axios.patch(
				BASE_URL + `/request/action/${status}/${request._id}/${donorUserId}`,
				{},
				{ withCredentials: true }
			);

			setInterestedInHelp(true);
			setRefreshRequests(true);
			setError("");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<button
				className={buttonStyle}
				onClick={() => document.getElementById(my_model_id).showModal()}
			>
				{request?.status === "pending"
					? "I will help"
					: request?.status === "in_progress"
					? "Update Status"
					: "Closed"}
			</button>
			<dialog id={my_model_id} className="modal">
				<div className="modal-box">
					<div className="flex justify-between items-center">
						<div className="flex flex-col gap-1">
							<span className="flex gap-1 items-center">
								<h3 className="font-bold text-lg">
									Family in{" "}
									{request?.address?.split(",")[0] ||
										request?.address?.split(",")[1]}
								</h3>
								<p className="text-[13px] font-semibold text-gray-500 mt-1">
									(~
									{calculateDistance(
										donorLocation,
										request?.location?.coordinates
									)}{" "}
									meters)
								</p>
							</span>
							<NeedTypeHeading needType={request?.needType} size="xs" />
						</div>
						<div className="flex flex-col gap-1">
							<StatusBadge status={request?.status} />
							<span className="text-xs text-gray-400">
								Requested {getTime(request?.createdAt)} ago
							</span>
						</div>
					</div>

					<p className="text-xs my-2 text-gray-600 dark:text-gray-500">
						{request?.description}
					</p>

					{!interestedInHelp ? (
						<RequestPending handleHelpClick={handleHelpClick} />
					) : (
						<div className="flex flex-col justify-center">
							<p className="font-semibold text-center text-lg ">
								Thank You Hero! 👑
							</p>
							<StepProgress request={request} />
							{/* <div className="mt-6 p-4 rounded-lg shadow-sm bg-gray-50">
								<div className="flex gap-2 items-center justify-center">
									<h4 className="font-semibold mb-2 text-sm">
										Contact Details:
									</h4>
									<span className="mb-2 text-xs border px-2 py-0.1 rounded-xl flex gap-1">
										<User2Icon className="w-3 h-3 mt-0.5" /> <p>Anonymous</p>
									</span>
									<div className="flex items-center gap-2 text-sm">
										<span className="font-medium text-blue-600 mb-2">
											7011223344
										</span>
										<button
											onClick={() => {
												navigator.clipboard.writeText(7011223344);
												alert("Phone number copied!");
											}}
											className="text-blue-600 underline text-xs"
										>
											<CopyIcon className="w-4 h-4 mb-1" />
										</button>
									</div>
								</div>

								<p className="mt-4 text-sm text-gray-600">
									✅ Once the request is fulfilled, kindly update the status
									below.
								</p>
								<div>
									<input type="checkbox" defaultChecked className="checkbox" />
									<label>Call with the needy? and fulfilled the request</label>
								</div>

								<div>
									<input type="checkbox" defaultChecked className="checkbox" />
									<label>Call with the needy? and fulfilled the request</label>
								</div>
							</div> */}
							<div className="mt-6 p-4 rounded-lg shadow-sm bg-gray-50 space-y-4">
								<div className="flex items-center justify-center gap-1">
									<h4 className="font-semibold text-sm">Contact Details:</h4>
									<div className="flex items-center gap-2 text-sm">
										<span className="font-medium text-blue-600">
											7011223344
										</span>
										<button
											onClick={() => {
												navigator.clipboard.writeText(7011223344);
												alert("Phone number copied!");
											}}
											className="text-blue-600 underline text-xs"
										>
											<CopyIcon className="w-4 h-4 hover:cursor-pointer" />
										</button>
									</div>
								</div>
								{request?.status === "in_progress" ? (
									<RequestInProgress
										selectedFeedback={selectedFeedback}
										setSelectedFeedback={setSelectedFeedback}
										handleHelpClick={handleHelpClick}
									/>
								) : null}
								{(request?.status === "fulfilled" ||
									request?.status === "flagged") && (
									<RequestFulfilledFlagged status={request?.status} />
								)}

								{error && (
									<p className="text-red-600 text-center text-sm my-2">
										{error}
									</p>
								)}
							</div>
						</div>
					)}
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
};

const RequestFulfilledFlagged = ({ status }) => {
	if (status !== "fulfilled" && status !== "flagged") return null;

	return (
		<div className="mt-6 px-4 py-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-md border border-green-200 text-center space-y-4">
			{status === "fulfilled" ? (
				<>
					<div className="flex justify-center">
						<CheckCircle className="w-8 h-8 text-green-600" />
					</div>
					<h3 className="text-lg font-semibold text-green-700">
						You've made a difference!
					</h3>
					<p className="text-sm text-gray-700">
						Thank you for your compassion and support. Your help brought hope to
						someone in need.
					</p>
					<p className="text-sm italic text-gray-500">
						"Helping one person might not change the world, but it could change
						the world for that one person."
					</p>
				</>
			) : (
				<>
					<div className="flex justify-center">
						<AlertTriangle className="w-8 h-8 text-yellow-600" />
					</div>
					<h3 className="text-lg font-semibold text-yellow-700">
						Thanks for flagging this request.
					</h3>
					<p className="text-sm text-gray-700">
						Your feedback helps us keep this platform safe and reliable.
					</p>
					<p className="text-sm italic text-gray-500">
						"The smallest act of kindness is worth more than the grandest
						intention."
					</p>
				</>
			)}
		</div>
	);
};

const RequestPending = ({ handleHelpClick }) => {
	return (
		<div className="flex flex-col gap-2 justify-center items-center mt-5">
			<div className="font-medium text-center">
				<p className="mb-2">🙏 Would you like to help this family in need?</p>
				<p className="mb-2 text-gray-400 text-xs">
					If you commit to help, then only contact details of the family will be
					visible to you.
				</p>
				<p className="text-red-500 font-semibold text-xs">
					Once you confirm, you won't be able to undo this action.
				</p>
			</div>
			<button
				className={buttonStyle}
				onClick={() => handleHelpClick("in_progress")}
			>
				I will help
			</button>
		</div>
	);
};

const RequestInProgress = ({
	selectedFeedback,
	setSelectedFeedback,
	handleHelpClick,
}) => {
	const handleRadioChange = (e) => {
		setSelectedFeedback(e.target.value);
	};
	return (
		<div>
			<p className="text-sm border-t pt-4 text-gray-600 font-semibold">
				Please provide feedback about your interaction:
			</p>
			<div className="mt-2 space-y-2 text-sm text-gray-700">
				<label className="flex items-center gap-2 text-[13px]">
					<input
						type="radio"
						name="feedback"
						value="wrong-number"
						checked={selectedFeedback === "wrong-number"}
						onChange={handleRadioChange}
						className="hover:cursor-pointer"
					/>
					Wrong phone number
				</label>
				<label className="flex items-center gap-2 text-[13px]">
					<input
						type="radio"
						name="feedback"
						value="spam-request"
						checked={selectedFeedback === "spam-request"}
						onChange={handleRadioChange}
						className="hover:cursor-pointer"
					/>
					Spam or misleading request
				</label>
				<label className="flex items-center gap-2 text-[13px]">
					<input
						type="radio"
						name="feedback"
						value="met-helped"
						checked={selectedFeedback === "met-helped"}
						onChange={handleRadioChange}
						className="hover:cursor-pointer"
					/>
					Met the needy personally and help was provided
				</label>
				<label className="flex items-center gap-2 text-[13px]">
					<input
						type="radio"
						name="feedback"
						value="remote-helped"
						checked={selectedFeedback === "remote-helped"}
						onChange={handleRadioChange}
						className="hover:cursor-pointer"
					/>
					Help was provided remotely (not met in person)
				</label>
			</div>

			<p className="my-4 text-sm italic font-semibold text-gray-800 border-l-4 pl-4 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-100 shadow-md hover:shadow-lg transition-shadow duration-300">
				Helped the needy? Please update the request status below.
			</p>

			<div className="mt-6 flex gap-3 justify-center">
				<button
					onClick={() => handleHelpClick("fulfilled")}
					className="bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white text-sm py-1 px-4 rounded-full shadow"
				>
					Mark as Fulfilled
				</button>
				<button
					onClick={() => handleHelpClick("flagged")}
					className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white text-sm py-1 px-4 rounded-full shadow"
				>
					Flag Request
				</button>
			</div>
		</div>
	);
};

const StepProgress = ({ request }) => {
	const [activeStep, setActiveStep] = useState(1);

	const status = request?.status || "pending";

	useEffect(() => {
		if (status === "pending") setActiveStep(1);
		if (status === "in_progress") setActiveStep(2);
		if (status === "fulfilled" || status === "flagged") setActiveStep(3);
	}, [status]);

	return (
		<ul className="steps gap-4 mt-5">
			<li className={`step ${activeStep >= 1 ? "step-success" : ""}`}>
				<span className="step-icon">
					<Clock className="w-4 h-4" />
				</span>
				<span className="text-xs mt-1">Pending</span>
			</li>
			<li className={`step ${activeStep >= 2 ? "step-success" : ""}`}>
				<span className="step-icon">
					<Loader className="w-4 h-4 " />
				</span>
				<span className="text-xs mt-1">In Progress</span>
			</li>
			<li
				className={`step ${
					activeStep === 3
						? request?.status === "fulfilled"
							? "step-success"
							: "step-custom-error step-error"
						: ""
				}`}
			>
				<span className="step-icon">
					<CheckCircle className="w-4 h-4" />
				</span>
				<span className="text-xs mt-1">
					{request?.status === "flagged" ? "Flagged" : "Fulfilled"}
				</span>
			</li>
		</ul>
	);
};

export default HelpConfirmationDialog;
