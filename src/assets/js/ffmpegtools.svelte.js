import {FFmpeg} from "@ffmpeg/ffmpeg";

let files = $state([]);

/*
ffmpeg.on('log', ({message}) => {
    console.log(message);
});
 */

function openFileDialog() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = 'image/*, video/*, audio/*';
    fileInput.addEventListener('change', async () => {
        files.length = 0; // Clear the existing files
        const allFiles = Array.from(fileInput.files);
        for (const file of allFiles) {
            const inputFile = await file.arrayBuffer();
            console.log('File loaded:', file.name);
            const array = new Uint8Array(inputFile);
            files.push({
                name: file.name,
                array: array
            });
        }
    });
    fileInput.click();
}

function copyArray(array) {
    const newBuffer = new ArrayBuffer(array.byteLength);
    const newArray = new Uint8Array(newBuffer);
    newArray.set(new Uint8Array(array));
    return newArray;
}

/**
 * Executes the FFmpeg command with the provided arguments.
 * Note: %input% and %output% can be used as a placeholder for the input and output file names inside the arguments.
 *
 * @param {object} file The file object returned from the file input.
 * @param {string} outputType The file extension of the output file
 * @param {string[]} ffmpegArguments The arguments to pass to FFmpeg.
 * @param {function} progressCallback A callback function which receives the progress percentage.
 * @param {function} statusCallback A callback function which receives the status of the operation. (success, error and output data)
 */
async function executeFFmpeg(file, outputType, ffmpegArguments, progressCallback, statusCallback) {
    const ffmpeg = new FFmpeg();
    await ffmpeg.load();
    try {
        ffmpeg.on("progress", async (e) => {
            progressCallback(Math.round(e.progress * 100));
        });

        const inputName = `input.${file.name.split(".")[0]}`;
        const outputName = `output.${outputType}`;

        // replace placeholder %input% with the actual file name
        ffmpegArguments = ffmpegArguments.map(arg => arg.replace(/%input%/g, inputName));
        ffmpegArguments = ffmpegArguments.map(arg => arg.replace(/%output%/g, outputName));

        const array = copyArray(file.array);
        await ffmpeg.writeFile(inputName, array);
        await ffmpeg.exec(ffmpegArguments);
        const outputData = await ffmpeg.readFile(outputName);

        statusCallback({
            status: "success",
            output: outputData,
            outputType: outputType,
        });
    } catch (error) {
        console.error("Error executing FFmpeg command:", error);
        statusCallback("error");
    } finally {
    }
}

/**
 * Get files from the file array and filter them by type.
 * @param {boolean} single If true, return only the first file
 * @param {string[]} types File types to filter by
 * @return {Array[File]} Array of the filtered files
 */
function getFiles(single, types) {
    types = types.map(type => type.toLowerCase());
    const result = [];
    for (const file of files) {
        const name = file.name.toLowerCase();
        const ext = name.split('.').pop();
        file.type = ext;
        if (types.includes(ext)) {
            result.push(file);
        }
    }
    if (single) {
        return result[0];
    }
    return result;
}

/**
 * Returns the file name without the file extension.
 * @param fileName {string} The file name
 * @returns {string} The file name without the extension
 */
const getPlainName = (fileName) => fileName.replace(/\.[^.]+$/, "");

export default {
    executeFFmpeg: executeFFmpeg,
    openFileDialog: openFileDialog,
    getPlainName: getPlainName,
    getFiles: getFiles,
    fileCount: () => files.length,
}