import {
	Box,
	Grid,
	GridItem,
	useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

import EditorSidebar from "../components/EditorSidebar";
import Editor from "../components/Editor";

function Edit() {
	const themeColor = useColorModeValue("orange.400", "orange.300");

	return (
		<Box
			// px={10}
			// border={"1px"}
			// borderLeft={"none"}
			// borderRight={"none"}
			// borderBottom={"none"}
			// borderColor={themeColor}
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
					// pl={10}
				>
					<EditorSidebar/>
				</GridItem>
				<GridItem
					colSpan={7}
					pt={8}
					// pr={10}
				>
					<Editor/>
				</GridItem>
			</Grid>
		</Box>
	);
}

export default Edit;
