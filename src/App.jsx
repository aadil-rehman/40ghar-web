import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import DonorDashboard from "./components/DonorDashboard";
import NeedyDashboard from "./components/NeedyDashboard";
import LandingPage from "./components/LandingPage";
import MyRequests from "./components/MyRequests";
import { Provider } from "react-redux";
import { store } from "./utils/store";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AppLayout />}>
						<Route path="/" element={<LandingPage />} />
						<Route path="/needy" element={<NeedyDashboard />} />
						<Route path="/donor/requests" element={<DonorDashboard />} />
						<Route path="/myRequests" element={<MyRequests />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
