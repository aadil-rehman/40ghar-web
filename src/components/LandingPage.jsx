import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex items-center justify-center bg-base-100 px-6">
			<div className="text-center max-w-2xl">
				<h1 className="text-5xl font-bold text-primary mb-4">
					Welcome to 40 Ghar
				</h1>
				<p className="text-lg text-gray-600 mb-10">
					A compassionate platform where help meets those who need it the most.
				</p>

				<div className="flex flex-col md:flex-row gap-6 justify-center">
					<div className="card w-full md:w-64 bg-pastel shadow-xl">
						<div className="card-body items-center text-center">
							<h2 className="card-title text-secondary">I'm a Donor</h2>
							<p>View nearby help requests and support your community.</p>
							<div className="card-actions mt-4">
								<button
									className="btn btn-primary"
									onClick={() => navigate("/login/donor")}
								>
									Login as Donor
								</button>
							</div>
						</div>
					</div>

					<div className="card w-full md:w-64 bg-pastel shadow-xl">
						<div className="card-body items-center text-center">
							<h2 className="card-title text-secondary">I'm in Need</h2>
							<p>Raise a request for help and connect with nearby donors.</p>
							<div className="card-actions mt-4">
								<button
									className="btn btn-secondary"
									onClick={() => navigate("/login/needy")}
								>
									Login as Needy
								</button>
							</div>
						</div>
					</div>
				</div>

				<p className="mt-10 text-sm text-gray-400">
					An initiative inspired by the Teaching of Prophet Muhammad (PBUH)
				</p>
			</div>
		</div>
	);
};

export default LandingPage;
