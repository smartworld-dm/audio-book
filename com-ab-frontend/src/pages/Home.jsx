import React from "react";
import { Box, VStack, Text, Image, Button } from "@chakra-ui/react";
import audiobook from "../assets/imgs/audiobook.webp";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
function Home() {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleGen = () => {
		if (user && user.email) navigate("/edit");
		else navigate("/login");
	};
	return (
		<Box p={4}>
			<VStack>
				<Image src={audiobook} />
				<Text
					fontSize={24}
					align={"center"}
				>
					You can get your favorite books in audio format here
				</Text>
				<Button
					colorScheme="orange"
					onClick={handleGen}
				>
					Get Started
				</Button>
			</VStack>
		</Box>
	);
}

export default Home;
