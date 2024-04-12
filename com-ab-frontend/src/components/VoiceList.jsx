import React, { useEffect, useState } from "react";
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

function VoiceList() {
	const [voices, setVoices] = useState([]);
	const [characters, setCharacters] = useState([]);
	const [voiceIdx, setVoiceIdx] = useState("0");
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [newName, setNewName] = useState("");
	const { genRandomColor } = ColorUtils();
	useEffect(() => {
		if (!isLoading) loadVoices();
	}, []);

	const loadVoices = () => {
		setIsLoading(true);
		const apiUrl = process.env.REACT_APP_API_URL;

		axios
			.get(`${apiUrl}voices`)
			.then((response) => {
				console.log(response.data.success);
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
		setVoiceIdx(e);
	};

	const handleCheckVoice = (voiceId) => {
		const audioUrl = voices[voiceId]["preview_url"];
		const audio = new Audio(audioUrl);
		audio.play();
	};

	const handleAddCharacter = () => {
		// Add character logic here
		const voice = voices[voiceIdx];
		const new_characters = [...characters];
		new_characters.push({
			name: newName,
			voice_id: voice.voice_id,
			voice_name: voice.name,
			voice_url: voice.preview_url,
			tag_color: genRandomColor(),
		});
		setCharacters(new_characters);

		onClose();
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
								/>
								<IconButton
									icon={<FaEdit />}
									size={"xs"}
								/>
							</HStack>
						</Box>
					))}
			</VStack>
			<HStack>
				<Button
					size={"md"}
					w={"full"}
					colorScheme="orange"
					onClick={onOpen}
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
					<ModalHeader>Add Character</ModalHeader>
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
									value={voiceIdx}
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
							onClick={handleAddCharacter}
						>
							OK
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
