import React, { useContext, useEffect, useState } from "react";
import {
	Box,
	VStack,
	Input,
	List,
	HStack,
	Spacer,
	Button,
	Spinner,
	Center,
	Heading,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import BookItem from "../components/BookItem";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { BookContext } from "../providers/BookContextProvider";
function Books() {
	const themeColor = useColorModeValue("orange.400", "orange.300");
	const { books, setBooks, onNewBook, onLoadBooks, onReset, isLoading } =
		useContext(BookContext);
	const navigate = useNavigate();
	const [isBooksLoading, setIsBooksLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);
	
	const { user, cookieAlive } = useContext(AuthContext);

	const loadBooks = () => {
		setIsBooksLoading(true);
		setLoaded(true);
		onReset();
		onLoadBooks()
			.then((response) => {
				if (response.data.success) {
					setBooks(response.data.data.documents);
				} else {
					setBooks([]);
				}
			})
			.catch((e) => console.log(e))
			.finally(() => {
				setLoaded(false);
				setIsBooksLoading(false);
			});
	};

	const handleNewBook = () => {
		onReset();
		if (cookieAlive()) {
			onNewBook();
		} else navigate("/login");
	};

	useEffect(() => {
		if (!cookieAlive()) navigate("/login");
		else {
			if (!loaded) loadBooks();
		}
	}, []);

	return (
		<Box
			p={4}
			m={"auto"}
		>
			<VStack spacing={4}>
				<Box w={"60vw"}>
					<HStack>
						<Input placeholder="Search books..." />
						<Spacer></Spacer>
						<Button
							color={themeColor}
							isLoading={isLoading}
							onClick={handleNewBook}
						>
							New Book
						</Button>
					</HStack>
					<Box
						mt={8}
						w={"full"}
					>
						{isBooksLoading && (
							<Center>
								<Spinner
									thickness="4px"
									speed="1s"
									emptyColor="gray.200"
									color={themeColor}
									size="xl"
								/>
							</Center>
						)}
						{!isBooksLoading && books && books.length > 0 && (
							<List>
								{books.map((book, index) => (
									<BookItem
										book={book}
										key={index}
									/>
								))}
							</List>
						)}
						{!isBooksLoading && books && books.length === 0 && (
							<Heading>You haven't created any book.</Heading>
						)}
					</Box>
				</Box>
			</VStack>
		</Box>
	);
}

export default Books;
