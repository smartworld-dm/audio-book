import {
	Box,
	VStack,
	Input,
	Text,
	Button,
	HStack,
	Spacer,
	ButtonGroup,
} from "@chakra-ui/react";
import React, {
	useEffect,
	useContext,
} from "react";
import ReactQuill from "react-quill";
import { BookContext } from "../providers/BookContextProvider";
import { EditContext } from "../providers/EditContextProvider";
const audioUrl = process.env.REACT_APP_AUDIO_URL;
function Editor() {
	const {
		currentSectionId,
		quillRef,
		reactQuillRef,
		canvasRef,
		setDefaultCanvasHeight,
		setDefaultCanvasWidth,
		setCanvasCtx,
		setRange,
	} = useContext(EditContext);
	const {
		currentBookTitle,
		setCurrentBookTitle,
		getCurrentSectionTitle,
		sections,
		setSections,
		onSaveBook,
		isLoading,
		onGenerateSectionAudio,
		currentBookIdx
	} = useContext(BookContext);

	useEffect(() => {
		// QuillRef
		if (
			reactQuillRef.current &&
			typeof reactQuillRef.current.getEditor === "function"
		) {
			quillRef.current = reactQuillRef.current.getEditor();
		}

		// Canvas
		const canvas = canvasRef.current;
		if (canvas) {
			setCanvasCtx(canvas.getContext("2d"));
			setDefaultCanvasHeight(canvas.height);
			setDefaultCanvasWidth(canvas.width);
		}
	}, []);

	const handleChangeContent = (value) => {
		// console.log(value);
		const ops = quillRef.current.editor.delta["ops"];
		const newSections = [...sections];
		newSections[currentSectionId]["content"] = {
			ops,
		};
		setSections(newSections);
	};

	const handleChangeSelection = () => {
		console.log();
		if (!quillRef.current.selection.lastRange)
			setRange(quillRef.current.selection.savedRange);
		else setRange(quillRef.current.selection.lastRange);
	};

	useEffect(() => {
		if (sections.length > 0) {
			const section = sections[currentSectionId];
			quillRef.current.setContents(section["content"]);
		}
	}, [currentSectionId]);

	const handleSaveBook = () => {
		onSaveBook();
	};

	const handleDownloadAudio = () => {
		const section = sections[currentSectionId];
		if (section && section.audio) {
			const link = document.createElement("a");
			// link.href = section.audio;
			const url = `${audioUrl}${currentBookIdx}/${section.audio}`;
			console.log(url)
			link.href = url;
			// link.setAttribute(
			// 	"download",
			// 	`${url}`
			// ); // or any other extension
			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);
		} else {
			alert("No audio file available for this section.");
		}
	};

	const handleGenerate = () => {
		onGenerateSectionAudio(currentSectionId, "full");
	};

	return (
		<Box
			w={"full"}
			pr={4}
		>
			<VStack
				gap={4}
				align={"start"}
			>
				<HStack gap={4}>
					<Input
						placeholder="Enter your book title here"
						border={"none"}
						fontSize={18}
						id="book-title"
						defaultValue={currentBookTitle}
						onChange={(e) => setCurrentBookTitle(e.target.value)}
					/>
				</HStack>

				<Text>{getCurrentSectionTitle(currentSectionId)}</Text>
				<Box w={"full"}>
					<ReactQuill
						id="bookcontent"
						theme="snow"
						onChange={handleChangeContent}
						formats={["customImage"]}
						ref={reactQuillRef}
						onChangeSelection={handleChangeSelection}
					/>
				</Box>
				<ButtonGroup w={"full"}>
					<Button
						colorScheme="green"
						onClick={handleSaveBook}
						size={"sm"}
						isLoading={isLoading}
					>
						Save Book
					</Button>

					<Spacer />
					<Button
						colorScheme="blue"
						onClick={handleGenerate}
						size={"sm"}
						isLoading={isLoading}
					>
						Generate Section Audio
					</Button>
					<Button
						colorScheme="yellow"
						onClick={handleDownloadAudio}
						size={"sm"}
						isLoading={isLoading}
					>
						Download Section Audio
					</Button>
					{/* <Button
						colorScheme="yellow"
						onClick={handleSaveBook}
						size={"sm"}
						isLoading={isLoading}
					>
						Download Book Audio
					</Button> */}
				</ButtonGroup>
				<canvas
					ref={canvasRef}
					id="tagCanvas"
					width={"100px"}
					height={"22px"}
				></canvas>
			</VStack>
		</Box>
	);
}

export default Editor;
