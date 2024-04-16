import React, { useContext, useState } from "react";
import {
	Card,
	CardHeader,
	HStack,
	Text,
	Input,
	Spacer,
	IconButton,
	useColorModeValue,
} from "@chakra-ui/react";
import { FaEdit, FaSave } from "react-icons/fa";
import { BookContext } from "../providers/BookContextProvider";

function SectionItem(props) {
	const { sections, setSections } = useContext(BookContext);
	const [modifyTitle, setModifyTitle] = useState("");
	const [isModifyingTitle, setIsModifyingTitle] = useState(false);
	const section = props.section;
	const themeColor = useColorModeValue("blue.400", "orange.300");
	const profileColor = useColorModeValue("gray.400", "blue.900");
	const sectionId = props.id;
	const currentSectionId = props.current;
	const onSelect = () => {
		props.onSelect(sectionId);
	};

	const onEditTitle = () => {
		const newSections = [...sections];
		newSections[sectionId] = {
			...newSections[sectionId],
			title: modifyTitle,
		};
		setSections(newSections);
	};

	const handleModifyTitle = () => {
		setIsModifyingTitle(true);
	};

	return (
		<Card
			w={"full"}
			onClick={onSelect}
		>
			<CardHeader
				bg={currentSectionId === sectionId ? profileColor : {}}
				borderRadius={"lg"}
				border={ currentSectionId === sectionId ? "1px" : "0px"}
			>
				<HStack gap={4}>
					{!isModifyingTitle && (
						<Text
							color={themeColor}
							fontWeight={
								currentSectionId === sectionId ? 800 : 400
							}
						>
							{section.title}
						</Text>
					)}
					{isModifyingTitle && (
						<Input
							onChange={(e) => setModifyTitle(e.target.value)}
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

					{/* <IconButton
						size={"sm"}
						icon={<FaBookOpen />}
					/> */}
				</HStack>
			</CardHeader>
		</Card>
	);
}

export default SectionItem;
