<script>
    import ffmpegTools from "../assets/js/ffmpegtools.svelte.js"
    import Output from "../components/Output.svelte";

    const inputAudioTypes = ["mp3", "aac", "flac", "ogg", "wav"];
    const inputVideoTypes = ["mp4", "avi", "mkv", "mov"];
    const convertableTypes = inputAudioTypes.concat(inputVideoTypes);
    let sliderValue = $state("0");
    let output;
    let active = $state(false);

    async function convert() {
        try {
            active = true;
            output.clearLogs();
            const files = ffmpegTools.getFiles(false, convertableTypes);
            if (files.length === 0) {
                alert("No convertible file found! Please make sure to select files of types: " + convertableTypes.join(", ") + ".");
                return;
            }
            /** @type {Array<Log>} */
            let logs = [];
            for (const file of files) {
                logs.push(output.createLog(file));
            }
            for (const log of logs) {
                await ffmpegTools.executeFFmpeg(
                    log.getInputData(),
                    log.getType(),
                    [
                        "-i", "%input%",
                        "-af", `volume=${sliderValue}dB`,
                        "-vcodec", "copy",
                        "%output%",
                    ],
                    log.progressFunction(),
                    log.statusFunction(),
                )
            }
        } finally {
            active = false;
        }
    }
</script>
<main class="subpage">
    <div class="page-title">
        Change Audio Volume
    </div>
    <div class="card">
        <h2>Increase or Decrease by:</h2>
        <div class="slider-container">
            <div>{sliderValue} dB</div>
            <input bind:value={sliderValue} type="range" min="-10" max="10" class="slider">
        </div>
        <button onclick={convert} disabled={active}>Process</button>
    </div>
    <Output bind:this={output} bind:active={active} />
</main>

<style>
    .card {
        display: flex;
        gap: 20px;
        flex-direction: column;
    }

    /* Slider design from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_rangeslider */
    .slider {
        width: 100%;
        height: 8px;
        background-color: color-mix(in lab, black 50%, var(--text) 50%);
        border-radius: 4px;
    }

    .slider-container {
        background-color: color-mix(in lab, white 10%, var(--button-color) 90%);
        border-radius: 8px;
        padding: calc(var(--padding) * 2);
        color: var(--text2);
        display: flex;
        height: 34px;
        align-items: center;
    }

    .slider::-moz-range-thumb, .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background: var(--text2);
        cursor: pointer;
        width: 18px;
        height: 28px;
        border: none;
        border-radius: 5px;
    }
</style>