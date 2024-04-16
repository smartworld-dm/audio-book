import React from "react";
import { Box, VStack, Text, Image, Button } from "@chakra-ui/react";
import audiobook from "../assets/imgs/audiobook.webp";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { BookContext } from "../providers/BookContextProvider";
function Home() {
	const { user } = useContext(AuthContext);
	const { onNewBook, isLoading } = useContext(BookContext);
	const navigate = useNavigate();
	const handleNewBook = () => {
		if (user && user.email) {
			onNewBook();
		} else navigate("/login");
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
					onClick={handleNewBook}
					isLoading={isLoading}
				>
					Get Started
				</Button>
			</VStack>
		</Box>
	);
}

export default Home;
