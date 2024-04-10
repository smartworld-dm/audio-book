import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Body from "./layout/Body";
import { Container, Image } from "@chakra-ui/react";

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
			<Header />
			<Body />
			<Footer />
		</Container>
	);
}

export default App;
