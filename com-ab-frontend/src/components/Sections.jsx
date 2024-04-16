import React, { useContext, useEffect, useState } from "react";
import {
	Box,
	Button,
	Input,
	VStack,
	Modal,
	useDisclosure,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalOverlay,
	ModalFooter,
	Spacer,
} from "@chakra-ui/react";
import { BookContext } from "../providers/BookContextProvider";

import SectionItem from "./SectionItem";
import { EditContext } from "../providers/EditContextProvider";

function Sections() {
	const fileInputRef = React.useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [newSectionTitle, setNewSectionTitle] = useState("");
	const { sections, setSections, onSaveBook, isLoading } =
		useContext(BookContext);

	const {currentSectionId, setCurrentSectionId} = useContext(EditContext);

	const openNewSectionModal = () => {
		onOpen();
	};

	const onSaveSection = () => {
		const newSections = [...sections];
		if (newSectionTitle.length !== 0) {
			newSections.push({
				title: newSectionTitle,
			});
		} else {
			newSections[currentSectionId] = {
				...newSections[currentSectionId],
				title: newSectionTitle,
			};
		}
		setSections(newSections);
		onClose();
	};

	const handleOpenFile = () => {
		fileInputRef.current.click();
	};

	const processFileLoad = (e) => {
		const file = fileInputRef.current.files[0];

		if (file.type !== "text/plain") {
			alert("Please select a text file.");
			return;
		}
		const reader = new FileReader();
		reader.onload = async (e) => {
			// const content = e.target.result;
		};
		reader.readAsText(file);
	};

	const handleSaveBook = () => {
		onSaveBook();
	};

	const handleSelectSection = (_sectionId) => {
		setCurrentSectionId(_sectionId);
	};

	useEffect(() => {
		if (sections.length > 0) {
			// console.log(sections);
		}
	}, [sections]);

	return (
		<Box w={"full"}>
			<VStack align={"start"}>
				{sections && sections.length > 0 ? (
					<VStack
						w={"full"}
						align={"start"}
					>
						{sections &&
							sections.map((section, index) => (
								<SectionItem
									key={index}
									id={index}
									section={section}
									onSelect={handleSelectSection}
									current={currentSectionId}
								/>
							))}

						<Button
							colorScheme="orange"
							onClick={openNewSectionModal}
							w={"full"}
						>
							Create New Section
						</Button>

						<Button
							colorScheme="green"
							onClick={handleSaveBook}
							w={"full"}
							mt={8}
							isLoading={isLoading}
						>
							Save Book
						</Button>
					</VStack>
				) : (
					<VStack w={"full"}>
						<Button
							colorScheme="orange"
							onClick={openNewSectionModal}
							w={"full"}
						>
							Create New Section
						</Button>
						<Button
							colorScheme="orange"
							onClick={handleOpenFile}
							w={"full"}
						>
							Load From File
						</Button>
					</VStack>
				)}
				<Input
					type="file"
					ref={fileInputRef}
					visibility={"hidden"}
					onChange={processFileLoad}
				/>
			</VStack>
			<Modal
				onClose={onClose}
				isOpen={isOpen}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create New Section</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input
							placeholder="Input new section title"
							onChange={(e) => setNewSectionTitle(e.target.value)}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="orange"
							onClick={onSaveSection}
						>
							Save
						</Button>
						<Spacer />
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
}

export default Sections;
