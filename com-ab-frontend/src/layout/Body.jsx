import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Books from "../pages/Books";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
				<Route
					path="/register"
					element={<Register/>}
				/>
			</Routes>
		</Box>
	);
}

export default Body;