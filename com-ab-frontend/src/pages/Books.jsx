import React from "react";
import {
	Box,
	VStack,
	Input,
	List,
    HStack,
    Spacer,
    Button,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import BookItem from "../components/BookItem";
import { useNavigate } from "react-router-dom";
function Books() {
    const themeColor = useColorModeValue("orange.400", "orange.300");
    const navigate = useNavigate();
	return (
		<Box
			p={4}
			m={"auto"}
		>
			<VStack spacing={4}>
                <Box  w={"60vw"}>
                <HStack>
					<Input placeholder="Search books..." />
                    <Spacer></Spacer>
                    <Button color={themeColor} onClick={()=>navigate("/edit")}>New Book</Button>
				</HStack>
				<Box mt={8}>
					<List>
						<BookItem/>
                        <BookItem/>
                        <BookItem/>
					</List>
				</Box>
                </Box>
			</VStack>
		</Box>
	);
}

export default Books;
