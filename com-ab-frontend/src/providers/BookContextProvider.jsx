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
	const [bookIdx, setBookIdx] = useState(); // Currently Editing book idx
	const [sections, setSections] = useState([]); // Currently Editing book sections
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isSaving, setIsSaving] = useState(false);
	const {user} = useContext(AuthContext);
	const toast = useToast();
	const navigate = useNavigate();

	const onLoading = () => {
		onOpen();
	};
	const onLoaded = () => {
		onClose();
	};

	const onReset = () => {
		setBookIdx("");
		setSections([]);
	};

	const onSaveBook = () => {
		try {
			setIsSaving(true);
			axios
				.post(`${apiUrl}save_book`, {
					email: user.email,
					id: bookIdx,
					sections: JSON.stringify(sections)
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
				.finally(() => {});
		} catch {

		}
	};

	const onNewBook = (setNewBookCreating) => {
		try {
			setNewBookCreating(true);
			axios
				.post(`${apiUrl}create_book`, {
					email: user.email,
				})
				.then((response) => {
					if (response.data.success) {
						console.log(response.data);
						setBookIdx(response.data.data);

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
	};

	const onGetBook = () => {

	}

	return (
		<BookContext.Provider
			value={{
				setBookIdx,
				sections,
				setSections,
				onLoading,
				onLoaded,
				onReset,
				onSaveBook,
				onNewBook
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
					<ModalBody>bookIdx</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</BookContext.Provider>
	);
};

export default BookContextProvider;
