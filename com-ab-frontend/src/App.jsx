import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Body from "./layout/Body";
import { Container } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
function App() {
	return (
		<Container
			className="App"
			maxW={"100%"}
			w={"100%"}
			// bg={"gray.50"}
			m={0}
			p={0}
		>
			<BrowserRouter>
				<Header />
				<Body />
				<Footer />
			</BrowserRouter>
		</Container>
	);
}

export default App;
