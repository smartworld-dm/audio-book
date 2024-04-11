
const ColorUtils = {
    generateAlphaColor: (color) =>  {
        const alpha = 0.5; // Replace with your desired alpha value between 0 and 1
        const rgbaColor = "rgba(" +
            parseInt(color.slice(1, 3), 16) + ", " +
            parseInt(color.slice(3, 5), 16) + ", " +
            parseInt(color.slice(5, 7), 16) + ", " +
            alpha + ")";

        return rgbaColor;
    },
    genRandomColor: ()=> {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        // Convert the values to a hex color string
        const color = "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);

        const rgbaColor = this.generateAlphaColor(color);

        return {
            text: color,
            background: rgbaColor
        }
    },
    componentToHex : (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
}

const CanvasUtils = {
    createNamedTag: (name, canvas, ctx, defaultCanvasHeight, defaultCanvasWidth) => {
        const tag = name;
        const canvasHeight = defaultCanvasHeight;
        const canvasWidth = defaultCanvasWidth;
        const fontsize = 18;
        ctx.font = fontsize + "px Lato";
        const textMetrics = ctx.measureText(tag);
        // const lineHeight = Math.ceil(
        //     textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent
        // );
        const lineWidth = Math.ceil(textMetrics.width);
        const scaleFactor = lineWidth / canvasWidth;

        canvas.width = canvasWidth * scaleFactor + 16;
        // canvas.height = lineHeight + 8;

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvasWidth * scaleFactor + 8, canvasHeight);

        ctx.beginPath();
        ctx.moveTo(canvasWidth * scaleFactor + 8, 0);
        ctx.lineTo(canvasWidth * scaleFactor + 8, canvasHeight);
        ctx.lineTo(canvasWidth * scaleFactor + 16, canvasHeight / 2);
        ctx.closePath();
        // ctx.strokeStyle = tag_color;
        // ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.fill();

        ctx.font = Math.ceil(fontsize) + "px Lato";
        ctx.fillStyle = "#fff";
        ctx.fillText(tag, 8 / 3, canvas.height - 4);
    },
    // createNamedTagWithCharacterId: (characters, character_id)=> {
    //     const tag = characters[character_id].name;
    //     const tag_color = characters[character_id].tag_color.background;
    //     const tag_text_color = characters[character_id].tag_color.text;
    //     const canvasHeight = defaultCanvasHeight;
    //     const canvasWidth = defaultCanvasWidth;
    //     const fontsize = 18;
    //     ctx.font = fontsize + "px Lato";
    //     const textMetrics = ctx.measureText(tag);
    //     const lineHeight = Math.ceil(
    //         textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent
    //     );
    //     const lineWidth = Math.ceil(textMetrics.width);
    //     const scaleFactor = lineWidth / canvasWidth;

    //     canvas.width = canvasWidth * scaleFactor + 16;
    //     // canvas.height = lineHeight + 8;

    //     ctx.fillStyle = tag_color;
    //     ctx.fillRect(0, 0, canvasWidth * scaleFactor + 8, canvasHeight);

    //     ctx.beginPath();
    //     ctx.moveTo(canvasWidth * scaleFactor + 8, 0);
    //     ctx.lineTo(canvasWidth * scaleFactor + 8, canvasHeight);
    //     ctx.lineTo(canvasWidth * scaleFactor + 16, canvasHeight / 2);
    //     ctx.closePath();
    //     // ctx.strokeStyle = tag_color;
    //     // ctx.stroke();
    //     ctx.fillStyle = tag_color;
    //     ctx.fill();

    //     ctx.font = Math.ceil(fontsize) + "px Lato";
    //     ctx.fillStyle = tag_text_color;
    //     ctx.fillText(tag, 8 / 3, canvas.height - 4);
    // }
}

export { ColorUtils };
export default CanvasUtils;