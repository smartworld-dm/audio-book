import {
	ListItem,
	Box,
	Card,
	HStack,
	Text,
	Spacer,
	ButtonGroup,
	IconButton,
	Link,
	useDisclosure,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalOverlay,
	ModalFooter,
	Modal, Button
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/react";
import { useContext } from "react";
import { BookContext } from "../providers/BookContextProvider";
function BookItem(props) {
	const bookTitleColor = useColorModeValue("gray.600", "gray.200");
	const {onReset, onOpenBook, onRemoveBook} = useContext(BookContext);
	const { isOpen: isRemoveOpen, onOpen: onRemoveOpen, onClose: onRemoveClose } = useDisclosure();
	const handleOpenBook = () => {
		onReset();
		onOpenBook(props.book);
	};

	const handleRemoveBook = ()=>{
		onRemoveOpen();
	}

	const removeBook = () => {
		onReset();
		onRemoveBook(props.book);
		onRemoveClose();
	}

	return (
		<ListItem mb={4}>
			<Box>
				<Card
					shadow={"xs"}
					_hover={{ shadow: "lg" }}
					p={2}
				>
					<HStack pl={4}>
						<Link
							onClick={handleOpenBook}
							_hover={{ color: bookTitleColor }}
						>
							<Text
								fontSize={16}
								fontWeight={500}
								color={bookTitleColor}
							>
								{props.book.title}
							</Text>
						</Link>
						<Spacer />
						<ButtonGroup>
							{/* <IconButton
								icon={<FaEdit />}
								size={"sm"}
								colorScheme="blue"
							/> */}
							{/* <IconButton icon={<FaEdit/>} size={'sm'}/> */}
							{/* <IconButton icon={<FaBookOpen/>} size={'sm'} onClick={handleOpenBook} colorScheme="orange"/> */}
							{/* <IconButton
								icon={<FaDownload />}
								size={"sm"}
								colorScheme="green"
							/> */}
							<IconButton
								icon={<FaTrash />}
								size={"sm"}
								colorScheme="red"
								onClick={handleRemoveBook}
							/>
						</ButtonGroup>
					</HStack>
				</Card>
			</Box>
			<Modal
				onClose={onRemoveClose}
				isOpen={isRemoveOpen}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Remove Book</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Are you sure you want to remove this book?</Text>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="red"
							onClick={removeBook}
						>
							Remove
						</Button>
						<Spacer />
						<Button onClick={onRemoveClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</ListItem>
	);
}

export default BookItem;
