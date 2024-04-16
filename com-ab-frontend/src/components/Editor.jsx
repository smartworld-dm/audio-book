import { Box, VStack, Input, Text, Button } from "@chakra-ui/react";
import React, {
	useEffect,
	useState,
	useRef,
	useCallback,
	useContext,
} from "react";
import ReactQuill from "react-quill";
import CanvasUtils from "../utils/CanvasColorUtil";
import { BookContext } from "../providers/BookContextProvider";
import { EditContext } from "../providers/EditContextProvider";


function Editor() {
	const {
		currentSectionId,
		setCurrentSectionId,
		onInsertTag,
		quillRef,
		reactQuillRef,
		canvasRef,
		defaultCanvasHeight,
		setDefaultCanvasHeight,
		defaultCanvasWidth,
		setDefaultCanvasWidth,
		canvasCtx,
		setCanvasCtx,
		range, setRange
	} = useContext(EditContext);
	const {
		currentBookTitle,
		setCurrentBookTitle,
		getCurrentSectionTitle,
		sections,
		setSections,
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
		else
			setRange(quillRef.current.selection.lastRange);
	};

	useEffect(() => {
		if (sections.length > 0) {
			const section = sections[currentSectionId];
			quillRef.current.setContents(section['content']);
		}
	}, [currentSectionId]);

	useEffect(()=>{

	}, []);

	return (
		<Box
			w={"full"}
			pr={4}
		>
			<VStack
				gap={4}
				align={"start"}
			>
				<Input
					placeholder="Enter your book title here"
					border={"none"}
					fontSize={18}
					id="book-title"
					defaultValue={currentBookTitle}
					onChange={(e) => setCurrentBookTitle(e.target.value)}
				/>
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
