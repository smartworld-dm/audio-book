import React, { useState } from "react";
import { Box, VStack, Text, Image, Button, useToast } from "@chakra-ui/react";
import audiobook from "../assets/imgs/audiobook.webp";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { BookContext } from "../providers/BookContextProvider";
function Home() {
	const { user } = useContext(AuthContext);
	const { setBookIdx, onNewBook } = useContext(BookContext);
	const toast = useToast();
	const navigate = useNavigate();
	const [newBookCreating, setNewBookCreating] = useState(false);
	const handleNewBook = () => {
		if (user && user.email) {
			onNewBook(setNewBookCreating);
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
					isLoading={newBookCreating}
				>
					Get Started
				</Button>
			</VStack>
		</Box>
	);
}

export default Home;
