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
	Text,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	Input,
	Stack,
	ButtonGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlay } from "react-icons/fa";
import { ColorUtils } from "../utils/CanvasColorUtil";
import { BookContext } from "../providers/BookContextProvider";
import { EditContext } from "../providers/EditContextProvider";

function VoiceList() {
	const [voices, setVoices] = useState([]);
	const { characters, setCharacters } = useContext(BookContext);
	const [isLoading, setIsLoading] = useState(false);
	const {
		isOpen: isVoiceOpen,
		onOpen: onVoiceOpen,
		onClose: onVoiceClose,
	} = useDisclosure();
	const {
		isOpen: isCharacterRemoveOpen,
		onOpen: onCharacterRemoveOpen,
		onClose: onCharacterRemoveClose,
	} = useDisclosure();
	const [newName, setNewName] = useState("");
	const { genRandomColor } = ColorUtils();
	const [isNew, setIsNew] = useState(true);
	const [voiceListIdx, setVoiceListIdx] = useState("0");
	const [editingCharacterIdx, setEditingCharacterIdx] = useState(0);
	const [removingCharacterIdx, setRemovingCharacterIdx] = useState(0);
	const { onInsertTag, onRemoveTag } = useContext(EditContext);

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
					if (characters.length == 0) {
						const newCharacters = [];
						const voice = response.data.voices[0];
						newCharacters.push({
							name: "Default",
							voice_id: voice.voice_id,
							voice_name: voice.name,
							voice_url: voice.preview_url,
							tag_color: genRandomColor(),
						});
						setCharacters(newCharacters);
					}
				} else {
					setVoices([]);
				}
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	const handleVoiceSelect = (e) => {
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

			const newCharacters =
				characters.length === 0 ? [] : [...characters];
			newCharacters.push({
				name: newName,
				voice_id: voice.voice_id,
				voice_name: voice.name,
				voice_url: voice.preview_url,
				tag_color: genRandomColor(),
			});
			setCharacters(newCharacters);

			onVoiceClose();
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
				tag_color: genRandomColor(),
			};
			setCharacters(newCharacters);
			onVoiceClose();
		}
	};

	const handleEditCharacter = (characterIdx) => {
		setIsNew(false);
		setEditingCharacterIdx(characterIdx);
		onVoiceOpen();

		const character = characters[characterIdx];
		setNewName(character["name"]);
		voices.map((voice, idx) => {
			if (voice.voice_id === character["voice_id"]) {
				setVoiceListIdx(`${idx}`);
			}
		});
	};

	const handleClickTag = (character, idx) => {
		onInsertTag(character, idx);
	};

	const handleRemoveCharacter = (characterIdx) => {
		// Remove from list
		// Remove from book
		setRemovingCharacterIdx(characterIdx);
		onCharacterRemoveOpen();
	};

	const removeTag = () => {
		onRemoveTag(removingCharacterIdx);
		const newCharacters = [...characters];
		newCharacters.splice(removingCharacterIdx, 1);
		setCharacters(newCharacters);
		onCharacterRemoveClose();
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
								<Tag
									bg={character.tag_color.background}
									onClick={() =>
										handleClickTag(character, index)
									}
								>
									<Text color={character.tag_color.text}>
										{character.name}
									</Text>
								</Tag>
								<Spacer />
								{index !== 0 && (
									<IconButton
										icon={<FaTrash />}
										size={"xs"}
										onClick={() =>
											handleRemoveCharacter(index)
										}
									/>
								)}

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
						onVoiceOpen();
					}}
				>
					Add New Character
				</Button>
			</HStack>
			<Modal
				onClose={onCharacterRemoveClose}
				isOpen={isCharacterRemoveOpen}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Remove Character</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>
							Are you sure you want to remove this character?
						</Text>
					</ModalBody>
					<ModalFooter>
						<ButtonGroup>
							<Button
								colorScheme="red"
								onClick={removeTag}
							>
								Sure
							</Button>
							<Button onClick={onCharacterRemoveClose}>
								Close
							</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Modal
				onClose={onVoiceClose}
				isOpen={isVoiceOpen}
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
														{/* ({voice.voice_id}) */}
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
						<Button onClick={onVoiceClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
}

export default VoiceList;
