import {
	Box,
	Grid,
	GridItem,
	VStack,
	Input,
	useColorModeValue,
	Button,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
// import "../utils/CustomImageBlot";
import CanvasUtils from "../utils/CanvasColorUtil";
// import Quill from "../assets/libs/quill/quill";
function Editor() {
	const themeColor = useColorModeValue("orange.400", "orange.300");
	const { quill, quillRef } = useQuill();
	// Quill Editor Related States
	// const quill = useRef(()=> {
	// 	const newQuill = new Quill(".bookcontent", {
	// 		theme: "snow",
	// 		modules: {
	// 			// toolbar: [],
	// 		},
	// 		placeholder: ''
	// 	});
	// 	return newQuill;
	// });
	// const [editorRange, setEditorRange] = useState(false);
	// const [quillObj, setQuillObj] = useState(null);

	// Canvas Related States
	const canvasRef = useRef(null);
	const [defaultCanvasHeight, setDefaultCanvasHeight] = useState();
	const [defaultCanvasWidth, setDefaultCanvasWidth] = useState();
	const [canvasCtx, setCanvasCtx] = useState(null);

	useEffect(() => {
		// if (quill.container) {
		// 	quill.root.addEventListener('keydown', event => {
		// 		setEditorRange(quill.getSelection());
		// 		if (event.keyCode == 46) {
		// 			console.log(46)
		// 		} else if (event.keyCode == 8) {
		// 			console.log(8)
		// 			quill.insertText(editorRange.index - 1, '', true);
		// 		} else {
		// 			console.log('else')
		// 		}
		// 	});

		// 	quill.on('selection-change', (range)=>{
		// 		if (range != null) {
		// 			setEditorRange(Object.assign({}, range));
		// 		}
		// 	});
		// }

		// setQuillObj(quill);

		// Canvas
		const canvas = canvasRef.current;
		if (canvas) {
			setCanvasCtx(canvas.getContext("2d"));
			setDefaultCanvasHeight(canvas.height);
			setDefaultCanvasWidth(canvas.width);
		}

		return () => {
			// if (quill) {
			// 	quill.root.removeEventListener('keydown', ()=>{
			// 		console.log('Quill Keydown EventListener Removed');
			// 	});
			// 	quill.root.removeEventListener('quill-text-set', ()=>{
			// 		console.log('Quill Text Set EventListener Removed');
			// 	});
			// }
		};
	}, []);

	const handleInsertTag = () => {
		return;
		CanvasUtils.createNamedTag(
			"Hello",
			canvasRef.current,
			canvasCtx,
			defaultCanvasHeight,
			defaultCanvasWidth
		);
		var dataURL = canvasRef.current.toDataURL();
		const beforeType = false;

		// if (!editorRange) {
		// 	alert("User cursor is not in editor.");
		// 	return;
		// }

		// if (beforeType) {
		// 	quill.insertEmbed(editorRange.index + 1, "customImage", {
		// 		src: dataURL,
		// 		alt: "",
		// 		width: canvasRef.current.width,
		// 		height: canvasRef.current.height,
		// 		character: '1',
		// 	});
		// } else {
		// 	quill.insertEmbed(editorRange.index, "customImage", {
		// 		src: dataURL,
		// 		alt: "",
		// 		width: canvasRef.current.width,
		// 		height: canvasRef.current.height,
		// 		character: '1',
		// 	});
		// }
	};

	return (
		<Box
			px={10}
			border={"1px"}
			// borderTop={"solid"}
			borderLeft={"none"}
			borderRight={"none"}
			borderBottom={"none"}
			borderColor={themeColor}
			w={"full"}
		>
			<Grid
				h="800px"
				// templateRows="repeat(2, 1fr)"
				templateColumns="repeat(10, 1fr)"
				gap={4}
			>
				<GridItem
					// rowSpan={2}
					colSpan={3}
					// bg="tomato"
					border={"1px"}
					borderLeft={"none"}
					borderTop={"none"}
					borderBottom={"none"}
					borderColor={themeColor}
					pl={10}
				></GridItem>
				<GridItem
					colSpan={7}
					// bg="papayawhip"
					pt={8}
					pr={10}
				>
					<VStack gap={4}>
						<Input
							placeholder="Enter your book title here"
							border={"none"}
							fontSize={18}
							id="book-title"
						/>
						<Button onClick={handleInsertTag}> insert</Button>
						{/* <div style={{ width: 500, height: 300 }}>
							<div ref={quillRef} />
						</div> */}

						<Box
							className="bookcontent"
							id="bookcontent"
							w={"full"}
							ref={quillRef}
						/>
						<canvas
							ref={canvasRef}
							id="tagCanvas"
							width={"100px"}
							height={"22px"}
						></canvas>
					</VStack>
				</GridItem>
			</Grid>
		</Box>
	);
}

export default Editor;
