<script>
    import ffmpegTools from "../assets/js/ffmpegtools.svelte.js"
    import DownloadIcon from "../assets/icons/DownloadIcon.svelte";

    let convertButton;
    let outputFiles = $state([]);

    let selectedCategory = $state("audio");
    let selectedFormat = $state("mp3");

    const categories = {
        audio: ["mp3", "aac", "flac", "ogg", "wav"],
        video: ["mp4", "avi", "mkv", "mov"],
        // image: ["jpg", "png", "gif", "bmp", "tiff"],
    };

    function copyArray(array)  {
        const newBuffer = new ArrayBuffer(array.byteLength);
        const newArray = new Uint8Array(newBuffer);
        newArray.set(new Uint8Array(array));
        return newArray;
    }

    async function convert() {
        const ffmpeg = ffmpegTools.ffmpeg;
        ffmpegTools.getFiles(async (files) => {
            outputFiles = [];
            for (let file of files) {
                try {
                    const newName = `input.${file.name.split(".")[0]}`;
                    const array = copyArray(file.array);
                    console.log(file.array);
                    await ffmpeg.writeFile(newName, array);
                    await ffmpeg.exec([
                        "-i", newName,
                        "-vn",
                        "-acodec",
                        "libmp3lame",
                        `output.${selectedFormat}`
                    ]);

                    // When file has no audio format it will throw error here
                    const outputData = await ffmpeg.readFile(`output.${selectedFormat}`);
                    const blob = new Blob([outputData], {type: `${selectedCategory}/${selectedFormat}`});

                    const src = URL.createObjectURL(blob);
                    const dotsplit = file.name.split(".");
                    dotsplit.pop(); // remove file extension
                    outputFiles.push({
                        name: dotsplit.join("."),
                        src: src,
                        format: selectedFormat,
                        category: selectedCategory,
                    })

                    // const a = document.createElement("a");
                    // a.href = src;
                    // a.download = dotsplit.join(".") + "." + selectedFormat;
                    // a.click();
                    const a = document.createElement("a");
                    a.href = URL.createObjectURL(blob);
                    a.download = "output.wav";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(a.href);
                    // URL.revokeObjectURL(a.href);
                } catch (error) {
                    console.error(error);
                    alert('An error occurred during conversion. Please try again.');
                } finally {
                    convertButton.disabled = false;
                }
            }
        })
    }

    function download(file) {
        const a = document.createElement("a");
        a.href = file.src;
        a.download = file.name + "." + selectedFormat;
        a.click();
        console.log(a)
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
            <select bind:value={selectedCategory}>
                {#each Object.keys(categories) as category}
                    <option value={category}>{category}</option>
                {/each}
            </select>
        </div>
        <div>
            File format:
            {selectedCategory}
            <select bind:value={selectedFormat}>
                {#each categories[selectedCategory] as format}
                    <option value={format}>{format}</option>
                {/each}
            </select>
        </div>
        <button onclick={convert} bind:this={convertButton}>Convert</button>
    </div>
    {#if outputFiles.length > 0}
        <div class="card">
            <h2>Results</h2>
            {#each outputFiles as file}
                <div class="row">
                    <button onclick={() => download(file)}>
                        <DownloadIcon padding={0}></DownloadIcon>
                    </button>
                    <div class="filename">{file.name}</div>
                    {file.category}
                    {#if file.category === "video"}
                        <video controls src={file.src}>
                            <track kind="captions" default src={file.src}/>
                            <source src={file.src} type="video/${file.format}"/>
                        </video>
                    {:else if file.category === "audio"}
                        <audio controls src={file.src}></audio>
                    {:else }
                        {file.format}
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
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

    .row, audio {
        border-radius: 8px;
    }

    .filename {
        align-content: center;
        max-width: 100%;
        overflow-x: auto;
        white-space: nowrap;
    }
</style>