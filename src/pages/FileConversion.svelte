<script>
    import ffmpegTools from "../assets/js/ffmpegtools.svelte.js"
    import DownloadIcon from "../assets/icons/DownloadIcon.svelte";

    const convertableFormats = [
        "mp3",
        "ogg",
        "wav",
        "mp4",
        "avi",
        "mkv",
        "mov",
    ];
    let outputFiles = $state([]);
    let outputProgress = $state([]);

    let selectedCategory = $state("audio");
    let selectedFormat = $state("mp3");
    let progressIndex = $state(0);

    const categories = {
        audio: ["mp3", "aac", "flac", "ogg", "wav"],
        video: ["mp4", "avi", "mkv", "mov"],
        // image: ["jpg", "png", "gif", "bmp", "tiff"],
    };

    async function convert() {
        outputFiles = [];
        outputProgress = [];

        const files = ffmpegTools.getFiles(false, convertableFormats);
        if (files.length === 0) {
            alert("No convertible file found! Please make sure to select files of types: " + convertableFormats.join(", ") + ".");
            return;
        }
        for (const file of files) {
            const outputObject = {
                name: ffmpegTools.getPlainName(file.name),
                format: selectedFormat,
                progress: 0,
                category: selectedCategory,
            };
            outputFiles.push(outputObject);
        }
        for (const file of files) {
            const index = files.indexOf(file);
            await ffmpegTools.executeFFmpeg(
                file,
                selectedFormat,
                [
                    "-i", "%input%",
                    "-vn",
                    "-acodec",
                    "libmp3lame",
                    "%output%",
                ],
                (progress_) => {
                    progressIndex = index;
                    outputProgress[index] = progress_;
                },
                (status) => {
                    if (status.status === "success") {
                        const outputData = status.output;
                        const blob = new Blob([outputData], {type: `${categories}/${selectedFormat}`});
                        outputFiles[index].src = URL.createObjectURL(blob);
                        outputFiles[index].name = ffmpegTools.getPlainName(file.name) + "." + selectedFormat;
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
        File conversion
    </div>
    <div class="card">
        <h2>Convert to</h2>
        <div>
            Category:
            <select bind:value={selectedCategory} onchange={() => selectedFormat = categories[selectedCategory][0]}>
                {#each Object.keys(categories) as category}
                    <option value={category}>{category}</option>
                {/each}
            </select>
        </div>
        <div>
            File format:
            <select bind:value={selectedFormat}>
                {#each categories[selectedCategory] as format}
                    <option value={format}>{format}</option>
                {/each}
            </select>
        </div>
        <button onclick={convert}>Convert</button>
    </div>
    <div class="card">
        <h2>Results</h2>
        <div>Converted files will be shown here.</div>
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
                    {#if file.category === "video"}
                        <video controls src={file.src}>
                            <track kind="captions" default src={file.src}/>
                            <source src={file.src} type="video/${file.format}"/>
                        </video>
                    {:else if file.category === "audio"}
                        <audio controls src={file.src}></audio>
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

    .filename {
        padding: 0 calc(var(--padding) * 2);
        align-content: center;
        max-width: 100%;
        overflow-x: auto;
        white-space: nowrap;
        flex-grow: 1;
        text-align: center;
    }
</style>