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
	const [currentBookIdx, setCurrentBookIdx] = useState(""); // Currently Editing book idx
	const [currentBookTitle, setCurrentBookTitle] = useState(""); // Currently Editing Book Title
	const [sections, setSections] = useState([]); // Currently Editing book sections
	const [characters, setCharacters] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const { cookieAlive } = useContext(AuthContext);
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
		setCharacters([]);
	};

	const onOpenBook = (book) => {
		try {
			setIsLoading(true);
			axios
				.get(`${apiUrl}book?user=${cookieAlive()}&id=${book._id}`)
				.then((response) => {
					if (response.data.success) {
						toast({
							title: "Load Book",
							description: `${response.data.message}.`,
							status: "success",
							duration: 3000,
							isClosable: true,
						});
						console.log(response.data)
						setCurrentBookIdx(response.data.data._id);
						try {
							const sectiondata = JSON.parse(response.data.data.sections);
							setSections(sectiondata);
						} catch {}

						try {
							const characterdata = JSON.parse(response.data.data.characters);
							setCharacters(characterdata);
						} catch {}
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
					email: cookieAlive(),
					id: currentBookIdx,
					title: currentBookTitle,
					sections: JSON.stringify(sections),
					characters: JSON.stringify(characters)
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
					email: cookieAlive(),
				})
				.then((response) => {
					if (response.data.success) {
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
		return axios.get(`${apiUrl}books?user=${cookieAlive()}`);
	};

	const getCurrentSectionTitle = (sectionId)=> {
		if (sections.length > 0) {
			return sections[sectionId]['title']
		}

		return "";
	}

	const findLastCharacter = (sectionId)=>{
		let result = 0;

        if (sections.length > 1){
            for(let idx = sectionId - 1; idx >= 0; idx--){
                let ops = sections[idx].content['ops'];
                for(let i = ops.length - 1; i >= 0; i --){
                    const op = ops[i];
                    if (op.hasOwnProperty('attributes') && op['insert'].hasOwnProperty('customImage')){
                        if (op['insert']['customImage'].hasOwnProperty('character'))
                        {
                            result = op['insert']['customImage']['character'];
                            break;
                        }
                    }
                }
            }
        }

        return result;
	}

	const onGenerateSectionAudio = (sectionId, action)=>{
		try {
			setIsLoading(true);
			axios
				.post(`${apiUrl}audio/generate`, {
					'section_id': sectionId,
					'section': JSON.stringify(sections[sectionId]),
					'characters': JSON.stringify(characters),
					'last_character': findLastCharacter(sectionId),
					'_id': currentBookIdx,
					'action': action
				})
				.then((response) => {
					if (response.data.success) {
						toast({
							title: "Generate Section Audio",
							description: `${response.data.message}. Please don't forget to save your book.`,
							status: "success",
							duration: 3000,
							isClosable: true,
						});
						const newSections = [...sections];
						newSections[sectionId]['audio'] = response.data.audio;
						console.log(newSections)
						setSections(newSections);
					} else {
						toast({
							title: "Generate Section Audio",
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
	}

	return (
		<BookContext.Provider
			value={{
				isLoading,
				currentBookIdx,
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
				onGenerateSectionAudio,

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
