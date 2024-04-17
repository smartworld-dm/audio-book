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
import {
	FaEdit,
	FaPlayCircle,
	FaSave,
	FaStop,
	FaTrash,
} from "react-icons/fa";
import { BookContext } from "../providers/BookContextProvider";
const audioUrl = process.env.REACT_APP_AUDIO_URL;
function SectionItem(props) {

	const { sections, setSections, currentBookIdx } = useContext(BookContext);
	const [modifyTitle, setModifyTitle] = useState("");
	const [isModifyingTitle, setIsModifyingTitle] = useState(false);
	const [isPlayingAudio, setIsPlayingAudio] = useState(false);
	const [sectionAudio, setSectionAudio] = useState(null);
	const section = props.section;
	const themeColor = useColorModeValue("blue.400", "orange.300");
	const profileColor = useColorModeValue("gray.400", "blue.900");
	const sectionId = props.id;
	const currentSectionId = props.current;
	const onSelect = () => {
		props.onSelect(sectionId);
	};

	const onEditTitle = () => {
		console.log(modifyTitle)
		const newSections = [...sections];
		newSections[sectionId] = {
			...newSections[sectionId],
			title: modifyTitle,
		};
		setSections(newSections);
	};

	const handleModifyTitle = () => {
		setModifyTitle(section.title);
		setIsModifyingTitle(true);
	};

	const handlePlayAudio = () => {
		const url = `${audioUrl}${currentBookIdx}/${section.audio}`;
		let audio;
		try {
			audio = new Audio(url);
			audio.onended = () => {
				setIsPlayingAudio(false);
				console.log("Ended");
			};

			setSectionAudio(audio);

			if (!isPlayingAudio) {
				sectionAudio.play();
				setIsPlayingAudio(true);
			} else {
				sectionAudio.pause();
				setIsPlayingAudio(false);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Card
			w={"full"}
			onClick={onSelect}
		>
			<CardHeader
				bg={currentSectionId === sectionId ? profileColor : {}}
				borderRadius={"lg"}
				border={currentSectionId === sectionId ? "1px" : "0px"}
			>
				<HStack gap={2}>
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
					{section.audio && section.audio.length > 0 && (
						<IconButton
							size={"sm"}
							icon={
								!isPlayingAudio ? <FaPlayCircle /> : <FaStop />
							}
							onClick={handlePlayAudio}
						/>
					)}
					<IconButton
						size={"sm"}
						colorScheme="red"
						icon={<FaTrash />}
						onClick={props.onRemove}
					/>
				</HStack>
			</CardHeader>
			
		</Card>
	);
}

export default SectionItem;
