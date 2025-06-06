import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import DonorDashboard from "./components/DonorDashboard";
import NeedyDashboard from "./components/NeedyDashboard";
import LandingPage from "./components/LandingPage";
import MyRequests from "./components/MyRequests";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AppLayout />}>
						<Route path="/" element={<LandingPage />} />
						<Route
							path="/needy"
							element={
								<ProtectedRoutes allowedRoles={["needy"]}>
									<NeedyDashboard />
								</ProtectedRoutes>
							}
						/>
						<Route
							path="/donor/requests"
							element={
								<ProtectedRoutes allowedRoles={["donor"]}>
									<DonorDashboard />
								</ProtectedRoutes>
							}
						/>
						<Route
							path="/myRequests"
							element={
								<ProtectedRoutes allowedRoles={["needy"]}>
									<MyRequests />
								</ProtectedRoutes>
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
