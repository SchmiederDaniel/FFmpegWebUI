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
