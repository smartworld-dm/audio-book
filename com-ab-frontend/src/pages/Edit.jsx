import {
	Box,
	Grid,
	GridItem,
	useColorModeValue,
} from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EditorSidebar from "../components/EditorSidebar";
import Editor from "../components/Editor";
import { AuthContext } from "../providers/AuthProvider";
import { BookContext } from "../providers/BookContextProvider";

function Edit() {
	const themeColor = useColorModeValue("orange.400", "orange.300");
	const { onSaveBook } = useContext(BookContext);
	const {user} = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(()=>{
		if (!user) {
			navigate("/login");
		}
	}, [user])

	const saveBook = useCallback(()=> {
		onSaveBook();
	}, []);

	return (
		<Box
			w={"full"}
		>
			<Grid
				h="800px"
				templateColumns="repeat(10, 1fr)"
				gap={4}
			>
				<GridItem
					colSpan={3}
					border={"1px"}
					borderLeft={"none"}
					borderTop={"none"}
					borderBottom={"none"}
					borderColor={themeColor}
				>
					<EditorSidebar  saveBook={saveBook}/>
				</GridItem>
				<GridItem
					colSpan={7}
					pt={8}
				>
					<Editor/>
				</GridItem>
			</Grid>
		</Box>
	);
}

export default Edit;
