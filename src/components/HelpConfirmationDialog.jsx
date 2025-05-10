import StatusBadge from "./StatusBadge";
import NeedTypeHeading from "./NeedTypeHeading";
import { calculateDistance, getTime } from "../utils/commonFunctions";
import { useState } from "react";
import { CopyIcon, User2Icon } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

var buttonStyle =
	"bg-gradient-to-r  from-blue-500 to-purple-600 text-sm text-white  py-1 px-3 rounded-full shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-700 transition-all duration-300";

const HelpConfirmationDialog = ({ request, donorLocation }) => {
	const [interestedInHelp, setInterestedInHelp] = useState(
		request?.status !== "pending" || false
	);

	const donorUserId = "6815ca399089574613ae0968";
	const handleHelpClick = async (status) => {
		try {
			const res = await axios.patch(
				BASE_URL + `/request/action/${status}/${request._id}/${donorUserId}`,
				{},
				{ withCredentials: true }
			);
			console.log(res?.data?.data);
			setInterestedInHelp(true);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div>
			<button
				className={buttonStyle}
				onClick={() => document.getElementById("my_modal_2").showModal()}
			>
				{request?.status === "pending" ? "I will help" : "Update status"}
			</button>
			<dialog id="my_modal_2" className="modal">
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

					<p className="text-sm text-gray-600 dark:text-gray-300">
						{request?.description}
					</p>

					{!interestedInHelp ? (
						<div className="flex flex-col gap-2 justify-center items-center mt-5">
							<div className="font-medium text-center">
								<p className="mb-2">
									🙏 Would you like to help this family in need?
								</p>
								<p className="mb-2 text-gray-400 text-xs">
									If you commit to help, then only contact details of the family
									will be visible to you.
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
					) : (
						<div className="flex flex-col justify-center">
							<p className="mb-2 font-semibold text-center text-lg ">
								Thanks Hero! 👑
							</p>
							<StepProgress />
							<div className="mt-6 p-4 rounded-lg shadow-sm bg-gray-50">
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

const StepProgress = () => {
	return (
		<ul className="steps gap-4 mt-5">
			<li className="step step-primary">Pending</li>
			<li className="step step-primary">In Progress</li>
			<li className="step">Fulfilled</li>
		</ul>
	);
};

export default HelpConfirmationDialog;
