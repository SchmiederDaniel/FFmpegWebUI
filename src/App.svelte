<script>
    import FileUpload from "./components/FileUpload.svelte";
    import BurgerMenu from "./components/BurgerMenu.svelte";
    import BurgerButton from "./components/BurgerButton.svelte";

    import StartIcon from "./assets/icons/StartIcon.svelte";
    import StartpagePage from "./pages/StartpagePage.svelte";
    import FileConversion from "./pages/FileConversion.svelte";
    import ConvertIcon from "./assets/icons/ConvertIcon.svelte";

    const pages = [
        {icon: StartIcon, text: "Home", page: StartpagePage},
        {icon: ConvertIcon, text: "File conversion", page: FileConversion},
    ];
    let openPage = $state(0);
    let open = $state(false);
</script>
<main class="max-size">
    <header>
        <BurgerButton bind:open={open}/>
        <div class="title">
            <h2>FFmpeg WebUI</h2>
        </div>
        <FileUpload/>
    </header>
    <div class="max-size">
        <BurgerMenu
                bind:open={open}
                pages={pages}
                bind:openPage={openPage}/>
        <div class="content max-size">
            {#each pages as obj, i}
                {#if openPage === i}
                    <obj.page/>
                {/if}
            {/each}
        </div>
    </div>
</main>
<style>
    h2 {
        margin: 0;
    }

    .test {
        overflow-y: auto;
    }

    .title {
        flex-grow: 1;
        text-align: center;
        font-weight: bolder;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content {
        overflow-y: auto;
    }

    header {
        display: flex;
        text-align: center;
        background-color: var(--dark-color);
        padding: 10px 20px;
    }
</style>