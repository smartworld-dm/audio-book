import React, { useContext, useEffect, useState } from "react";
import {
	Box,
	VStack,
	Input,
	List,
	HStack,
	Spacer,
	Button,
	useToast,
	Container,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import BookItem from "../components/BookItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { BookContext } from "../providers/BookContextProvider";
function Books() {
	const themeColor = useColorModeValue("orange.400", "orange.300");
	const { setBookIdx, onNewBook } = useContext(BookContext);
	const navigate = useNavigate();
	const [loaded, setLoaded] = useState(false);
	const [newBookCreating, setNewBookCreating] = useState(false);
	const [books, setBooks] = useState([]);
	const toast = useToast();
	const { user } = useContext(AuthContext);

	const loadBooks = () => {
		setLoaded(true);
		const apiUrl = process.env.REACT_APP_API_URL;
		axios
			.get(`${apiUrl}books?user=${user.email}`)
			.then((response) => {
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
		if (user && user.email) {
			onNewBook(setNewBookCreating);
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
							isLoading={newBookCreating}
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
