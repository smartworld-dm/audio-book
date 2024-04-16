import React, { useContext, useEffect, useState } from "react";
import {
	Box,
	VStack,
	Input,
	List,
	HStack,
	Spacer,
	Button
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import BookItem from "../components/BookItem";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { BookContext } from "../providers/BookContextProvider";
function Books() {
	const themeColor = useColorModeValue("orange.400", "orange.300");
	const { onNewBook, onLoadBooks, onReset, isLoading } = useContext(BookContext);
	const navigate = useNavigate();
	const [loaded, setLoaded] = useState(false);
	const [books, setBooks] = useState([]);
	const { user } = useContext(AuthContext);

	const loadBooks = () => {
		setLoaded(true);
		onReset();
		onLoadBooks().then((response) => {
			if (response.data.success) {
				setBooks(response.data.data.documents);
				console.log(response.data.data.documents);
			} else {
				setBooks([]);
			}
		})
		.catch((e) => console.log(e))
		.finally(() => setLoaded(false));
	};

	const handleNewBook = () => {
		onReset();
		if (user && user.email) {
			onNewBook();
		} else navigate("/login");
	};

	useEffect(() => {
		if (!user) navigate("/login");
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
					<Box mt={8}>
						{books && books.length > 0 && (
							<List>
								{books.map((book, index) => (
									<BookItem
										book={book}
										key={index}
									/>
								))}
							</List>
						)}
					</Box>
				</Box>
			</VStack>
		</Box>
	);
}

export default Books;
