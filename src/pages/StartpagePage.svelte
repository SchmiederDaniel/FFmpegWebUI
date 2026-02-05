<main class="subpage">
    <div class="card">
        <div class="page-title">
            FFmpeg WebUI
        </div>
        <div>This is a Web-App which uses</div>
        <a href="https://ffmpegwasm.netlify.app/" target="_blank">ffmpeg.wasm</a>
        <div>
            without any server-side processing.
            So your files are all saved within your
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
            2. Use the top selector to choose your file.
            Because each sub-page only supports certain formats, some selected
            files may not be available for processing.
        </div>
        <div>
            3. After processing files the output will be shown at the bottom of the page.
        </div>
    </div>
<!--    <div class="card todo">-->
<!--        <h2>TODO for me</h2>-->
<!--        <div>1. Can't process files twice. A feature where the processed files will be re-applied to the input files-->
<!--            would be useful for chaining multiple tools.-->
<!--        </div>-->
<!--        <div>2. Make error handling easier like a abstract method which checks file properties (e.g. available audio or-->
<!--            video stream)-->
<!--        </div>-->
<!--        <div>3. Create a toast message component which can show important messages.</div>-->
<!--    </div>-->
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
