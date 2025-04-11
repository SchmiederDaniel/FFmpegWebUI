<main class="subpage">
    <div class="card">
        <div class="page-title">
            FFmpeg WebUI
        </div>
        <div>This is a Web-App which uses</div>
        <a href="https://ffmpegwasm.netlify.app/" target="_blank">ffmpeg.wasm</a>
        <div>
            without any server-side processing.
            So your files you edit are all saved within your
            browser and will never be uploaded.
        </div>
    </div>
    <div class="card todo">
        <h2>TODO</h2>
        <div>1. limit file types</div>
        <div>2. make it easier to convert multiple files so the logic is abstracted away into the ffmpegTools</div>
        <div>3. Make use of another file which adds pre made options at the bottom and allows for progressbar, status bar
            and more.</div>
        <div>4. Can't process files twice</div>
        <div>5. Make all the ffmpeg options changable in a popup</div>
        <div>6. Handle more errors correctly: required audio or video stream</div>
        <div>7. Create a toast message component which can show important messages.</div>
    </div>
</main>

<style>
    .todo > div {
        text-align: left;
    }

    /*.card > * {*/
    /*    max-width: 300px;*/
    /*}*/

    /*.card {*/
    /*    padding: 20px;*/
    /*    margin: 20px auto;*/
    /*}*/
</style>
