import React, { useContext, useEffect, useState } from "react";
import {
	Box,
	Button,
	HStack,
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
	Card,
	CardHeader,
	IconButton,
	Text,
} from "@chakra-ui/react";
import { BookContext } from "../providers/BookContextProvider";
import { FaBookOpen, FaEdit, FaSave } from "react-icons/fa";

function Sections(props) {
	const fileInputRef = React.useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { sections, setSections } = useContext(BookContext);
	const [sectionTitle, setSectionTitle] = useState("");
	const [modifyTitle, setModifyTitle] = useState("");
	const [isModifyingTitle, setIsModifyingTitle] = useState(false);
	const [currentSectionId, setCurrentSectionId] = useState(0);
	const openNewSectionModal = () => {
		onOpen();
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
			const content = e.target.result;
		};
		reader.readAsText(file);
	};

	const onSaveSection = () => {
		const newSections = [...sections];
		if (sectionTitle.length !== 0) {
			newSections.push({
				title: sectionTitle,
			});
		} else {
			newSections[currentSectionId] = {
				...newSections[currentSectionId],
				title: sectionTitle,
			};
		}
		setSections(newSections);
		onClose();
	};

	const onEditTitle = () => {
		const newSections = [...sections];
		newSections[currentSectionId] = {
			...newSections[currentSectionId],
			title: modifyTitle,
		};
		setSectionTitle(modifyTitle);
		setSections(newSections);
	};

	const handleSaveBook = () => {
		props.saveBook();
		// console.log(sections)
	};

	const handleModifyTitle = () => {
		setIsModifyingTitle(true);
	};

	useEffect(() => {
		if (sections.length > 0) {
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
						{sections.map((section, index) => (
							<Card
								key={index}
								w={"full"}
							>
								<CardHeader>
									<HStack gap={4}>
										{!isModifyingTitle && (
											<Text>{section.title}</Text>
										)}
										{isModifyingTitle && (
											<Input
												onChange={(e) =>
													setModifyTitle(
														e.target.value
													)
												}
												defaultValue={section.title}
											/>
										)}
										<Spacer />

										{!isModifyingTitle && (
											<IconButton
												size={"sm"}
												icon={<FaEdit />}
												onClick={handleModifyTitle}
											/>
										)}
										{isModifyingTitle && (
											<IconButton
												size={"sm"}
												icon={<FaSave />}
												onClick={() => {
													onEditTitle();
													setIsModifyingTitle(false);
												}}
											/>
										)}

										<IconButton
											size={"sm"}
											icon={<FaBookOpen />}
										/>
									</HStack>
								</CardHeader>
								{/* <CardBody></CardBody> */}
							</Card>
						))}

						<Button
							colorScheme="orange"
							onClick={openNewSectionModal}
							w={"full"}
						>
							Create New Section
						</Button>

						<Button
							colorScheme="orange"
							onClick={handleSaveBook}
							w={"full"}
							mt={8}
						>
							Save Book
						</Button>
					</VStack>
				) : (
					<VStack w={'full'}>
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
							onChange={(e) => setSectionTitle(e.target.value)}
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
