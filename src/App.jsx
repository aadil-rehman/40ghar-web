import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import DonorDashboard from "./components/DonorDashboard";
import NeedyDashboard from "./components/NeedyDashboard";
import LandingPage from "./components/LandingPage";
import MyRequests from "./components/MyRequests";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route path="/" element={<LandingPage />} />
					<Route path="/needy" element={<NeedyDashboard />} />
					<Route path="/request/all" element={<DonorDashboard />} />
					<Route path="/myRequests" element={<MyRequests />} />
				</Route>
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
