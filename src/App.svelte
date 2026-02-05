<script>
    import FileUpload from "./components/FileUpload.svelte";
    import SideMenu from "./components/SideMenu.svelte";
    import BurgerButton from "./components/BurgerButton.svelte";

    import StartIcon from "./assets/icons/StartIcon.svelte";
    import StartpagePage from "./pages/StartpagePage.svelte";
    import FileConversion from "./pages/FileConversion.svelte";
    import ConvertIcon from "./assets/icons/ConvertIcon.svelte";
    import SpeakerIcon from "./assets/icons/SpeakerIcon.svelte";
    import ChangeVolume from "./pages/ChangeVolume.svelte";
    import EditIcon from "./assets/icons/EditIcon.svelte";
    import Custom from "./pages/Custom.svelte";

    const pages = [
        {icon: StartIcon, text: "Home", page: StartpagePage},
        {icon: ConvertIcon, text: "File conversion", page: FileConversion},
        {icon: SpeakerIcon, text: "Change Volume", page: ChangeVolume},
        {icon: EditIcon, text: "Custom", page: Custom},
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
    <div class="max-size" style="flex-direction: row; overflow-y: auto;">
        <SideMenu
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
    main {
        overflow-y: hidden;
        max-height: 100vh;
        max-width: 100vw;
    }

    h2 {
        margin: 0;
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
        top: 0;
    }

    header {
        display: flex;
        text-align: center;
        background-color: var(--dark-color);
        padding: calc(var(--padding) * 2) calc(var(--padding) * 2.5);
    }
</style>