import React, { createContext, useState, useRef, useContext } from "react";
import CanvasUtils from "../utils/CanvasColorUtil";
import { Quill } from "react-quill";
import { BookContext } from "./BookContextProvider";

const ImageBlot = Quill.import("formats/image");
class CustomImageBlot extends ImageBlot {
	static blotName = "customImage";
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
	"formats/customImage": CustomImageBlot,
});

export const EditContext = createContext();

const EditContextProvider = ({ children }) => {
	const [currentSectionId, setCurrentSectionId] = useState(0);
	// Quill Editor Related States
	const quillRef = useRef(null);
	const reactQuillRef = useRef(null);

	// Canvas Related States
	const canvasRef = useRef(null);
	const [defaultCanvasHeight, setDefaultCanvasHeight] = useState();
	const [defaultCanvasWidth, setDefaultCanvasWidth] = useState();
	const [canvasCtx, setCanvasCtx] = useState(null);
	const [range, setRange] = useState();
	const {sections, setSections} = useContext(BookContext);
	const onInsertTag = (character, character_id) => {
		CanvasUtils.createNamedTag(
			character,
			canvasRef.current,
			canvasCtx,
			defaultCanvasHeight,
			defaultCanvasWidth
		);
		var dataURL = canvasRef.current.toDataURL();
		const position = range ? range.index : 0;
		quillRef.current.insertEmbed(position, "customImage", {
			src: dataURL,
			alt: character.name,
			width: canvasRef.current.width,
			height: canvasRef.current.height,
			character: character_id,
		});
	};

	const onRemoveTag = (character_id) => {
		console.log(character_id)
		const newSections = [...sections];
		for (let i = 0; i < newSections.length; i++) {
			const sectionContent = newSections[i]['content'];
			for (let j = 0; j < sectionContent['ops'].length; j++) {
				const op = sectionContent['ops'][j];
				if (op.hasOwnProperty('attributes')) {
					if (op['insert']['customImage']) {
						if (op['insert']['customImage'].hasOwnProperty('character')) {
							if (op['insert']['customImage']['character'] == character_id) {
								sectionContent['ops'].splice(j, 1);
								j--;
							}
						}
					}
				}
			}
			newSections[i]['content'] = sectionContent;
		}

		setSections(newSections);

		quillRef.current.setContents(newSections[currentSectionId]['content']);
	}
	return (
		<EditContext.Provider
			value={{
				currentSectionId,
				setCurrentSectionId,
				onInsertTag,
				onRemoveTag,
				quillRef,
				reactQuillRef,
				canvasRef,
				defaultCanvasHeight,
				setDefaultCanvasHeight,
				defaultCanvasWidth,
				setDefaultCanvasWidth,
				canvasCtx,
				setCanvasCtx,
				range,
				setRange,
			}}
		>
			{children}
		</EditContext.Provider>
	);
};

export default EditContextProvider;
