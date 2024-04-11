import { ListItem, Box, Card, HStack, Text, Button, Spacer, ButtonGroup, IconButton } from "@chakra-ui/react";
import { FaDownload, FaBookOpen, FaEdit } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/react";
function BookItem() {
	const bookTitleColor = useColorModeValue("gray.600", "gray.200");
	return (
		<ListItem mb={4}>
			<Box>
				<Card
					shadow={"xs"}
					_hover={{ shadow: "lg" }}
					p={2}
				>
					<HStack pl={4}>
						<Text
							fontSize={16}
							fontWeight={500}
							color={bookTitleColor}
						>
							1
						</Text>
						<Spacer />
                        <ButtonGroup>
                            <IconButton icon={<FaDownload/>} size={'sm'}/>
                            {/* <IconButton icon={<FaEdit/>} size={'sm'}/> */}
                            <IconButton icon={<FaBookOpen/>} size={'sm'}/>
                        </ButtonGroup>
					</HStack>
				</Card>
			</Box>
		</ListItem>
	);
}

export default BookItem;
