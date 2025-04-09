import {FFmpeg} from "@ffmpeg/ffmpeg";

const ffmpeg = new FFmpeg();
ffmpeg.on('log', ({message}) => {
    console.log(message);
});

let progress = $state(0);
let working = $state(false);
let files = $state([]);

async function load() {
    await ffmpeg.load();
    ffmpeg.on("progress", async (e) => {
        progress = Math.round(e.progress * 100);
    });
}

load();

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

export default {
    ffmpeg: ffmpeg,
    progress: progress,
    working: working,
    openFileDialog: openFileDialog,
    fileCount: () => files.length,
    getFiles: (callback) => {
        if (files.length > 0) {
            callback(files);
        } else {
            window.alert("No files selected! Please make sure to select files first!.");
        }
    }
}