import { useNavigate } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import { darkBlue, darkPurple, lightBlue, lightPurple } from "../utils/colors";
import LoginDialog from "./LoginDialog";
import NeedyLoginDialog from "./NeedyLoginDialog";

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex items-center justify-center bg-base-100 px-6 ">
			<div className="text-center max-w-2xl">
				<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
					Welcome to CareBridge
				</h1>
				<p className="text-lg text-gray-500 mb-10">
					A compassionate platform where help meets those who need it the most.
				</p>

				<div className="flex flex-col md:flex-row gap-6 justify-center">
					<div className="card w-full md:w-64 bg-pastel shadow-xl">
						<div className="card-body items-center text-center">
							<h2 className="card-title text-blue-500">I'm a Donor</h2>
							<p>View nearby help requests and support your community.</p>
							<div className="card-actions mt-4">
								<LoginDialog
									label="Login as Donor"
									userRole="donor"
									darkColor={darkBlue}
									lightColor={lightBlue}
								/>
							</div>
							<div className=" flex gap-1 text-xs text-center mt-2">
								<p>New User?</p>
								<span>
									<SideDrawer
										label="Sign up"
										userRole="donor"
										darkColor={darkBlue}
										lightColor={lightBlue}
									/>
								</span>
							</div>
						</div>
					</div>

					<div className="card w-full md:w-64 bg-pastel shadow-xl">
						<div className="card-body items-center text-center">
							<h2 className="card-title text-purple-600">I'm in Need</h2>
							<p>Raise a request for help and connect with nearby donors.</p>
							<div className="card-actions mt-4">
								<NeedyLoginDialog
									label="Login as Needy"
									userRole="needy"
									darkColor={darkPurple}
									lightColor={lightPurple}
								/>
							</div>
							<div className="flex gap-1 text-xs text-center mt-2">
								<p>New User?</p>
								<span>
									<SideDrawer
										label="Sign up"
										userRole="needy"
										darkColor={darkPurple}
										lightColor={lightPurple}
									/>
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* <p className="mt-10 text-xs text-gray-400">
					An initiative inspired by the Teaching of Prophet Muhammad (PBUH)
				</p> */}
			</div>
		</div>
	);
};

export default LandingPage;
