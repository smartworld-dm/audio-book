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
	const { setBookId, onLoading, onLoaded } = useContext(BookContext);
	const toast = useToast();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const handleGen = () => {
		if (user && user.email) {
			const apiUrl = process.env.REACT_APP_API_URL;
			try {
				setIsLoading(true);
				axios
					.post(`${apiUrl}create_book`)
					.then((response) => {
						if (response.data.success) {
							console.log(response.data);
							setBookId(response.data.data);
							
							toast({
								title: "Create Book",
								description: `${response.data.message}.`,
								status: "success",
								duration: 3000,
								isClosable: true,
							});
							navigate("/edit");
						} else {
							toast({
								title: "Create Book",
								description: `${response.data.message}.`,
								status: "error",
								duration: 3000,
								isClosable: true,
							});
						}
					})
					.catch((e) => console.log(e))
					.finally(() => {});
			} catch {}
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
					onClick={handleGen}
				>
					Get Started
				</Button>
			</VStack>
		</Box>
	);
}

export default Home;
