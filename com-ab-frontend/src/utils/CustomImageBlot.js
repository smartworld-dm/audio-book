import Quill from "../assets/libs/quill/quill";
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
Quill.register({
    "formats/image": CustomImageBlot
});

export default CustomImageBlot;