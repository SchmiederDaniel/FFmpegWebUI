<script>
    import DownloadIcon from "../assets/icons/DownloadIcon.svelte";

    let {active = $bindable()} = $props();

    const AUDIO_TYPES = ["mp3", "aac", "flac", "ogg", "wav"];
    const VIDEO_TYPES = ["mp4", "avi", "mkv", "mov"];
    const IMAGE_TYPES = ["jpg", "jpeg", "png", "gif"];

    /** @type {Array<Log>} */
    let logs = $state([]);

    function category(type) {
        if (AUDIO_TYPES.includes(type)) {
            return "audio";
        } else if (VIDEO_TYPES.includes(type)) {
            return "video";
        } else if (IMAGE_TYPES.includes(type)) {
            return "image";
        }
    }

    class Log {
        src = $state(null);
        progress = $state(0);
        type = $state(null);
        category = $state(null);

        constructor(inputData, outputType) {
            this.inputData = inputData;
            this.setFileName(this.inputData.name)
            if (outputType)
                this.type = outputType;
            this.category = category(this.type);
        }

        /**
         * Updates the shown file name based on a full file name with extension.
         * Example: "MyMp3.mp3"
         * @param name {String}
         */
        setFileName(name) {
            this.name = name;
            this.plainName = this.name.replace(/\.[^.]+$/, "");
            this.type = this.name.replace(this.plainName + ".", "");
        }

        getProgress() {
            return this.progress;
        }

        /**
         * Gets the input data of the log.
         * @returns {object} The input file data of the log.
         */
        getInputData() {
            return this.inputData;
        }

        /**
         * File type of the log. (e.g. mp3, mp4, etc. without ".")
         * @returns {String} The output data of the log.
         */
        getType() {
            return this.type;
        }

        /**
         * Sets the progress of the log
         * @returns {function} A callback function which will be called with the percentage of the progress.
         */
        progressFunction() {
            const own = this;
            /**
             * @param percentage {number} The percentage of the progress from 0 to 100. (without "%")
             */
            return (percentage) => {
                own.progress = percentage;
                active = true;
            }
        }

        /**
         * Function used for ffmpegtools.svelte.js in the "executeFFmpeg" function which keeps track of the progress of the log.
         * @returns {function} A callback function which will be called with the status of the conversion.
         */
        statusFunction() {
            const own = this;
            /**
             * @param statusObject {Object}
             */
            return (statusObject) => {
                if (statusObject.status === "success") {
                    const outputData = statusObject.output;
                    const blob = new Blob([outputData]/* , {type: `${categories}/${selectedFormat}`} */);
                    own.src = URL.createObjectURL(blob);
                    active = false;
                } else if (statusObject.status === "error") {
                    console.error(statusObject);
                    alert('An error occurred during conversion. Please try again.');
                    active = false;
                }
            }
        }
    }

    /**
     * Adds a dummy log which will be shown and shows the percentage of the progress
     * @param inputData {object} The input data of the file.
     * @param outputType {string|null} Optional output type of the file. (e.g. mp3, mp4, etc. without ".")
     * @returns {Log} A instance of the Log class for future references
     */
    export function createLog(inputData, outputType = null) {
        const log = new Log(inputData, outputType);
        logs.push(log);
        return log;
    }

    /**
     * Clears all existing logs
     */
    export function clearLogs() {
        logs = [];
    }

    /**
     * Returns the array of logs
     * @returns {Array<Log>}
     */
    export function getLogs() {
        return logs;
    }

    /**
     * Creates a download link for the file and triggers the download.
     * @param {Log} log The log object which contains the blob and the name of the file.
     */
    function download(log) {
        const a = document.createElement("a");
        a.href = log.src;
        a.download = log.name;
        a.click();
    }
</script>

<main>
    <div class="card">
        <h2>Results</h2>
        <div>Processed files will be shown here.</div>
        {#each logs as log}
            <div class="row">
                <div style="display: flex;">
                    {#if !log.src}
                        <div style="align-content: center; padding: var(--padding)">{log.progress}%</div>
                    {:else}
                        <button onclick={() => download(log)}>
                            <DownloadIcon padding={0}></DownloadIcon>
                        </button>
                    {/if}
                    <div class="filename">{log.name}</div>
                </div>
                {#if log.src}
                    {#if log.category === "video"}
                        <video controls src={log.src}>
                            <track kind="captions" default src={log.src}/>
                            <source src={log.src} type="video/${log.type}"/>
                        </video>
                    {:else if log.category === "audio"}
                        <div class="audio-container">
                            <audio controls src={log.src}></audio>
                        </div>
                    {:else if log.category === "image"}
                        <img src={log.src} alt={log.name}/>
                    {/if}
                {/if}
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
    }

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
</style>