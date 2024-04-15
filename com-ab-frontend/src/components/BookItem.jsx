import {
	ListItem,
	Box,
	Card,
	HStack,
	Text,
	Button,
	Spacer,
	ButtonGroup,
	IconButton,
	Link,
} from "@chakra-ui/react";
import { FaDownload, FaBookOpen, FaEdit, FaTrash } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/react";
function BookItem(props) {
	const bookTitleColor = useColorModeValue("gray.600", "gray.200");
	const handleOpenBook = () => {
		console.log("aaa");
	};
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
							<IconButton
								icon={<FaEdit />}
								size={"sm"}
								colorScheme="blue"
							/>
							{/* <IconButton icon={<FaEdit/>} size={'sm'}/> */}
							{/* <IconButton icon={<FaBookOpen/>} size={'sm'} onClick={handleOpenBook} colorScheme="orange"/> */}
							<IconButton
								icon={<FaDownload />}
								size={"sm"}
								colorScheme="green"
							/>
							<IconButton
								icon={<FaTrash />}
								size={"sm"}
								colorScheme="red"
							/>
						</ButtonGroup>
					</HStack>
				</Card>
			</Box>
		</ListItem>
	);
}

export default BookItem;
