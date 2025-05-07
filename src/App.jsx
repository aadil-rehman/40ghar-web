import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import DonorDashboard from "./components/DonorDashboard";
import NeedyDashboard from "./components/NeedyDashboard";
import LandingPage from "./components/LandingPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route path="/request/all" element={<DonorDashboard />} />
					<Route path="/needy" element={<NeedyDashboard />} />
					<Route path="/" element={<LandingPage />} />
				</Route>
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
