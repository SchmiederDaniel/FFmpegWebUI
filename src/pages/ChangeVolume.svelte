<script>
    import ffmpegTools from "../assets/js/ffmpegtools.svelte.js"
    import DownloadIcon from "../assets/icons/DownloadIcon.svelte";

    const inputAudioTypes = ["mp3", "aac", "flac", "ogg", "wav"];
    const inputVideoTypes = ["mp4", "avi", "mkv", "mov"];
    const convertableTypes = inputAudioTypes.concat(inputVideoTypes);
    let sliderValue = $state("0");
    let outputFiles = $state([]);
    let outputProgress = $state([]);
    let progressIndex = $state(0);

    async function convert() {
        outputFiles = [];
        outputProgress = [];

        const files = ffmpegTools.getFiles(false, convertableTypes);
        if (files.length === 0) {
            alert("No convertible file found! Please make sure to select files of types: " + convertableTypes.join(", ") + ".");
            return;
        }
        for (const file of files) {
            const outputObject = {
                name: ffmpegTools.getPlainName(file.name),
                type: file.name.replace(ffmpegTools.getPlainName(file.name) + ".", ""),
                progress: 0,
            };
            outputFiles.push(outputObject);
        }
        for (const file of files) {
            const index = files.indexOf(file);
            const outputObject = outputFiles[index];
            const ffmpegArguments = [
                "-i", "%input%",
                "-af", `volume=${sliderValue}dB`,
                "-vcodec", "copy",
                "%output%",
            ];
            console.log(ffmpegArguments)
            await ffmpegTools.executeFFmpeg(
                file,
                outputObject.type,
                ffmpegArguments,
                (progress_) => {
                    progressIndex = index;
                    outputProgress[index] = progress_;
                },
                (status) => {
                    if (status.status === "success") {
                        const outputData = status.output;
                        const blob = new Blob([outputData]/* , {type: `${categories}/${selectedFormat}`} */);
                        outputFiles[index].src = URL.createObjectURL(blob);
                        outputFiles[index].name = file.name;
                    } else if (status.status === "error") {
                        console.error(status);
                        alert('An error occurred during conversion. Please try again.');
                    }
                },
            )
        }
    }

    function download(file) {
        const a = document.createElement("a");
        a.href = file.src;
        a.download = file.name;
        a.click();
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
        <button onclick={convert}>Process</button>
    </div>
    <div class="card">
        <h2>Results</h2>
        <div>Processed files will be shown here.</div>
        {#each outputFiles as file, index}
            {@const progress = outputProgress[progressIndex]}
            <div class="row">
                <div style="display: flex;">
                    {#if progress !== 100 && index === progressIndex}
                        <div style="align-content: center; padding: var(--padding)">{progress ? progress : 0}%</div>
                    {:else if progressIndex < index}
                        <div style="align-content: center; padding: var(--padding)">0%</div>
                    {:else}
                        <button onclick={() => download(file)}>
                            <DownloadIcon padding={0}></DownloadIcon>
                        </button>
                    {/if}
                    <div class="filename">{file.name}</div>
                </div>
                {#if progressIndex > index || (progress === 100 && progressIndex === index)}
                    {#if file.src}
                        {#if inputVideoTypes.includes(file.type)}
                            <video controls src={file.src}>
                                <track kind="captions" default src={file.src}/>
                                <source src={file.src} type="video/${file.type}"/>
                            </video>
                        {:else if inputAudioTypes.includes(file.type)}
                            <audio controls src={file.src}></audio>
                        {/if}
                    {/if}
                {/if}
            </div>
        {/each}
    </div>
</main>

<style>
    .card {
        display: flex;
        gap: 20px;
        flex-direction: column;
    }

    .row {
        display: flex;
        text-align: center;
        gap: 10px;
        background-color: color-mix(in lab, var(--dark-color) 95%, white 5%);
    }

    @media (max-width: 800px) {
        .row {
            flex-direction: column;
            gap: 0;
        }

        .row audio, .row video {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
    }

    .row, audio {
        border-radius: 8px;
    }

    video {
        max-width: 280px;
    }

    .filename {
        padding: 0 calc(var(--padding) * 2);
        align-content: center;
        max-width: 100%;
        overflow-x: auto;
        white-space: nowrap;
        flex-grow: 1;
        text-align: center;
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
        display: flex;
        height: 34px;
        align-items: center;
    }

    .slider::-moz-range-thumb, .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background: var(--text);
        cursor: pointer;
        width: 18px;
        height: 28px;
        border: none;
        border-radius: 5px;
    }
</style>