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
    <div class="card">
        <h2>Quickstart</h2>
        <div>
            1. On the top left of the page you have the burger menu which allows you to navigate to the different sub
            pages which all feature different ffmpeg tools.
        </div>
        <div>
            2. On the top of the page you can select the file you want to process.
            Note that each sub page you are on filters the input file types on its own which means it can happen that
            you have files selected but these can't be processed.
        </div>
        <div>
            3. After processing files the output will be shown at the bottom of the page.
        </div>
    </div>
    <div class="card todo">
        <h2>TODO for me</h2>
        <div>1. limit file types</div>
        <div>2. make it easier to convert multiple files so the logic is abstracted away into the ffmpegTools</div>
        <div>3. Make use of another file which adds pre made options at the bottom and allows for progressbar, status
            bar
            and more.
        </div>
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

    .card > div {
        padding-bottom: 4px;
    }

    /*.card > * {*/
    /*    max-width: 300px;*/
    /*}*/

    /*.card {*/
    /*    padding: 20px;*/
    /*    margin: 20px auto;*/
    /*}*/
</style>
