import { Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Edit from "../pages/Edit";

function Body() {
	return (
		<Box className="App-body" minH={700}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/edit"
						element={<Edit />}
					/>
				</Routes>
			</BrowserRouter>
		</Box>
	);
}

export default Body;