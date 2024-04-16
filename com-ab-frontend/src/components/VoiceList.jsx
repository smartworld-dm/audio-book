import React, { useContext, useEffect, useState } from "react";
import {
	Box,
	HStack,
	IconButton,
	Spacer,
	Tag,
	VStack,
	useDisclosure,
	ModalBody,
	Modal,
	ModalFooter,
	Button,
	ModalHeader,
	ModalContent,
	ModalCloseButton,
	ModalOverlay,
	SimpleGrid,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	Input,
	Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlay } from "react-icons/fa";
import { ColorUtils } from "../utils/CanvasColorUtil";
import { BookContext } from "../providers/BookContextProvider";

function VoiceList() {
	const [voices, setVoices] = useState([]);
	const { characters, setCharacters } = useContext(BookContext);
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [newName, setNewName] = useState("");
	const { genRandomColor } = ColorUtils();
	const [isNew, setIsNew] = useState(true);
	const [voiceListIdx, setVoiceListIdx] = useState("0");
	const [editingCharacterIdx, setEditingCharacterIdx] = useState(0);

	useEffect(() => {
		if (!isLoading) loadVoices();
	}, []);

	const loadVoices = () => {
		setIsLoading(true);
		const apiUrl = process.env.REACT_APP_API_URL;

		axios
			.get(`${apiUrl}voices`)
			.then((response) => {
				if (response.data.success) {
					setVoices(response.data.voices);
				} else {
					setVoices([]);
				}
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	const handleVoiceSelect = (e) => {
		console.log(e);
		setVoiceListIdx(e);
	};

	const handleCheckVoice = (voiceId) => {
		const audioUrl = voices[voiceId]["preview_url"];
		const audio = new Audio(audioUrl);
		audio.play();
	};

	const handleSaveCharacter = () => {
		if (isNew) {
			// Add character logic here
			const voice = voices[voiceListIdx];
			const newCharacters = [...characters];
			newCharacters.push({
				name: newName,
				voice_id: voice.voice_id,
				voice_name: voice.name,
				voice_url: voice.preview_url,
				tag_color: genRandomColor(),
			});
			setCharacters(newCharacters);

			onClose();
		} else {
			const voice = voices[voiceListIdx];

			const newCharacter = characters[editingCharacterIdx];
			const newCharacters = [...characters];
			newCharacters[editingCharacterIdx] = {
				...newCharacter,
				name: newName,
				voice_id: voice.voice_id,
				voice_name: voice.name,
				voice_url: voice.preview_url,
			};
			setCharacters(newCharacters);

			onClose();
		}
	};

	const handleRemoveCharacter = () => {
		// Remove from list
		// Remove from book
	};

	const handleEditCharacter = (characterIdx) => {
		setIsNew(false);
		onOpen();

		const character = characters[characterIdx];
		console.log(character);
		// setSelectedVoiceIdx(`${character["voice_id"]}`);
		setNewName(character["name"]);
	};

	return (
		<Box w={"full"}>
			<VStack
				gap={2}
				align={"start"}
			>
				{characters &&
					characters.length &&
					characters.map((character, index) => (
						<Box
							key={index}
							w={"full"}
						>
							<HStack gap={4}>
								<Tag>{character.name}</Tag>
								<Spacer />
								<IconButton
									icon={<FaTrash />}
									size={"xs"}
									onClick={handleRemoveCharacter}
								/>
								<IconButton
									icon={<FaEdit />}
									size={"xs"}
									onClick={() => handleEditCharacter(index)}
								/>
							</HStack>
						</Box>
					))}
			</VStack>
			<HStack mt={4}>
				<Button
					size={"md"}
					w={"full"}
					colorScheme="orange"
					onClick={() => {
						setNewName("");
						setIsNew(true);
						onOpen();
					}}
				>
					Add New Character
				</Button>
			</HStack>
			<Modal
				onClose={onClose}
				isOpen={isOpen}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Voice & Character</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack
							align={"start"}
							w={"full"}
						>
							<FormControl>
								<FormLabel>Character Name</FormLabel>
								<Input
									defaultValue={newName}
									onChange={(e) => setNewName(e.target.value)}
								></Input>
							</FormControl>
							<FormControl>
								<FormLabel>Character Voice</FormLabel>
								<RadioGroup
									onChange={handleVoiceSelect}
									value={voiceListIdx}
									w={"full"}
								>
									<Stack
										maxH={"400px"}
										overflowY={"scroll"}
										gap={4}
										id="voice-list"
										direction={"column"}
									>
										{voices &&
											voices.length &&
											voices.map((voice, index) => (
												<HStack
													px={4}
													key={index}
												>
													<Radio
														value={`${index}`}
														colorScheme="orange"
													>
														{voice.name}
													</Radio>
													<Spacer />
													<IconButton
														size={"sm"}
														colorScheme="orange"
														icon={<FaPlay />}
														onClick={() =>
															handleCheckVoice(
																index
															)
														}
													/>
												</HStack>
											))}
									</Stack>
								</RadioGroup>
							</FormControl>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="orange"
							onClick={handleSaveCharacter}
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

export default VoiceList;
