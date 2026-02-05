<script>
    import ffmpegTools from "../assets/js/ffmpegtools.svelte.js"
    import Output from "../components/Output.svelte";
    import {onMount} from "svelte";

    let output;
    let active = $state(false);
    let textAreaText = $state("-i %input1% out.mp3");

    async function execute() {
        try {
            active = true;
            output.clearLogs();
            const files = ffmpegTools.getFiles(false);
            if (files.length === 0) {
                alert("No selected files found!");
                return;
            }
            const outputFileFormat = outputTypeByExtension(textAreaText);
            const outputFileName = extractOutputFilename(textAreaText);
            let log = output.createLog(files[0], outputFileFormat);
            log.setFileName(outputFileName);
            const ffmpegArguments = splitCommand(textAreaText);
            /** @type {Array<log>} */
            await ffmpegTools.executeFFmpegMultipleInput(
                files,
                outputFileFormat,
                outputFileName,
                ffmpegArguments,
                log.progressFunction(),
                log.statusFunction(),
            )
        } finally {
            active = false;
        }
    }

    /**
     * Extracts the full output filename from an FFmpeg command string.
     * @param {string} command - The full FFmpeg command.
     * @returns {string|null} - The filename (e.g., 'output.mp4') or null if not found.
     */
    function extractOutputFilename(command) {
        const trimmedCommand = command.trim();

        // Regex breakdown:
        // 1. (?:"|')?     -> Optional opening quote (double or single)
        // 2. ([^"'\s]+)   -> Capture group: any character that isn't a quote or space
        // 3. (?:"|')?     -> Optional closing quote
        // 4. $            -> End of the string
        const regex = /(?:"|')?([^"'\s]+\.[a-z0-9]+)(?:"|')?$/i;

        const match = trimmedCommand.match(regex);

        // Return the first capture group (the filename inside the quotes)
        return match ? match[1] : null;
    }

    /**
     * Extracts the output file extension from an FFmpeg command string.
     * @param {string} command - The full FFmpeg command.
     * @returns {string|null} - The extension (e.g., 'mp4') or null if not found.
     */
    function outputTypeByExtension(command) {
        // 1. Trim whitespace to ensure we are looking at the actual end
        const trimmedCommand = command.trim();

        // 2. Regex to find the extension at the end of the string
        // It accounts for optional trailing quotes.
        const regex = /\.([a-z0-9]+)["']?$/i;

        const match = trimmedCommand.match(regex);

        // 3. Return the captured group (the extension) or null
        return match ? match[1].toLowerCase() : null;
    }

    function splitCommand(command) {
        return command.trim().split(/\s+/);
    }

    let files = $state([]);
    onMount(() => {
        let interval = setInterval(() => {
            files = ffmpegTools.getFiles(false);
        }, 500)

        return () => {
            clearInterval(interval)
        }
    })
</script>
<main class="subpage">
    <div class="page-title">
        File conversion
    </div>
    <div class="card">
        <div class="title">Description</div>
        <div style="width: 350px; overflow-wrap: break-word;">
            Write your own ffmpeg commands. But make sure that you use the new
            file names shown in the table below and remove the "ffmpeg.exe" from the
            beginning of the command.
        </div>
        <div>
            Example command:
        </div>
        <div class="code">-i %input1% output.mp3</div>
    </div>
    <div class="card">
        <div class="title">Selected files and file names:</div>
        <table>
            <thead>
            <tr>
                <th>New file name</th>
                <th>Org. file name</th>
            </tr>
            </thead>
            <tbody>
            {#each files as file, i}
                <tr>
                    <th>%input{i + 1}%</th>
                    <th>{file.name}</th>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
    <div class="card">
        <h2>Convert to</h2>
        <div>
            <div class="title">FFmpeg command:</div>
            <textarea bind:value={textAreaText} placeholder="Enter your ffmpeg command here"></textarea>
        </div>
        <button onclick={execute} disabled={active}>Convert</button>
    </div>
    <Output bind:this={output} bind:active={active}/>
</main>

<style>
    textarea {
        min-height: 400px;
        border-radius: 8px;

        width: 100%;
        box-sizing: border-box;
        padding: 12px;
        margin-top: 10px;
        display: block;
    }

    th, tbody {
        font-weight: normal;
    }

    thead th {
        font-weight: bold;
    }

    textarea:focus {
        outline: none;
        border-color: #6669ff;
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.5);
        transition: all 0.2s ease-in-out;
    }

    .title {
        padding: calc(var(--padding) * 2) 0;
        text-align: left;
    }

    .card {
        display: flex;
        gap: 20px;
        flex-direction: column;
        min-width: 350px;
    }
</style>