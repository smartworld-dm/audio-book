import { Box, VStack,
	Input,
	useColorModeValue,
	Button, } from "@chakra-ui/react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill";
import CanvasUtils from "../utils/CanvasColorUtil";

const ImageBlot = Quill.import("formats/image");
class CustomImageBlot extends ImageBlot {
	static blotName = "custom-image";
	static tagName = "img";

	static create(value) {
		let node = super.create();
		Object.getOwnPropertyNames(value).forEach((attribute_name) => {
			node.setAttribute(attribute_name, value[attribute_name]);
		});

		return node;
	}

	static value(node) {
		var blot = {};
		node.getAttributeNames().forEach((attribute_name) => {
			blot[attribute_name] = node.getAttribute(attribute_name);
		});

		return blot;
	}
}
Quill.debug("debug");
Quill.register({
	"formats/custom-image": CustomImageBlot,
});
console.log("Image");

function Editor() {
	// Quill Editor Related States
	const quillRef = useRef(null);
	const reactQuillRef = useRef(null);

	// Canvas Related States
	const canvasRef = useRef(null);
	const [defaultCanvasHeight, setDefaultCanvasHeight] = useState();
	const [defaultCanvasWidth, setDefaultCanvasWidth] = useState();
	const [canvasCtx, setCanvasCtx] = useState(null);

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
		// handleInsertTag();
		console.log(quillRef.current.editor.delta);

	};

	const handleInsertTag = () => {
		CanvasUtils.createNamedTag(
			"Hello",
			canvasRef.current,
			canvasCtx,
			defaultCanvasHeight,
			defaultCanvasWidth
		);
		var dataURL = canvasRef.current.toDataURL();
		const range = quillRef.current.getSelection();
		const position = range ? range.index : 0;
		quillRef.current.insertEmbed(position, "custom-image", {
			src: dataURL,
			alt: "sdsdsdsdsd",
			width: 110,
			height: 22,
			character: '1',
		})
	};

	const handleChangeSelection = ()=>{
		console.log(quillRef.current.selection);
	}

	const handleCharacterClick = useCallback((e)=>{

	});

	return (
		<Box w={'full'}>
			<VStack gap={4}>
				<Button onClick={handleInsertTag}>Insert Image</Button>
				<Input
					placeholder="Enter your book title here"
					border={"none"}
					fontSize={18}
					id="book-title"
				/>
				{/* <Button onClick={() => handleInsertTag()}> insert</Button> */}
				<Box w={"full"}>
					<ReactQuill
						id="bookcontent"
						theme="snow"
						// value={value}
						onChange={handleChangeContent}
						formats={["custom-image"]}
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
