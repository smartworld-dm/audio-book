import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalFooter,
	ModalBody,
	Button,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const BookContext = createContext();
const apiUrl = process.env.REACT_APP_API_URL;
const BookContextProvider = ({ children }) => {
	const [currentBookIdx, setCurrentBookIdx] = useState(); // Currently Editing book idx
	const [currentBookTitle, setCurrentBookTitle] = useState(""); // Currently Editing Book Title
	const [sections, setSections] = useState([]); // Currently Editing book sections
	const [characters, setCharacters] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useContext(AuthContext);
	const toast = useToast();
	const navigate = useNavigate();

	const onLoading = () => {
		onOpen();
	};
	const onLoaded = () => {
		onClose();
	};

	const onReset = () => {
		setIsLoading(false);
		setCurrentBookIdx("");
		setCurrentBookTitle("");
		setSections([]);
	};

	const onOpenBook = (book) => {
		try {
			setIsLoading(true);
			axios
				.get(`${apiUrl}book?user=${user.email}&id=${book._id}`)
				.then((response) => {
					if (response.data.success) {
						toast({
							title: "Load Book",
							description: `${response.data.message}.`,
							status: "success",
							duration: 3000,
							isClosable: true,
						});
						setCurrentBookIdx(response.data.data._id);
						setSections(JSON.parse(response.data.data.sections));
						setCurrentBookTitle(response.data.data.title);
						navigate("/edit");
					} else {
						toast({
							title: "Load Book",
							description: `${response.data.message}.`,
							status: "error",
							duration: 3000,
							isClosable: true,
						});
					}
				})
				.catch((e) => console.log(e))
				.finally(() => {
					setIsLoading(false);
				});
		} catch {
			setIsLoading(false);
		}
	};

	const onSaveBook = () => {
		try {
			setIsLoading(true);
			axios
				.post(`${apiUrl}save_book`, {
					email: user.email,
					id: currentBookIdx,
					title: currentBookTitle,
					sections: JSON.stringify(sections),
				})
				.then((response) => {
					if (response.data.success) {
						toast({
							title: "Save Book",
							description: `${response.data.message}.`,
							status: "success",
							duration: 3000,
							isClosable: true,
						});
					} else {
						toast({
							title: "Save Book",
							description: `${response.data.message}.`,
							status: "error",
							duration: 3000,
							isClosable: true,
						});
					}
				})
				.catch((e) => console.log(e))
				.finally(() => {
					setIsLoading(false);
				});
		} catch {
			setIsLoading(false);
		}
	};

	const onNewBook = () => {
		try {
			setIsLoading(true);
			axios
				.post(`${apiUrl}create_book`, {
					email: user.email,
				})
				.then((response) => {
					if (response.data.success) {
						console.log(response.data);
						setCurrentBookIdx(response.data.data);
						setCurrentBookTitle("Untitled");

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
				.finally(() => {
					setIsLoading(false);
				});
		} catch {
			setIsLoading(false);
		}
	};

	const onLoadBooks = async () => {
		return axios.get(`${apiUrl}books?user=${user.email}`);
	};

	const getCurrentSectionTitle = (sectionId)=> {
		if (sections.length > 0) {
			return sections[sectionId]['title']
		}

		return "";
	}

	return (
		<BookContext.Provider
			value={{
				isLoading,
				setCurrentBookIdx,
				sections,
				setSections,
				currentBookTitle,
				setCurrentBookTitle,
				characters,
				setCharacters,

				onLoading,
				onLoaded,
				onReset,
				onSaveBook,
				onNewBook,
				onOpenBook,
				onLoadBooks,

				getCurrentSectionTitle
			}}
		>
			{children}
			<Modal
				isOpen={isOpen}
				// onClose={onClose}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Loading</ModalHeader>
					<ModalCloseButton />
					<ModalBody>Now loading</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</BookContext.Provider>
	);
};

export default BookContextProvider;
