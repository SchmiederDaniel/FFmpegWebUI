<!--
    This component:
    - Shows a file upload button which can be clicked to select a file
    - Allows for drag and drop of files on the whole page and shows a overlay when files are being dragged above the page.
    - Saves loaded files into a props object which will be passed from the parent component to other sub sites.
-->
<script>
    import UploadIcon from "../assets/icons/UploadIcon.svelte";
    import ffmpegTools from "../assets/js/ffmpegtools.svelte.js";

</script>
<main>
    <button aria-label="Upload button" onclick={ffmpegTools.openFileDialog}>
        <span>Selected files: {ffmpegTools.fileCount()}</span>
        <UploadIcon/>
    </button>
</main>

<style>
    main {
        display: flex;
        align-items: center;
    }

    button {
        font-size: 1em;
        font-weight: 600;
        display: flex;
        align-items: center;
        width: 120px;
        height: 50px;
        padding: 10px;
    }
</style>