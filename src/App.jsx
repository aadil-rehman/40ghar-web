import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}>
					<Route path="/" element={<h2>hoo</h2>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
