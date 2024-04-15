import React from "react";
import {
	Box,
	Button,
	Container,
	HStack,
	Input,
	VStack,
} from "@chakra-ui/react";

function Sections() {
	const fileInputRef = React.useRef(null);
	const handleNewSection = () => {
        
    };

	const handleOpenFile = () => {
		fileInputRef.current.click();
	};

	const processFileLoad = (e) => {
		const file = fileInputRef.current.files[0];
		// if (!file) {
		// 	alert("No file selected.");
		// 	return;
		// }
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

	return (
		<Box>
			<VStack align={"start"}>
				<HStack>
					<Button
						colorScheme="orange"
						onClick={handleNewSection}
					>
						Create New Section
					</Button>
					<Button
						colorScheme="orange"
						onClick={handleOpenFile}
					>
						Load From File
					</Button>
				</HStack>
				<Input
					type="file"
					ref={fileInputRef}
					visibility={"hidden"}
                    onChange={processFileLoad}
				/>
			</VStack>
		</Box>
	);
}

export default Sections;
