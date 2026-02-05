<script>
    import ffmpegTools from "../assets/js/ffmpegtools.svelte.js"
    import Output from "../components/Output.svelte";

    let output;
    let active = $state(false);
    const imageFormats = ["png", "jpg", "jpeg", "webp"]
    const audioFormats = ["mp3", "ogg", "wav"]
    const videoFormats = ["mp4", "avi", "mkv", "mov"]

    const convertableFormats = imageFormats.concat(audioFormats).concat(videoFormats);
    let selectedCategory = $state("audio");
    let selectedFormat = $state("mp3");

    const categories = {
        audio: ["mp3", "aac", "flac", "ogg", "wav"],
        video: ["mp4", "avi", "mkv", "mov"],
        other: ["gif"],
    };

    async function convert() {
        try {
            active = true;
            output.clearLogs();
            const files = ffmpegTools.getFiles(false, convertableFormats);
            if (files.length === 0) {
                alert("No convertible file found! Please make sure to select files of types: " + convertableFormats.join(", ") + ".");
                return;
            }
            /** @type {Array<Log>} */
            let logs = [];
            for (const file of files) {
                logs.push(output.createLog(file, selectedFormat));
            }
            for (const log of logs) {
                await ffmpegTools.executeFFmpeg(
                    log.getInputData(),
                    log.getType(),
                    [
                        "-i", "%input%",
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
        <button onclick={convert} disabled={active}>Convert</button>
    </div>
    <Output bind:this={output} bind:active={active}/>
</main>

<style>
    .card {
        display: flex;
        gap: 20px;
        flex-direction: column;
    }
</style>