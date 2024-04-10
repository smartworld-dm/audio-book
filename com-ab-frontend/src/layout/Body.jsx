import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Books from "../pages/Books";
import Login from "../pages/Login";

function Body() {
	return (
		<Box className="App-body" minH={700}>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/edit"
					element={<Edit />}
				/>
				<Route
					path="/books"
					element={<Books/>}
				/>
				<Route
					path="/login"
					element={<Login/>}
				/>
			</Routes>
		</Box>
	);
}

export default Body;