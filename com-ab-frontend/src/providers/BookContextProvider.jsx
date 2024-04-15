import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, ModalBody, Button, useDisclosure } from "@chakra-ui/react";
import React, { createContext, useState } from "react";
export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
	const [bookIdx, setBookIdx] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const setBookId = ({ bookIdx }) => {
		setBookIdx(bookIdx);
	};

    const onLoading = () => { onOpen() };
    const onLoaded = () => {
        onClose();
    }

	return (
		<BookContext.Provider value={{setBookId, onLoading, onLoaded}}>
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
					<ModalBody>
                        bookIdx
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</BookContext.Provider>
	);
};

export default BookContextProvider;
